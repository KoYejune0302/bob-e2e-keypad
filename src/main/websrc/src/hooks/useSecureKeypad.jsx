"use client";

import {useMemo, useState, useEffect} from 'react';
import axios from "axios";
import {JSEncrypt} from "jsencrypt";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [publicKey, setPublicKey] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/public_key.pem')
      .then(response => response.text())
      .then(data => {
        setPublicKey(data);
      })
      .catch(error => {
        console.error('Error fetching public key:', error);
      });
  }, []);

  useEffect(() => {
    if (userInput.length === 6) {
      sendUserInput();
    }
  }, [userInput]);

  useEffect(() => {
    if (result != null) {
      alert(result.message);
    }
  }, [result]);

  const getSecureKeypad = () => {
    axios.get('/api/keypad')
      .then(response => {
        const keypad = response.data;
        // console.log(keypad);
        setKeypad(keypad);
      })
      .catch(error => {
        console.error(error
        );  
      });
  }

  const onKeyPressed = (row, col) => {
    const value = keypad.hashValues[row * 4 + col];
    // console.log(`Button ${value} clicked`);
    setUserInput([...userInput, value]);
  }

  const sendUserInput = () => {
    // alert('Sending user input: ' + userInput.join('\n'));
    const encrypt = new JSEncrypt();
    const data = userInput.join('');
    encrypt.setPublicKey(publicKey);
    const encryptedPayload = encrypt.encrypt(data);
    // console.log(encryptedPayload);

    const payload = {
      userInput: encryptedPayload,
      keypadId: keypad.keypadId
    }
    axios.post('/api/verify', payload)
      .then(response => {
        const result = response.data;
        // console.log(result);
        setResult(result);
      })
      .catch(error => {
        console.error(error);
      });
    
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
