let sess = document.getElementById("session");
let timer = document.getElementById("timer");
let run

let Mn = document.getElementById("timeMin");
let Sc = document.getElementById("timeSec");
let ST = document.getElementById("sesT");
let BT = document.getElementById("bT");


let sInc = document.getElementById("sInc");
let sDec = document.getElementById("sDec");
let bInc = document.getElementById("bInc");
let bDec = document.getElementById("bDec");
let SP = document.getElementById("start");
let rst = document.getElementById("reset");

sess.textContent = "OFF"
ST.textContent = "20"
BT.textContent = "05"
Mn.textContent = "00"
Sc.textContent = "00"


let timeCount = 0
let secCount = 0
let flag = 0,
    count = 0;

sInc.addEventListener("click", function() {

    let arg = parseInt(ST.textContent);
    arg++
    if (arg < 10) {
        arg = "0" + arg;
    }
    ST.textContent = arg;

})

sDec.addEventListener("click", function() {
    let arg = parseInt(ST.textContent);
    if (arg == 1) {
        return;
    } else {
        arg--;
        if (arg < 10) {
            arg = "0" + arg;
        }
        ST.textContent = arg;
    }
})

bInc.addEventListener("click", function() {
    let arg = parseInt(BT.textContent);
    arg++
    if (arg < 10) {
        arg = "0" + arg;
    }
    BT.textContent = arg;
})

bDec.addEventListener("click", function() {
    let arg = parseInt(BT.textContent);
    if (arg == 1) {
        return;
    } else {
        arg--;
        if (arg < 10) {
            arg = "0" + arg;
        }
        BT.textContent = arg;
    }
})

rst.addEventListener("click", function() {

    timer.setAttribute("style", "color: grey")
    SP.textContent = "Start"

    sInc.disabled = false;
    sDec.disabled = false;
    bInc.disabled = false;
    bDec.disabled = false;
    count = 0
    sess.textContent = "OFF"
    ST.textContent = "20"
    BT.textContent = "05"
    Mn.textContent = "00"
    Sc.textContent = "00"
    timeCount = 0
    secCount = 0
    flag = 0
    clearInterval(run)

})


SP.addEventListener("click", function() {

    if (SP.textContent == "Start") {


        SP.textContent = "Pause"


        sInc.disabled = true;
        sDec.disabled = true;
        bInc.disabled = true;
        bDec.disabled = true;

        run = setInterval(time, 10)

    } else if (SP.innerHTML == "Pause") {
        SP.textContent = "Play"
        console.log(run)
        clearInterval(run)
        console.log(run)

    } else {
        SP.textContent = "Pause";

        run = setInterval(time, 10)

    }
})




function time() {
    secCount = timeCount % 60
    if (secCount == 0) {
        if (timeCount == 0) {
            if (flag == 0) {
                count++
                sess.textContent = "Session : " + count

                flag = 1;
                timeCount = parseInt(ST.textContent) * 60
                timer.setAttribute("style", "color: #00a0b0")


            } else {
                flag = 0;
                sess.textContent = "Break!"
                timeCount = parseInt(BT.textContent) * 60
                timer.setAttribute("style", "color: #f2714a")
            }

        }
        let Min = parseInt(timeCount / 60)
        if (Min < 10) {
            Min = "0" + Min
        }
        Mn.textContent = Min;
    }
    let Min = parseInt(timeCount / 60)
    if (Min < 10) {
        Min = "0" + Min
    }
    if (secCount < 10) {
        secCount = "0" + secCount
    }


    Mn.textContent = Min;

    Sc.textContent = secCount

    timeCount--
    secCount = timeCount % 60

}