import React from "react";
import './quizContainer.css';
import questions from '../questions.json';
import { capitalizeFirstLetter } from "../utils/stringFormats.js";
import { turnOnButton,turnOffButton } from "./startButton.jsx";
import { nextCircleAnimation } from "./bgAnim.jsx";

const introTextHTML=`
    <div class="intro-text-container">
        <div class="main-text">
            Welcome to the Quizzical<br/>Quizzable Quiz Experience 
        </div>
        <div class="sub-text">
            Just answer 15 questions and check out your score
        </div>
    </div>
`

export let intervalId;

let QIndex=0;
let isQuizTime=false;
let chosenQs;
let score=0;

export function startQuiz(){
    const quizContainer=document.querySelector('.quiz-main-container');
    quizContainer.style.opacity='0';
    /*Condition to check if quiz is ongoing*/
    if(!isQuizTime){
        chosenQs=chooseQuestions();
        isQuizTime=true;
    }
    /*Condition to check if the final Question was completed*/
    if(QIndex===15){
        let remarkText=scoreRemark(score);
        QIndex=0;
        score=0;
        isQuizTime=false;
        turnOffButton();
        setTimeout(()=>{
            const remarkElement=document.querySelector('.quiz-board')
            remarkElement.classList.add('remark-text');
            remarkElement.innerText=remarkText;
            const scoreCard=document.querySelector('.score-card-base')
            scoreCard.classList.add('score-final');
            intervalId=setInterval(()=>{
                document.querySelectorAll('.circle').forEach((circle)=>{
                    circle.classList.remove('circle');
                    circle.classList.add('circle-center');
                });
                nextCircleAnimation('circle-center');
            },500);
            quizContainer.style.opacity='100%';
            turnOnButton('restart');
        },500);
    }
    /*Condition to start/continue the Quiz*/
    if(isQuizTime){
        setTimeout(()=>{
            generateQuizBoard(chosenQs[QIndex]);
            quizContainer.style.opacity='100%';
            const optionsElement=document.querySelector('.options');
            for(let i=0;i<optionsElement.childElementCount;i++){
                optionsElement.children.item(i).addEventListener('click',handleOptionClick);
            }
            QIndex++;
        },500);
        turnOffButton();
    }
}

/*Function to restart the Quiz*/
export function restartQuiz(){
    const quizContainer=document.querySelector('.quiz-main-container');
    quizContainer.innerHTML=introTextHTML;
}

/*Generate the Quiz Board with the below format*/
function generateQuizBoard(chosenQ){
    const quizContainer=document.querySelector('.quiz-main-container');
    let questionHTML=`
        <div class="quiz-board">
            <div class="question-num">Question ${QIndex+1}</div>
            <div class="question">
                ${chosenQ.question}
            </div>
            <div class="options" data-answer=${chosenQ.answer}>
                <div class="option" id="A">${capitalizeFirstLetter(chosenQ.A)}</div>
                <div class="option" id="B">${capitalizeFirstLetter(chosenQ.B)}</div>
                <div class="option" id="C">${capitalizeFirstLetter(chosenQ.C)}</div>
                <div class="option" id="D">${capitalizeFirstLetter(chosenQ.D)}</div>
            </div>
        </div>
        <div class="score-card-base score-corner">
            <div class="score">${score}</div>
            <hr/>
            <div>15</div>
        </div>
    `
    quizContainer.innerHTML=questionHTML;
}

/*Called when a question is answered correctly*/
function updateScoreHTML(score){
    document.querySelector('.score').innerText=score;
}

function scoreRemark(score){
    if(score<=0){
        return 'HOW?'
    }
    else if(score<=3){
        return 'Better luck next time';
    }
    else if(score<=7){
        return `Good effort`
    }
    else if(score<=14){
        return `Niiiiiice`
    }
    else{
        return `You WIN but at what COST`;
    }
}

/*Handle function when one of the question's option is selected*/
function handleOptionClick(event){
    const optionsElement=document.querySelector('.options');
    const chosenOption=event.target;
    if(chosenOption.id===optionsElement.dataset.answer){
        chosenOption.style.backgroundColor='green';
        score++;
        updateScoreHTML(score);
    }
    else{
        chosenOption.style.backgroundColor='red';
    }
    /*getting rid of all the children's event listeners*/
    for(let i=0;i<optionsElement.childElementCount;i++){
        const option=optionsElement.children.item(i)
        if(option!==chosenOption){
            option.style.backgroundColor='transparent';
            option.style.opacity='40%';
        }
        option.removeEventListener('click',handleOptionClick);
        option.style.color='white';
        option.style.cursor='default';
    }
    turnOnButton();
}

/*Randomly choose 15 questions from the available json file*/
function chooseQuestions(){
    let Qs=[]
    for(let i=0;i<15;i++){
        Qs.push(questions[Math.floor(Math.random()*548)]);
    }
    return Qs;
}

/*An fetch request to get the questions.json from the web (currently not used)*/
/*async function getQuestions(){
    const response=await fetch('https://gist.githubusercontent.com/cmota/f7919cd962a061126effb2d7118bec72/raw/96ae8cbebd92c97dfbe53ad8927a45a28f8d2358/questions.json');
    console.log(await response.json());
}*/

function QuizContainer(){
    return(
        <div className="quiz-main-container">
            <div className="intro-text-container">
                <div className="main-text">
                    Welcome to the Quizzical<br/>Quizzable Quiz Experience 
                </div>
                <div className="sub-text">
                    Just answer 15 questions and check out your score
                </div>
            </div>
        </div>
    )
}

export default QuizContainer;