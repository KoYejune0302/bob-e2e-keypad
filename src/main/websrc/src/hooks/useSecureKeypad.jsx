"use client";

import {useMemo, useState} from 'react';
import axios from "axios";
import {JSEncrypt} from "jsencrypt";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [userInput, setUserInput] = useState([]);

  const getSecureKeypad = () => {
    axios.get('/api/keypad')
      .then(response => {
        const keypad = response.data;
        console.log(keypad);
        setKeypad(keypad);
      })
      .catch(error => {
        console.error(error
        );  
      });
  }

  const onKeyPressed = (row, col) => {
    const value = keypad.hashValues[row * 4 + col];
    console.log(`Button ${value} clicked`);
    setUserInput([...userInput, value]);
    console.log(userInput.length);
  }

  const sendUserInput = () => {}

  return {
    states: {
      keypad,
      userInput,
    },
    actions: {
      getSecureKeypad,
      onKeyPressed,
      sendUserInput
    }
  }
}
