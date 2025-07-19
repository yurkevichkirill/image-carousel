import './styles.css';

import mbappeURL from "./imgs/mbappe.jpeg";
import messiURL from "./imgs/messi.jpeg";
import ozilURL from "./imgs/ozil.jpeg";
import ronaldinhoURL from "./imgs/ronaldinho.jpeg";
import ronaldoURL from "./imgs/ronaldo.jpeg";

import leftURL from "./imgs/arrow-left-bold.svg";
import rightURL from "./imgs/arrow-right-bold.svg";

const CAROUSEL_SIZE = 5;

const carouselItems = [];
const dots = [];

generateDOM();
startSetup();
autoTransition();

function generateDOM(){
    const main = document.querySelector(".main");

    const arrowLeft = document.createElement("div");
    arrowLeft.classList.add("arrow");
    arrowLeft.classList.add("left");

    const imgLeft = document.createElement("img");
    imgLeft.classList.add("arrow-img");
    imgLeft.src = leftURL;
    imgLeft.addEventListener("click", () => {
        arrowLeftAct();
    })
    arrowLeft.append(imgLeft);

    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    const imgs = [mbappeURL, messiURL, ronaldoURL, ronaldinhoURL, ozilURL];
    const names = ['mbappe', 'messi', 'ronaldo', 'ronaldinho', 'ozil'];

    const dotsDiv = document.createElement("div");
    dotsDiv.classList.add("dots-div");

    for(let i = 0; i < 5; i++){
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        carouselItem.id = names[i];

        const carouselImg = document.createElement("img");
        carouselImg.classList.add("carousel-img");
        carouselImg.src = imgs[i];
        carouselItem.append(carouselImg);

        carousel.append(carouselItem);
        carouselItems.push(carouselItem);

        const dot = document.createElement("div");
        dot.textContent = ".";
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            dotClick(carouselItem);
        })
        dots.push(dot);
        dotsDiv.append(dot);
    }

    const arrowRight = document.createElement("div");
    arrowRight.classList.add("arrow");
    arrowRight.classList.add("right");

    const imgRight = document.createElement("img");
    imgRight.classList.add("arrow-img");
    imgRight.src = rightURL;
    imgRight.addEventListener("click", () => {
        arrowRightAct();
    })
    arrowRight.append(imgRight);

    main.append(arrowLeft, carousel, arrowRight, dotsDiv);
}

function startSetup(){
    document.querySelector("#ronaldo").classList.add("visible");
    dots[2].classList.add("dot-visible");
}

function arrowLeftAct(){
    const currentItem = getCurrentItem();
    const currentItemName = currentItem.id;
    const previousItem = getPrevious(currentItemName);
    if(previousItem){
        turnNextVisible(currentItem, previousItem);
    }
}

function arrowRightAct(){
    const currentItem = getCurrentItem();
    const currentItemName = currentItem.id;
    const nextItem = getNext(currentItemName);
    if(nextItem){
        turnNextVisible(currentItem, nextItem);
    }
}

function getCurrentItem(){
    for(let i = 0; i < CAROUSEL_SIZE; i++){
        if(carouselItems[i].classList.contains("visible")){
            return carouselItems[i];
        }
    };
}

function getPrevious(currentName){
    for(let i = 0; i < CAROUSEL_SIZE; i++){
        if(carouselItems[i].id === currentName){
            if(!isLast(i - 1)){
                return carouselItems[i - 1];
            }
            else{
                return carouselItems[CAROUSEL_SIZE - 1];
            }
        }
    };

    return null;
}

function getNext(currentName){
    for(let i = 0; i < CAROUSEL_SIZE; i++){
        if(carouselItems[i].id === currentName){
            if(!isLast(i + 1)){
                return carouselItems[i + 1];
            }
            else{
                return carouselItems[0];
            }
        }
    };

    return null;
}

function isLast(count){
    if(count < 0 || count > 4){
        return true;
    }
    return false;
}

function turnNextVisible(currentItem, nextItem){
    currentItem.classList.remove("visible");
    lightDot(currentItem);
    nextItem.classList.add("visible");
    lightDot(nextItem);
}

function lightDot(lightItem){
    carouselItems.forEach((item, i) => {
        if(lightItem === item){
            dots[i].classList.toggle("dot-visible");
        }
    })
}

function dotClick(nextItem){
    const currentItem = getCurrentItem();
    turnNextVisible(currentItem, nextItem);
}

function autoTransition(){
    setInterval(() => {
        arrowRightAct();
    }, 5000);
}
