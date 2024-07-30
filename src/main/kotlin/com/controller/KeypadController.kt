package com.controller

import com.dto.KeypadResponseDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.nio.file.Files
import java.security.MessageDigest
import java.util.*
import java.util.Base64

@RestController
@RequestMapping("/keypad")
class KeypadController {

    @GetMapping
    fun getKeypad(): KeypadResponseDto {
        // Generate a unique keypad ID
        val keypadId = UUID.randomUUID().toString()

        // List of image file names
        val imageFiles = listOf(
            "_0.png", "_1.png", "_2.png", "_3.png", "_4.png", "_5.png", "_6.png", "_7.png", "_8.png", "_9.png", "_blank.png", "_blank.png"
        )

        // Shuffle the list to randomize the order of keys
        val shuffledFiles = imageFiles.shuffled()

        // Directory where images are stored
//        val currentDir = System.getProperty("user.dir")
//        println("Current working directory: $currentDir")

        val imageDir = "./src/main/resources/keypad-img"

        // Encode each image file to Base64
        val keys = shuffledFiles.map { fileName ->
            val filePath = "$imageDir/$fileName"
            val fileBytes = Files.readAllBytes(File(filePath).toPath())
            Base64.getEncoder().encodeToString(fileBytes)
        }

        // Calculate the hash value of the concatenated keys
        val hashValue = generateHash(keys)

        // Create a response object with the keypad ID, hash value, keys, and additional information
        val response = KeypadResponseDto(
            keypadId = keypadId,
            hashValue = hashValue,
            keys = keys
        )

        return response
    }

    private fun generateHash(keys: List<String>): String {
        val concatenatedKeys = keys.joinToString("")
        val messageDigest = MessageDigest.getInstance("SHA-256")
        val hashBytes = messageDigest.digest(concatenatedKeys.toByteArray())
        return hashBytes.joinToString("") { "%02x".format(it) }
    }
}
