let score = 0
let sequence = []
let index = 0

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

//plays the piano key corresponding to symbols[i]
function play(i) {
    if(chords[i]=='b')new Audio('mp3/'+chords[i+1]+'b'+(Math.floor(i/7)+2)+'.mp3').play()
    new Audio('mp3/'+chords[i]+''+(Math.floor(i/7)+2)+'.mp3').play()
}

//Displays the sequence
async function display() {
    index=Math.floor(Math.random()*symbols.length)
    sequence.push(index)
    for(i of sequence){
        flash(i) //TODO: Sashrik add function
        await new Promise(r => setTimeout(r, 2000));
    }
}


/* Testing index.html code:
<body>
    <script>new Audio('mp3/Ab4.mp3').play()
        setTimeout(function () { new Audio('mp3/Eb6.mp3').play() }, 1300)
    </script>
</body>
*/