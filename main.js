let whiteWidth = 30;
let blackWidth = 15;
let scale = [
    {
        letter: "C",
        isFlat: false,
    },
    {
        letter: "D",
        isFlat: true,
    },
    {
        letter: "D",
        isFlat: false,
    },
    {
        letter: "E",
        isFlat: true,
    },
    {
        letter: "E",
        isFlat: false,
    },
    {
        letter: "F",
        isFlat: false,
    },
    {
        letter: "G",
        isFlat: true,
    },
    {
        letter: "G",
        isFlat: false,
    },
    {
        letter: "A",
        isFlat: true,
    },
    {
        letter: "A",
        isFlat: false,
    },
    {
        letter: "B",
        isFlat: true,
    },
    {
        letter: "B",
        isFlat: false,
    }
]
let keys = [];
let symbols = "1!2@34$5%6^78*9(0qQwWeErtTyYuiIoOpPasSdDfgGhHjJklLzZxcCvVbBnm"
let left = 0;
let noteNumber = 0;
for (let octave = 2; octave < 7; octave++) {
    let octaveDiv = document.createElement("div");
    // octaveDiv.className = "octave";
    // document.getElementById("key").appendChild(octaveDiv);
    for (let i = 0; i < scale.length; i++) {
        let note = scale[i];
        if(noteNumber != 0)
        {
            previousNote = keys[noteNumber - 1];
            //if the previous note is flat
            if(previousNote.isFlat) {
                //move one half black width to the right
                left = left + blackWidth / 2;
            //if the previous note is not flat
            } else {
                //if the current note is flat
                if(note.isFlat) {
                    left = left + whiteWidth - blackWidth / 2;
                } else {
                    left = left + whiteWidth;
                }
                
            }

        } else {firstNote = true}
        let keyButton = document.createElement("button");
        let color = "white";
        if (note.isFlat) {
            color = "black";
        }
        keyButton.style.setProperty("left",left + "px");
        // octaveDiv.appendChild(keyButton);
        document.getElementById("key").appendChild(keyButton)
        keyButton.className = color + " key";
        let sample = note.letter;
        if (note.isFlat) {
            sample += "b";
        }
        sample += octave;
        let keyObject = { letter: note.letter, isFlat: note.isFlat, src: sample, button: keyButton, key: symbols[i] }
        keys.push(keyObject);
        keyButton.keyObject = keyObject;
        noteNumber++;
   
    }
}



let cur = document.getElementById("score")
let score = 0
let sequence = []

let delay = 1300 //2.93 sec is the duration of the files but player migt get inpatient
let min = 100 //0.1 secs, during testing is still intelligible

//plays the piano key corresponding to symbols[i]
function play(i) {
    new Audio(keys[i].src).play()
}

let timer
//Displays the sequence
function display() {
    sequence.push(keys[Math.random*keys.length])
    keys[0].button.className+="flash"
    index = 1
    timer=setTimeout(recurseFlash,delay)
}

function recurseFlash() {
    keys[index].button.className
}
function check() {
    if (this.textContent == sequence[index].key) {
        flash(sequence[index])
        index++
    }else{
        err(sequence[index])
    }
}

function keyPress(event) {
    if (event.key == sequence[index].key) {
        flash(sequence[index])
        index++
    }else{
        err(sequence[index])
    }
}

// while (true) {
//     display()

//     score = 0, sequence = 0, delay = 1300
// }

/* Testing index.html code:
<body>
    <script>new Audio('mp3/Ab4.mp3').play()
        setTimeout(function () { new Audio('mp3/Eb6.mp3').play() }, 1300)
    </script>
</body>
*/