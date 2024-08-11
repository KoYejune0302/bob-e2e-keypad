import '../style/keypad.css';

export default function KeypadUserInput({ userInput }) {
    const maxDots = 6;
    
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
