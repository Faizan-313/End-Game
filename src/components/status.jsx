export default function Status(prop){
    return (
        <div aria-live="polite" role="status" className={prop.class}>
            {prop.status  ? < >
                <h2>{prop.result ? 'You Won!' : 'Game Over'}</h2>
                <h6>{prop.result ? 
                    "Well Done! 🏆🎉" : "You Lost! You Better Start Learning Assembly 😭"}</h6>
            </> : !(prop.lastLetter) ? null : <h2 className="farewell-text">{prop.text}</h2>}
        </div>
    )
}