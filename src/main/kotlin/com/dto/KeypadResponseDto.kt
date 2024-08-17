package com.dto

data class KeyValuePair(
    val keyImage: String,
    val value: String
)

data class KeypadResponseDto(
    val keypadId: String,
    val combinedKeypadImage: String,
    val hashValues: List<String>
)

data class VerifyRequestDto(
    val userInput: String,
    val keypadId: String
)

data class VerifyResponseDto(
    val success: String,
    val message: String
)

data class endpointPayload(
    val userInput: String,
    val keyHashMap: Map<String, String>,
    val keyLength: Int
)
