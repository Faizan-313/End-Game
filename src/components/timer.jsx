import { useEffect, useState } from "react"

export default function Timer(prop){
    const [timeLeft, setTimeLeft] = useState(120);
    const [start, setStart] = useState(false)

    //start the game on click on first guess
    useEffect(()=>{
        if(prop.gameStart === 1){
            setStart((prev)=> !prev)
        }
    },[prop.gameStart])


    //decrement the time 
    useEffect(()=>{
        let time;
        if(timeLeft > 0 && start && !prop.gameStatus){
            time = setInterval(()=>{
                setTimeLeft((prev)=> prev -1)
            },1000)
        }
        if(timeLeft === 0){
            return prop.func();
        }
        return () => clearInterval(time);
    },[start, timeLeft]);

    //format time
    function formatTime(seconds){
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2,'0')} : ${sec.toString().padStart(2, '0')}`
    }

    //change styling with time
    const dynamicStyle = {
        color: timeLeft <= 10 ? "red" : timeLeft <= 25 ? "orange" : "white",
        fontWeight: timeLeft <= 20 ? "bold" : "normal",
        transition: "color 0.6s, font-weight 0.6s" 
    };
    
    return ( 
        <>
            <h2 style={dynamicStyle}>{formatTime(timeLeft)}</h2> 
        </>    
    )
}