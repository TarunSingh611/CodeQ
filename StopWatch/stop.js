rb = document.getElementsByClassName("rBut")[0]
gb = document.getElementsByClassName("gBut")[0]

let prevLap = 0;
let run, count = 0

hr = document.getElementById("hr")
min = document.getElementById("min")
sec = document.getElementById("sec")
ms = document.getElementById("ms")
hr.textContent = "00"
min.textContent = "00"
sec.textContent = "00"
ms.textContent = "00"



rb.addEventListener("click", function() {


    if (rb.children[0].textContent == "STOP") {
        gb.setAttribute("class", "circle bg-warning gBut")
        rb.setAttribute("class", "circle rBut bg-success")
        rb.children[0].textContent = "START"
        gb.children[0].textContent = "RESET"
        clearInterval(run)
    } else {
        gb.setAttribute("class", "circle bg-primary gBut")
        rb.setAttribute("class", "circle rBut bg-danger")
        rb.children[0].textContent = "STOP"
        gb.children[0].textContent = "LAP"
        run = setInterval(rtime, 10)
    }

})
gb.addEventListener("click", function() {
    if (
        gb.children[0].textContent == "RESET") {
        gb.children[0].textContent = "LAP"
        reset()

    } else {
        if (rb.children[0].textContent == "STOP") {
            lap()
        }

    }
})



function rtime() {

    let HR = parseInt(hr.textContent)
    let MIN = parseInt(min.textContent)
    let SEC = parseInt(sec.textContent)
    let MS = parseInt(ms.textContent)
    MS++;

    if (MS == 100) {
        SEC++;
        MS = 0;
    }

    if (SEC == 60) {
        MIN++;
        SEC = 0;
    }

    if (MIN == 60) {
        HR++;
        MIN = 0;
        SEC = 0;
    }

    if (HR < 10) {
        HR = "0" + HR;
    }

    if (MIN < 10) {
        MIN = "0" + MIN;
    }

    if (SEC < 10) {
        SEC = "0" + SEC;
    }

    if (MS < 10) {
        MS = "0" + MS;
    }

    hr.textContent = HR;
    min.textContent = MIN;
    sec.textContent = SEC;
    ms.textContent = MS;

}


function reset() {
    gb.setAttribute("class", "circle bg-secondary gBut")
    record = document.getElementById("record")
    hr.textContent = "00"
    min.textContent = "00"
    sec.textContent = "00"
    ms.textContent = "00"
    record.innerHTML = null
    prevLap = 0
    count = 0

}

function lap() {
    count++
    record = document.getElementById("record")
    let lapCon = document.createElement("Div")
    lapCon.setAttribute("class", "lapCon col-12")
    let lapCount = document.createElement("Div")
    lapCount.setAttribute("class", "lapCount col-1")
    let lapTime = document.createElement("Div")
    lapTime.setAttribute("class", "lapTime col-4")


    let HR = parseInt(hr.textContent)
    let MIN = parseInt(min.textContent)
    let SEC = parseInt(sec.textContent)
    let MS = parseInt(ms.textContent)

    let curLap = (HR * 60 * 60 * 100) + (MIN * 60 * 100) + (SEC * 100) + MS;
    let result = curLap - prevLap
    prevLap = curLap

    MS = result % 100;
    result = parseInt(result / 100);
    SEC = result % 60;
    result = parseInt(result / 60);
    MIN = result % 60;
    result = parseInt(result / 60);
    HR = result % 60;
    result = parseInt(result / 60);


    console.log(curLap)
    console.log(prevLap)

    if (HR < 10) {
        HR = "0" + HR;
    }

    if (MIN < 10) {
        MIN = "0" + MIN;
    }

    if (SEC < 10) {
        SEC = "0" + SEC;
    }

    if (MS < 10) {
        MS = "0" + MS;
    }


    lapCount.textContent = count
    let lt = HR + ":" + MIN + ":" + SEC + ":" + MS
    lapTime.textContent = lt

    lapCon.appendChild(lapCount)
    lapCon.appendChild(lapTime)
    record.insertBefore(lapCon, record.firstChild)




}