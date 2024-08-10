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

