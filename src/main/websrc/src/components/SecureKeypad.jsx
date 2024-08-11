import '../style/keypad.css';
import React, { useState, useEffect } from 'react';

export default function SecureKeypad({ keypad, onKeyPressed }) {
    const [base64Image, setBase64Image] = useState(null);

    useEffect(() => {
        const fetchBase64Image = async () => {
            const responseBase64Image = keypad.combinedKeypadImage;
            setBase64Image(`data:image/png;base64,${responseBase64Image}`);
        };

        fetchBase64Image();
    }, [keypad.combinedKeypadImage]);

    const buttonSize = 50; // Each button is 50x50 pixels
    const buttonPositions = [
        { top: '0px', left: '0px' },          // Button 1
        { top: '0px', left: `-${buttonSize}px` },    // Button 2
        { top: '0px', left: `-${2 * buttonSize}px` }, // Button 3
        { top: '0px', left: `-${3 * buttonSize}px` }, // Button 4
        { top: `-${buttonSize}px`, left: '0px' },    // Button 5
        { top: `-${buttonSize}px`, left: `-${buttonSize}px` },  // Button 6
        { top: `-${buttonSize}px`, left: `-${2 * buttonSize}px` }, // Button 7
        { top: `-${buttonSize}px`, left: `-${3 * buttonSize}px` }, // Button 8
        { top: `-${2 * buttonSize}px`, left: '0px' },  // Button 9
        { top: `-${2 * buttonSize}px`, left: `-${buttonSize}px` },  // Button 10
        { top: `-${2 * buttonSize}px`, left: `-${2 * buttonSize}px` }, // Button 11 (0)
        { top: `-${2 * buttonSize}px`, left: `-${3 * buttonSize}px` }  // Button 12 (Blank space)
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
                                                    width: `${buttonSize}px`,
                                                    height: `${buttonSize}px`
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
