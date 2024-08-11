"use client";

import {useMemo, useState, useEffect} from 'react';
import axios from "axios";
import {JSEncrypt} from "jsencrypt";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [userInput, setUserInput] = useState([]);

  useEffect(() => {
    if (userInput.length === 6) {
      sendUserInput();
    }
  }, [userInput]);

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
  }

  const sendUserInput = () => {
    alert('Sending user input: ' + userInput.join('\n'));
    setUserInput([]);
    getSecureKeypad();
  }

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
