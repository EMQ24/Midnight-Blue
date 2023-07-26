let hard = false
document.getElementById("hard").addEventListener("click", () => {
    hard = !hard
    if (hard) document.getElementsByTagName("body")[0].style.backgroundImage = "unset", document.getElementById("hard").textContent = "🌃"
    else document.getElementsByTagName("body")[0].style.backgroundImage = "url(background.png)", document.getElementById("hard").textContent = "💡"
})
let sound = true
document.getElementById("sound").addEventListener("click", () => {
    sound = !sound
    if (sound) document.getElementById("sound").textContent = "🔈"
    else document.getElementById("sound").textContent = "🔊"
})

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
let symbols = "1!2@34$5%6^78*9(0qQwWeErtTyYuiIoOpPasSdDfgGhHjJklLzZxcCvVbBn"
let left = 0;
let index = 0
for (let octave = 2, noteNumber = 0; octave <= 6; octave++) {
    let octaveDiv = document.createElement("div");
    // octaveDiv.className = "octave";
    // document.getElementById("key").appendChild(octaveDiv);
    for (let i = 0; i < scale.length; i++, noteNumber++) {
        let note = scale[i];
        if (noteNumber != 0) {
            previousNote = keys[noteNumber - 1];
            //if the previous note is flat
            if (previousNote.isFlat) {
                //move one half black width to the right
                left = left + blackWidth / 2;
                //if the previous note is not flat
            } else {
                //if the current note is flat
                if (note.isFlat) {
                    left = left + whiteWidth - blackWidth / 2;
                } else {
                    left = left + whiteWidth;
                }
            }
        }
        let keyButton = document.createElement("button");
        let color = "white";
        if (note.isFlat) {
            color = "black";
        }
        keyButton.style.setProperty("left", left + "px");
        // octaveDiv.appendChild(keyButton);
        document.getElementById("key").appendChild(keyButton)
        keyButton.className = color + " key";
        keyButton.textContent = symbols[noteNumber]
        keyButton.addEventListener("click", check)
        let sample = "mp3/" + note.letter;
        if (note.isFlat) {
            sample += "b";
        }
        sample += octave + ".mp3";
        let keyObject = { letter: note.letter, isFlat: note.isFlat, src: sample, button: keyButton, key: symbols[noteNumber] }
        keys.push(keyObject);
        keyButton.keyObject = keyObject;
    }
}

let cur = document.getElementById("score")
let score = 0
let sequence = []

let delay = 1300 //2.93 sec is the duration of the files but player migt get inpatient
let min = 100 //0.1 secs, during testing is still intelligible

//would be more convenient to add to keyObject? whatever sashrik working on the object right now so not now
function play(keyObject) {
    new Audio(keyObject.src).play()
}

let timer
//Displays the sequence
function display() {
    sequence.push(keys[Math.floor(Math.random() * keys.length)])
    flash(sequence[0])
    index = checker = 0
    if (sequence.length <= 1)
        timer = setInterval(function () {
            flash(sequence[0])  //aaaaaaa
        }, delay);
    else {
        index = 1
        timer = setTimeout(recurseFlash, delay)
    }
}

function recurseFlash() {
    flash(sequence[index])
    index++
    if (index < sequence.length) timer = setTimeout(recurseFlash, delay)
}
let checker = 0
function check() {
    flash(this.keyObject)
    if (checker >= sequence.length) return
    clearInterval(timer)
    if (this.textContent == sequence[checker].key) {
        checker++
        if (checker == sequence.length) {
            if (sequence.length > 0 && sequence.length % 3 == 0) {
                if (sound) new Audio("mp3/0speedup.mp3").play()
                delay -= 100
            }
            score++
            cur.textContent = score
            if (sound) new Audio("mp3/0success.mp3").play()
            timer = setTimeout(display, 2930)
        }
    } else {
        err(this.keyObject)
    }
}

function keyPress(event) {
    if (symbols.includes(event.key)) {
        flash(keys[symbols.indexOf(event.key)])
        if (checker >= sequence.length) return
        clearInterval(timer)
        if (event.key == sequence[checker].key) {
            checker++
            if (checker == sequence.length) {
                if (sequence.length > 0 && sequence.length % 3 == 0) {
                    if (sound) new Audio("mp3/0speedup.mp3").play()
                    delay -= 100
                }
                score++
                cur.textContent = score
                if (sound) new Audio("mp3/0success.mp3").play()
                timer = setTimeout(display, 2930)
            }
        } else {
            err(keys[symbols.indexOf(event.key)])
        }
    }
}
function flash(keyObject) {
    if (!hard && started) {
        keyObject.button.focus()
    }
    play(keyObject)
}

function err(keyObject) {
    keyObject.button.focus()
    play(keyObject)
    keyObject.button.className += " err"
    timer = setTimeout(() => { keyObject.button.classList.remove("err"); display() }, 2930)
    if (sound) new Audio("mp3/0fail.mp3").play() //todo: trim opening blank
    if (score > document.getElementById("highscore").textContent) document.getElementById("highscore").textContent = score
    sequence = []
    delay = 1300
    score = 0
    cur.textContent = 0
}
document.addEventListener("keyup", keyPress)
let started = false
document.getElementById("play").addEventListener("click", start)
function start() {
    started = !started
    if (started) {
        document.getElementById("play").textContent = "Stop"
        document.removeEventListener("keyup", keyPress)
        document.addEventListener("keydown", keyPress)
        display()
    } else {
        document.getElementById("play").textContent = "Play"
        document.removeEventListener("keydown", keyPress)
        document.addEventListener("keyup", keyPress)
        clearInterval(timer)
        sequence = []
        delay = 1300
        score = 0
        cur.textContent = 0
        checker = index = 0
        if (document.getElementsByClassName("err").length != 0)
            document.getElementsByClassName("err")[0].classList.remove("err")
    }
}

/* Testing index.html code:
<body>
    <script>new Audio('mp3/Ab4.mp3').play()
        setTimeout(function () { new Audio('mp3/Eb6.mp3').play() }, 1300)
    </script>
</body>
*/