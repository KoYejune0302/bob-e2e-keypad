package com.dto

data class KeypadResponseDto(
    val keypadId: String,
    val hashValue: String,
    val keys: List<String>
)
