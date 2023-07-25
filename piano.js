let score = 0
let sequence = []
let index = 0

//Replace below names with actual names in the html
let cur = document.getElementById("score")
let keys = document.getElementsByClassName("key")
class Key {
    constructor (name, sampleFile, isWhite){

    }
}

//C2 to C7 inclusive     
//             0123456789
let symbols = "1!2@34$5%6^78*9(0qQwWeErtTyYuiIoOpPasSdDfgGhHjJklLzZxcCvVbBnm"
let chords  = "CbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBC"
//number calculation: Math.floor(i/7)+2

let delay = 1300 //2.93 sec is the duration of the files but player migt get inpatient
let min = 100 //0.1 secs, during testing is still intelligible

//plays the piano key corresponding to symbols[i]
function play(i) {
    if(chords[i]=='b')new Audio('mp3/'+chords[i+1]+'b'+(Math.floor(i/7)+2)+'.mp3').play()
    new Audio('mp3/'+chords[i]+''+(Math.floor(i/7)+2)+'.mp3').play()
}

 class white 
 {



}


{



}

let octave = [true,false,true,false, true,true,false,true,false,true,false,true];

let ocataveDiv = document.createElement("div");
ocataveDiv.className="octave";

let x=0;
for(let isWhite of octave)
{

    let button= document.createElement("button");
    let color= "black";
    if(isWhite)
    {
        color="white";

    }
    button.className= color;
    button.style.setProperty("left", x);
    x= x+15;


}


for(i=0;i<5;i++)
{
for(j=0; j<12; j++)
{
    if(j==1||j==3||j==5||j==6||j==8||j==10||j==12)
    {
     let keysbutton = document.createElement("button");
    document.getElementsByClassName("white").appendChild(symbols[i*12+j])
    }
  


else
{
    document.createElement(“div”);
    document.getElementsByClassName("black").appendChild(symbols[i*12+j])



}

}
symbols[i*12+j] = chords[i*12+j];
}

