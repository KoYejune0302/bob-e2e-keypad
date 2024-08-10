import '../style/keypad.css';
import React, { useState, useEffect } from 'react';

export default function SecureKeypad({ keypad, onKeyPressed }) {
    const [base64Image, setBase64Image] = useState(null);
    const keyValue = keypad.hashValues;

    useEffect(() => {
        const fetchBase64Image = async () => {
            const responseBase64Image = keypad.combinedKeypadImage;
            setBase64Image(`data:image/png;base64,${responseBase64Image}`);
        };

        fetchBase64Image();
    }, [keypad.combinedKeypadImage]);

    const buttonPositions = [
        { top: '0px', left: '0px' },      // Button 1
        { top: '0px', left: '-50px' },    // Button 2
        { top: '0px', left: '-100px' },   // Button 3
        { top: '-50px', left: '0px' },    // Button 4
        { top: '-50px', left: '-50px' },  // Button 5
        { top: '-50px', left: '-100px' }, // Button 6
        { top: '-100px', left: '0px' },   // Button 7
        { top: '-100px', left: '-50px' }, // Button 8
        { top: '-100px', left: '-100px' },// Button 9
        { top: '-150px', left: '0px' },   // Button 10 (Blank space)
        { top: '-150px', left: '-50px' }, // Button 11 (0)
        { top: '-150px', left: '-100px' } // Button 12 (Blank space)
    ];

    return (
        <div className="keypad-parent-container">
            <div className="keypad-container">
                <table className="table-style">
                    <tbody>
                        {[...Array(3)].map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {[...Array(4)].map((_, colIndex) => {
                                    const index = rowIndex * 4 + colIndex;
                                    const position = buttonPositions[index];
                                    return (
                                        <td className="td-style" key={colIndex}>
                                            <button
                                                className="button-style"
                                                onClick={() => onKeyPressed(rowIndex, colIndex)}
                                                style={{
                                                    backgroundImage: `url(${base64Image})`,
                                                    backgroundPosition: `${position.left} ${position.top}`,
                                                    backgroundSize: '200px 150px', // Ensure this matches the original image size
                                                    width: '50px',
                                                    height: '50px'
                                                }}
                                            >
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
