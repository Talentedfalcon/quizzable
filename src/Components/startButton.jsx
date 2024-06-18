import { React,useEffect } from "react";
import './startButton.css';
import { startQuiz,intervalId,restartQuiz } from "./quizContainer";
import { circleAnimation, nextCircleAnimation } from "./bgAnim";

function handleStartButtonClick(event){
    nextCircleAnimation();
    startQuiz();
    const buttonElement=event.target;
    buttonElement.style.opacity='50%';
}

export function turnOffButton(){
    const buttonElement=document.querySelector('.start-button');
    const borderElement=document.querySelector('.button-border');
    const pulsingElement=document.querySelector('.animated-outer-border');
    buttonElement.removeEventListener('click',handleStartButtonClick);
    buttonElement.style.opacity='0';
    buttonElement.style.cursor='default';
    borderElement.style.opacity='0';
    pulsingElement.style.display='none';
}

export function turnOnButton(buttonState='start'){
    const buttonElement=document.querySelector('.start-button');
    const borderElement=document.querySelector('.button-border');
    const pulsingElement=document.querySelector('.animated-outer-border');
    buttonElement.style.opacity='100%';
    buttonElement.style.cursor='pointer';
    borderElement.style.opacity='100%';
    pulsingElement.style.display='block';
    if(buttonState==='start'){
        buttonElement.addEventListener('click',handleStartButtonClick);
    }
    else if(buttonState==='restart'){
        buttonElement.addEventListener('click',handleRestartButtonClick);
        buttonElement.classList.add('restart-button');
    }
}

function handleRestartButtonClick(event){
    const buttonElement=event.target;
    circleAnimation();
    if(intervalId){
        clearInterval(intervalId);
    }
    buttonElement.classList.remove('restart-button');
    buttonElement.removeEventListener('click',handleRestartButtonClick);
    buttonElement.addEventListener('click',handleStartButtonClick);
    restartQuiz();
}

function StartButton(){
    useEffect(()=>{
        document.querySelector('.start-button').addEventListener('click',handleStartButtonClick);
    })
    return (
        <div className="button-container">
            <div className="animated-outer-border">
            </div>
            <div className="button-border">
            </div>
            <button className="start-button">
            </button>
        </div>
    );
}

export default StartButton;