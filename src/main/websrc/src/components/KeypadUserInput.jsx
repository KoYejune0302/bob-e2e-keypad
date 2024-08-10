import '../style/keypad.css';

export default function KeypadUserInput({ userInput }) {
    // Maximum number of dots to display
    const maxDots = 6;
    
    // Create an array of size maxDots to map over
    const dots = Array.from({ length: maxDots });

    return (
        <div className="input-group-style">
            {dots.map((_, index) => (
                <div
                    key={index}
                    className={`input-char-style ${index < userInput.length ? 'active' : ''}`}
                />
            ))}
        </div>
    );
}
