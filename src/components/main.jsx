import Header from "./header"
import Status from "./status"
import { languages } from "../assets/languages.js"
import { useEffect, useState } from "react"
import clsx from 'clsx';
import { getFarewellText, getWord} from "../assets/utils.js"
import Confetti from 'react-confetti'
import Timer from "./timer.jsx";


export default function Main() {
    const [word, setWord] = useState(() => getWord());
    const [guessedLetter, setGuessedLetter] = useState([]);
    const [timeResetKey, setTimeResetKey] = useState(false);
    const [gameLost, setGameLost] = useState()

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const wrongGuessCount = (guessedLetter.filter((letter) => !word.includes(letter))).length;

    //update guess count
    function addGuessedLetter(letter) {
        setGuessedLetter(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    //update the farewell message and also the languages chips
    let farewellText = "";
    const language = languages.map((lan, index) => {
        const styles = {
            backgroundColor: lan.backgroundColor,
            color: lan.color
        }
        const died = index < wrongGuessCount;
        if (died) farewellText = getFarewellText(lan.name);
        const className = clsx("chip", ((died || gameLost) && lan.name !== "Assembly" ) && "lost")
        return <span className={className} key={lan.name} style={styles}>{lan.name}</span>
    });

    const gameWon = word.split("").every(letter => guessedLetter.includes(letter));

    //update gamelost state
    useEffect(()=>{
        const lost = wrongGuessCount === language.length - 1;
        setGameLost(lost);
    },[language.length,wrongGuessCount]);

    //when time reaches 0
    function timeEnded(){
        setGameLost(true);
    }

    const gameOver = (gameWon || gameLost);

    //map over word selected and also add the letters to the answer section if correct
    const wordLetters = word.split("").map((letter, index) => {
        return <span key={index}>{guessedLetter.includes(letter) ? letter.toUpperCase() : <span className="not-entered-letters">{gameLost && letter.toUpperCase()}</span>}</span>
    });

    //functionality for keyboard
    const keyboardAlphabets = alphabet.split("").map((letter) => {
        const isGuessed = guessedLetter.includes(letter)
        const isCorrect = isGuessed && word.includes(letter)
        const isWrong = isGuessed && !word.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        return <button
            key={letter}
            className={className}
            disabled={gameOver}
            aria-disabled={gameOver}
            aria-label={`letter ${letter}`}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>
    })

    //track last guessed letter for the status section
    const lastGuessedLetter = guessedLetter[guessedLetter.length - 1];
    const isLastGuessIncorrect = lastGuessedLetter && !word.includes(lastGuessedLetter);

    // add classes for css for the status section
    const statusClass = clsx("game-status", {
        won: gameWon,
        lost: gameLost,
        farewell: isLastGuessIncorrect
    })

    //function for new game
    function newGame() {
        setWord(getWord());
        setGuessedLetter([]); 
        setTimeResetKey((prev)=> !prev);
    }

    //for scroll to new game button
    useEffect(()=>{
        if(gameOver){
            document.querySelector('.new-game').scrollIntoView({behavior: "smooth"});
        }
    },[gameOver]);

    return (
        <main>
            {gameWon && <Confetti recycle={false} numberOfPieces={2000} />}
            <Header />
            <Status result={gameWon} lastLetter={isLastGuessIncorrect} status={gameOver} class={statusClass} text={farewellText} />

            <section className="language-chips">
                {language}
            </section>

            <section className="attempts-left">
                <h2>Attempts Left : {8 - wrongGuessCount}</h2>
            </section>

            <section className="timer">
                <Timer word={word.length * 10} func = {timeEnded} gameStart = {guessedLetter.length}  gameStatus = {gameOver} key={timeResetKey}/>
            </section>

            <section className="answer-section">
                {wordLetters}
            </section>

            {/* for screen reader */}
            <section className="sr-only" aria-live="polite" role="status">
                <p>Current Word: {word.split("").map((letter) =>
                    guessedLetter.includes(letter) ? letter + "." : "blank.").join(" ")}</p>
            </section>

            <section className="keyboard">
                {keyboardAlphabets}
            </section>

            {gameOver && <button  className="new-game" onClick={newGame}>New Game</button>}
        </main>
    )
}