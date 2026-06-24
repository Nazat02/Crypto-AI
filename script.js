const cards =
document.querySelectorAll(".card");


cards.forEach(card=>{


card.addEventListener(
"mousemove",
(e)=>{


const rect =
card.getBoundingClientRect();


const x =
e.clientX - rect.left;


const y =
e.clientY - rect.top;



card.style.transform =
`
perspective(600px)
rotateX(${-(y-rect.height/2)/15}deg)
rotateY(${(x-rect.width/2)/15}deg)
scale(1.05)
`;



});



card.addEventListener(
"mouseleave",
()=>{


card.style.transform =
"";


});


});




console.log(
"CryptoAI 3D engine active"
);
