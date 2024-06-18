import { useEffect,React } from "react";
import './bgAnim.css'


function BgAnim(){
    useEffect(circleAnimation);
    return(
        <div className="background-container">
        </div>
    )
}

export function circleAnimation(){
    const backgroundElement=document.querySelector('.background-container');
    backgroundElement.innerHTML=`
        <div class='circle'></div>
        <div class='circle'></div>
        <div class='circle'></div>
    `
    let circleSizes=[700,500,300];
    document.querySelectorAll('.circle').forEach((circle,index)=>{
        setTimeout(() => {
            circle.style.transform=`scale(${circleSizes[index]})`;
        }, index*500);
        setTimeout(()=>{
            circle.style.transform=`scale(${circleSizes[index]-10})`;
        },index*1000);
    });
}

export function nextCircleAnimation(className='circle'){
    const backgroundElement=document.querySelector('.background-container');
    if(backgroundElement.children.length<4){
        let node=document.createElement("div");
        node.classList.add(className);
        backgroundElement.appendChild(node);
    }
    let circleSizes=[900,700,500,300];
    const circlesList=document.querySelectorAll(`.${className}`);
    circlesList.forEach((circle,index) => {
        setTimeout(() => {
            circle.style.transform=`scale(${circleSizes[index]-10})`;
        }, index*100);
    });
    circlesList[0].style.transition='all 2s, opacity 1s, box-shadow 1s';
    circlesList[0].style.opacity='0';
    circlesList[0].style.boxShadow='';
    setTimeout(()=>{
        circlesList[0].remove();
    },1000)
}

export default BgAnim;