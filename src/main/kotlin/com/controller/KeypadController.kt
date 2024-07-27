package com.controller

import com.dto.KeypadResponseDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.MessageDigest
import java.util.*

@RestController
@RequestMapping("/keypad")
class KeypadController {

    @GetMapping
    fun getKeypad(): KeypadResponseDto {
        // Generate a unique keypad ID
        val keypadId = UUID.randomUUID().toString()

        // Create the list of keys (0-9)
        val keys = (0..9).map { it.toString() }

        // Generate a hash value for the keypad
        val hashValue = generateHash(keys)

        // Create a response object with the keypad ID, hash value, keys, and additional information
        val response = KeypadResponseDto(
            keypadId = keypadId,
            hashValue = hashValue,
            keys = keys,
            additionalInfo = "This is some additional information needed for the E2E keypad."
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
