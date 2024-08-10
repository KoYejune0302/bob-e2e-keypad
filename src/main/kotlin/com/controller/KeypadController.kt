package com.controller

import com.dto.KeypadResponseDto
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.data.redis.core.ValueOperations
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.io.ByteArrayOutputStream
import java.io.File
import java.security.MessageDigest
import java.util.*
import javax.imageio.ImageIO
import java.awt.image.BufferedImage
import java.util.Base64
import java.awt.Graphics2D
import org.springframework.beans.factory.annotation.Autowired

import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/keypad")
class KeypadController @Autowired constructor(
    private val redisTemplate: RedisTemplate<String, Any>
) {

    @CrossOrigin(origins = ["http://localhost:3000"])
    @GetMapping
    fun getKeypad(): KeypadResponseDto {
        // Generate a unique keypad ID
        val keypadId = UUID.randomUUID().toString()

        // List of image file names and their corresponding values
        val imageFiles = listOf(
            "_0.png" to "0",
            "_1.png" to "1",
            "_2.png" to "2",
            "_3.png" to "3",
            "_4.png" to "4",
            "_5.png" to "5",
            "_6.png" to "6",
            "_7.png" to "7",
            "_8.png" to "8",
            "_9.png" to "9",
            "_blank.png" to "blank",
            "_blank.png" to "blank"
        )

        // Shuffle the list to randomize the order of keys
        val shuffledFiles = imageFiles.shuffled()

        // Directory where images are stored
        val imageDir = "./src/main/resources/keypad-img"

        // Load images and create a list of real values
        val values = shuffledFiles.map { it.second }
        val images = shuffledFiles.map { (fileName, _) ->
            ImageIO.read(File("$imageDir/$fileName"))
        }

        // Dimensions of each individual key image
        val keyWidth = images[0].width
        val keyHeight = images[0].height

        // Create a new image to combine all key images
        val combinedImage = BufferedImage(keyWidth * 4, keyHeight * 3, BufferedImage.TYPE_INT_ARGB)
        val g: Graphics2D = combinedImage.createGraphics()

        // Draw the key images onto the combined image
        images.forEachIndexed { index, img ->
            val x = (index % 4) * keyWidth
            val y = (index / 4) * keyHeight
            g.drawImage(img, x, y, null)
        }
        g.dispose()

        // Encode the combined image to Base64
        val baos = ByteArrayOutputStream()
        ImageIO.write(combinedImage, "png", baos)
        val encodedCombinedImage = Base64.getEncoder().encodeToString(baos.toByteArray())

        // Add current timestamp as salt
        val salt = System.currentTimeMillis().toString()

        // Calculate hash values for each key value
        val hashValues = values.map { value -> generateHash(value, salt) }

        // Save keypad information to Redis
        val valueOperations: ValueOperations<String, Any> = redisTemplate.opsForValue()
        valueOperations.set("keypad:$keypadId:values", values)
        valueOperations.set("keypad:$keypadId:hash", hashValues)

        // Create a response object with the keypad ID, combined keypad image, and values
        val response = KeypadResponseDto(
            keypadId = keypadId,
            combinedKeypadImage = encodedCombinedImage,
            hashValues = hashValues
        )

        return response
    }

    private fun generateHash(value: String, salt: String): String {
        val messageDigest = MessageDigest.getInstance("SHA-256")
        val hashBytes = messageDigest.digest((value + salt).toByteArray())
        return hashBytes.joinToString("") { "%02x".format(it) }
    }
}
