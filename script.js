const orb =
document.querySelector(".orb");


document.addEventListener(
"mousemove",
(e)=>{


let x =
(e.clientX / window.innerWidth - .5)*30;


let y =
(e.clientY / window.innerHeight - .5)*30;


document.querySelector(".ai-card")
.style.transform =
`
rotateY(${x}deg)
rotateX(${-y}deg)
`;



});


console.log(
"CryptoAI system online"
);
