let score = 0
let sequence = []

//Replace below names with actual names in the html
let cur = document.getElementById("score")
let keys = document.getElementsByClassName("key")

//C2 to C7 inclusive     
//             0123456789
let symbols = "1!2@34$5%6^78*9(0qQwWeErtTyYuiIoOpPasSdDfgGhHjJklLzZxcCvVbBnm"
let chords  = "CbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBC"
//number calculation: Math.floor(i/7)+2

let delay = 1300 //2.93 sec is the duration of the files but player migt get inpatient
let min = 100 //0.1 secs, during testing is still intelligible
function play(i) {
    new Audio('mp3/'+chords[i]+' '+(Math.floor(i/7)+2)+'.mp3').play()
}

function sequence() {
    
}

function start() {
    score=0
    sequence=[]
}