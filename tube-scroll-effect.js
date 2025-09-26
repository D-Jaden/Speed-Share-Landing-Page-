// 3D Tube Scroll Effect for Top Container
console.clear();

// Utility functions
const select = e => document.querySelector(e);
const selectAll = e => document.querySelectorAll(e);

// Global variables
let stage = null;
let tubeInner = null;
let clone = null;
const numLines = 10;
let fontSize = 0;
const angle = 360/numLines;
let radius = 0;
let origin = 0;
const textContent = "SPEED SHARE"; // The text to display in the tube

function createHTML() {
    // Create the stage structure and inject into top-container
    const topContainer = select('.top-container');
    if (!topContainer) return;

    const stageHTML = `
        <div class="stage">
            <div class="tube">
                <div class="tube__inner">
                    <div class="line">${textContent}</div>
                </div>
            </div>
        </div>
    `;

    topContainer.insertAdjacentHTML('afterbegin', stageHTML);
    
    // Update references
    stage = select('.stage');
    tubeInner = select(".tube__inner");
    clone = document.getElementsByClassName("line");
}

function set3D() {
    let width = window.innerWidth;
    fontSize = gsap.getProperty(':root', '--fontSize');
    let fontSizePx = (width/100)*fontSize;
    radius = (fontSizePx/2)/Math.sin((180/numLines)*(Math.PI/180)); // using Pythagoras Eq
    origin = `50% 50% -${radius}px`;
}

function cloneNode() {
    for (var i = 0; i < (numLines-1); i++) {
        let newClone = clone[0].cloneNode(true); // clone the header
        let lineClass = "line--"+(i+2); // create class name to append
        newClone.classList.add(lineClass); // add incremented line class
        tubeInner.appendChild(newClone); // append the clone
    }
    clone[0].classList.add("line--1"); // add line1 class to the first node
}

function positionTxt() {
    gsap.set('.line', {
        rotationX: function(index) {
            return -angle*index;
        },
        z: radius,
        transformOrigin: origin
    });
}

function setProps(targets) {
    targets.forEach(function(target) {
        let paramSet = gsap.quickSetter(target, "css");
        let degrees = gsap.getProperty(target, "rotateX");
        let radians = degrees * (Math.PI/180);
        let conversion = Math.abs(Math.cos(radians) / 2 + 0.5); // 1 - 0 half cosine wave
        let fontW = 200 + 700*conversion;
        let fontS = `${100 + 700*conversion}%`;
        paramSet({
            opacity: conversion+0.1, 
            fontWeight: fontW, 
            fontStretch: fontS 
        });
    });
}

function scrollRotate() {
    gsap.to('.line', {
        scrollTrigger: {
            trigger: '.top-container',
            scrub: 1,
            start: "top top",
            end: "bottom top",
            onUpdate: function(self) {
                // Fade out the effect as we scroll past
                gsap.to('.stage', {
                    opacity: 1 - self.progress,
                    duration: 0.1
                });
            }
        },
        rotateX: "+=1080",
        onUpdate: function() {
            setProps(this.targets());
        }
    });
    
    gsap.to('.tube', {
        scrollTrigger: {
            trigger: '.top-container',
            scrub: 1,
            start: "top top",
            end: "bottom top"
        },
        perspective: '1vw',
        ease: 'expo.out'
    });
}

function init() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    createHTML();
    cloneNode();
    set3D();
    
    window.onresize = () => {
        set3D();
        positionTxt();
    };
    
    positionTxt(); 
    setProps(gsap.utils.toArray(".line"));
    scrollRotate();
    gsap.to(stage, { autoAlpha: 1, duration: 2, delay: 1 });
}

// Initialize when everything is loaded
window.onload = () => {
    // Wait a bit to ensure GSAP is fully loaded
    setTimeout(init, 100);
};

// Backup initialization for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        setTimeout(init, 100);
    }
});