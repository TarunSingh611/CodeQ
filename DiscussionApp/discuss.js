let rgt = document.getElementById("rgt");
let rgtR = document.getElementById("rgtR");
let newBut = document.getElementById("newBut");
let id = 0
let count = 0

newBut.addEventListener("click", loadRD)

//loading right default

function loadRD() {
    rgtR.innerHTML = null
    let pad = document.getElementById("pad")
    pad.setAttribute("class", "col-7 rgt-con")
    rgt.setAttribute("class", "row")
}

//creating right default
function rgtDef() {

    //assignmning class
    let pad = document.getElementById("pad")
    pad.setAttribute("class", "col-7 rgt-con")

    let divRgDef = document.createElement("Div")
    divRgDef.setAttribute("class", "col-12 wel")

    //written welcome
    let head = document.createElement("span");
    head.setAttribute("class", "welTxt")
    head.textContent = "Welcome to Discussion Portal !"
    let des = document.createElement("span");
    des.setAttribute("class", "welDes")
    des.textContent = "Enter a subject and question to get started"
    let sub = document.createElement("input");
    sub.setAttribute("type", "textbox")
    sub.setAttribute("placeholder", "Subject")
    sub.setAttribute("class", "welSub")
    sub.setAttribute("id", "welSub")

    //textArea
    let question = document.createElement("textarea");
    question.setAttribute("rows", "6")
    question.setAttribute("placeholder", "Question")
    question.setAttribute("class", "welQ")
    question.setAttribute("id", "welQ")

    //button
    let but = document.createElement("button");
    but.setAttribute("id", "welBut")
    but.setAttribute("class", "ms-auto")
    but.setAttribute("type", "button")
    but.textContent = "Submit"
    but.setAttribute("onclick", "addQ()")

    //appending

    divRgDef.appendChild(head)
    divRgDef.appendChild(des)
    divRgDef.appendChild(sub)
    divRgDef.appendChild(question)
    divRgDef.appendChild(but)
    rgt.appendChild(divRgDef)
}


//type and add ques
function addQ() {

    let sub = document.getElementById("welSub");
    let ques = document.getElementById("welQ");

    //checking for emtly fields
    if (sub.value.trim() == "" || ques.value.trim() == "") {
        if (sub.value.trim() == "") { sub.value = ""; }
        if (ques.value.trim() == "") { ques.value = ""; }
        return
    } else {
        let Q = []
        if (localStorage.getItem("Qstore")) {
            Q = JSON.parse(localStorage.getItem("Qstore"));
        }
        let now = new Date().getTime();
        let rxn = [0, 0, 0, 0]
        values = [id, sub.value, ques.value, rxn, now]
        Q.push(values)

        localStorage.setItem("Qstore", JSON.stringify(Q));
        createQbox(id, sub.value, ques.value, rxn, now)
        id++

    }
    sub.value = ""
    ques.value = ""
}

//update Q list on left part

function updateQList() {
    div = document.createElement("div")
    div.setAttribute("id", "nf")
    div.setAttribute("class", "rgt-hid")
    div.textContent = "No match found"
    document.getElementById("qArea").innerHTML = null
    document.getElementById("qArea").appendChild(div)
    if (localStorage.getItem("Qstore")) {

        Q = JSON.parse(localStorage.getItem("Qstore"));
        for (let i of Q) {

            createQbox(i[0], i[1], i[2], i[3], i[4])

        }
    }

}

//creating boxes for questiob on left part
function createQbox(id, Hd, Qs, rxn, time) {

    let qA = document.getElementById("qArea");
    let setS = document.createElement("Div")
    setS.setAttribute("class", "setS")
    let setQ = document.createElement("Div")
    setQ.setAttribute("class", "setQ")
    let setT = document.createElement("Div")
    setT.setAttribute("class", "setT")


    setS.textContent = Hd;
    setQ.textContent = Qs;
    setT.setAttribute("id", time);
    setT.textContent = getTime(time)

    //icons
    let icon = document.createElement("label");
    icon.setAttribute("class", "icon")

    //up
    let uicon = document.createElement("label")
    uicon.setAttribute("onclick", "up(this)")
    uicon.innerHTML = "&#128077;"
    let upvotes = document.createElement("label")
    upvotes.innerHTML = rxn[0]
    let up = document.createElement("label")
    up.appendChild(uicon)
    up.appendChild(upvotes)


    //star
    let star = document.createElement("label")
    star.innerHTML = "&#9733;";
    star.setAttribute("onclick", "fav(this)")
    if (rxn[2]) {
        star.setAttribute("class", "fav");
    } else {
        star.setAttribute("class", "notfav");
    }

    //down
    let dicon = document.createElement("label")
    dicon.setAttribute("onclick", "dn(this)")
    dicon.innerHTML = "&#128078";
    let dnvotes = document.createElement("label")
    dnvotes.innerHTML = -rxn[1]
    let dn = document.createElement("label")
    dn.appendChild(dicon)
    dn.appendChild(dnvotes)


    icon.appendChild(up)
    icon.appendChild(star)
    icon.appendChild(dn)

    //text
    let qText = document.createElement("Div");

    qText.setAttribute("class", "text")
    qText.setAttribute("onClick", "loadQ(this)")
    qText.setAttribute("id", id)

    qText.appendChild(setS)
    qText.appendChild(setQ)
    qText.appendChild(setT)

    let qBox = document.createElement("Div");
    qBox.setAttribute("class", "qBox flex")


    qBox.append(qText)
    qBox.append(icon)
    qA.appendChild(qBox)

}

//loading Q and responses
function loadQ(arg) {

    let pad = document.getElementById("pad")
    rgt.setAttribute("class", "row rgt-hid")
    pad.setAttribute("class", "col-7 rgt-con-pd")

    let Q = JSON.parse(localStorage.getItem("Qstore"))


    for (i of Q) {

        if (arg.id == i[0]) {
            break;
        }
    }

    rgtR.innerHTML = null
    count = 0
    DispQ(i)
    resp(i)
    createResA()


}

//display Question
function DispQ(i) {

    let divRgDef = document.createElement("Div")
    divRgDef.setAttribute("class", "col-12 res")

    let resCon = document.createElement("Div");
    resCon.setAttribute("class", "resCon")


    let head = document.createElement("span");
    head.setAttribute("class", "greyHead")
    head.textContent = "Question"

    let sub = document.createElement("div");

    sub.textContent = i[1]

    sub.setAttribute("class", "resSub")
    let question = document.createElement("div");
    question.textContent = i[2]

    question.setAttribute("class", "resQ")


    let but = document.createElement("button");
    but.setAttribute("class", "but-rt ms-auto")
    but.setAttribute("type", "button")
    but.setAttribute("onClick", "resB(i)")
    but.textContent = "Resolve"

    divRgDef.appendChild(head)

    resCon.appendChild(sub)
    resCon.appendChild(question)
    divRgDef.append(resCon)
    divRgDef.appendChild(but)
    rgtR.appendChild(divRgDef)
}

//textarea to add responses
function createResA(i) {

    let divRgDef = document.createElement("Div")
    divRgDef.setAttribute("class", "col-12 wel")

    let head = document.createElement("span");
    head.setAttribute("class", "greyHead")
    head.textContent = "Add Response"

    let sub = document.createElement("input");
    sub.setAttribute("type", "textbox")
    sub.setAttribute("placeholder", "Enter Name")
    sub.setAttribute("class", "welSub")
    sub.setAttribute("id", "rName")


    let answer = document.createElement("textarea");
    answer.setAttribute("rows", "4")
    answer.setAttribute("placeholder", "Enter Comment")
    answer.setAttribute("class", "welQ")
    answer.setAttribute("id", "rAns")


    let but = document.createElement("button");
    but.setAttribute("class", "ms-auto")
    but.setAttribute("type", "button")
    but.setAttribute("onClick", "subRes(i)")
    but.textContent = "Submit"


    divRgDef.appendChild(head)

    divRgDef.appendChild(sub)
    divRgDef.appendChild(answer)
    divRgDef.appendChild(but)

    rgtR.appendChild(divRgDef)

}

//responses Area
function resp(i) {

    let divRgDef = document.createElement("Div")
    divRgDef.setAttribute("class", "col-12")
    divRgDef.setAttribute("id", i[0])

    let head = document.createElement("span");
    head.setAttribute("class", "greyHead")
    head.textContent = "Response"

    let RC = document.createElement("div")
    RC.setAttribute("id", "rArea")


    divRgDef.appendChild(head)

    divRgDef.appendChild(RC)

    rgtR.appendChild(divRgDef)

    for (let j = 5; j < i.length; j++) {
        dispR(i[j]);
    }


}

//resolve Button
function resB(arg) {
    let i = 0
    let j = 0
    let list = document.getElementsByClassName("qBox")
    let Q = JSON.parse(localStorage.getItem("Qstore"));
    for (i; i < Q.length; i++) {

        if (arg[0] == Q[i][0]) {
            break;
        }
    }
    for (j of list) {

        if (j.children[0].id == Q[i][0]) {
            break;
        }
    }


    j.remove()
    Q.splice(i, 1)

    localStorage.setItem("Qstore", JSON.stringify(Q));
    loadRD()
}

//reNumerising IDs
function favSort() {
    if (localStorage.getItem("Qstore")) {

        let Q1 = [],
            Q2 = [];

        let Q = JSON.parse(localStorage.getItem("Qstore"))
        for (let i = 0; i < Q.length; i++) {


            if (Q[i][3][2] == 1) {

                Q1.push(Q[i])

            } else {
                Q2.push(Q[i])
            }
        }

        Q1.push(...Q2)
        localStorage.setItem("Qstore", JSON.stringify(Q1));


    }
}


//submit responses
function subRes(arg) {
    let Name = document.getElementById("rName")
    let Ans = document.getElementById("rAns")


    if (Name.value.trim() == "" || Ans.value.trim() == "") {
        if (Name.value.trim() == "") { Name.value = ""; }
        if (Ans.value.trim() == "") { Ans.value = ""; }
        return
    } else {

        let Q = JSON.parse(localStorage.getItem("Qstore"));
        let i = 0


        for (i; i < Q.length; i++) {

            if (arg[0] == Q[i][0]) {

                break;
            }
        }
        let tm = new Date().getTime()


        let res = [0, 0, Name.value, Ans.value, count, 0, tm]
        Q[i].push(res)
        sorCo(i)


        localStorage.setItem("Qstore", JSON.stringify(Q));
        sorCo(i)

        Name.value = ""
        Ans.value = ""
    }
}

//show responses
function dispR(arg) {

    let RC = document.getElementById("rArea")

    RC.setAttribute("class", "dispRes")

    let box = document.createElement("Div");
    box.setAttribute("class", "rbox")
    box.setAttribute("id", arg[4])

    let nm = document.createElement("div");
    nm.textContent = arg[2]
    nm.setAttribute("class", "resSub")
    let ans = document.createElement("div");
    ans.textContent = arg[3]
    ans.setAttribute("class", "resQ")

    let tm = document.createElement("div");
    tm.setAttribute("class", "setT")
    tm.setAttribute("id", arg[6])
    tm.textContent = getTime(arg[6])

    //icons
    let icon = document.createElement("label");
    icon.setAttribute("class", "icon")

    //up
    let uicon = document.createElement("label")
    uicon.setAttribute("onclick", "upR(this)")
    uicon.innerHTML = "&#128077;"
    let upvotes = document.createElement("label")
    upvotes.innerHTML = arg[0]
    let up = document.createElement("label")
    up.appendChild(uicon)
    up.appendChild(upvotes)

    //down
    let dicon = document.createElement("label")
    dicon.setAttribute("onclick", "dnR(this)")
    dicon.innerHTML = "&#128078";
    let dnvotes = document.createElement("label")
    dnvotes.innerHTML = -arg[1]
    let dn = document.createElement("label")
    dn.appendChild(dicon)
    dn.appendChild(dnvotes)


    //append icon
    icon.appendChild(up)
    icon.appendChild(dn)

    //text
    let qText = document.createElement("Div");
    qText.setAttribute("class", "text")
    qText.appendChild(nm)
    qText.appendChild(ans)
    qText.appendChild(tm)

    box.append(qText)
    box.append(icon)
    RC.append(box)
    count++

}

// searchBox
searchBox = document.getElementById("searchBox")
searchBox.addEventListener("input", function(e) {
    let nf = document.getElementById("nf")

    let qB = document.getElementsByClassName("qBox")
    let text = e.target.value.trim()

    if (text) {

        flag = true


        for (let i of qB) {

            let title = i.children[0].children[0]
            let desc = i.children[0].children[1]
            let titleText = title.innerHTML
            let descText = desc.innerHTML

            //remove highlight
            titleText = titleText.replace(/<\/?mark>/g, '');
            descText = descText.replace(/<\/?mark>/g, '');

            if (titleText.toLowerCase().includes(text.toLowerCase()) || descText.toLowerCase().includes(text.toLowerCase())) {
                i.setAttribute("class", "qBox flex")
                flag = false

                //highlight
                titleText = titleText.replace(new RegExp(text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'), match => `<mark>${match}</mark>`)
                    // newTitle = newTitle.replace(/<\/?mark>/g, '');
                descText = descText.replace(new RegExp(text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'), match => `<mark>${match}</mark>`)
                    // newDesc = newDesc.replace(/<\/?mark>/g, '');



            } else { i.setAttribute("class", "qBox rgt-hid") }
            title.innerHTML = titleText
            desc.innerHTML = descText
        }

        if (flag) { nf.setAttribute("class", "nf") } else {
            nf.setAttribute("class", "rgt-hid")
        }

    } else {
        for (let i of qB) {
            i.setAttribute("class", "qBox flex")
            nf.setAttribute("class", "rgt-hid")

            //remove highlight
            let title = i.children[0].children[0]
            let desc = i.children[0].children[1]
            let titleText = title.innerHTML
            let descText = desc.innerHTML

            titleText = titleText.replace(/<\/?mark>/g, '');
            descText = descText.replace(/<\/?mark>/g, '');
            title.innerHTML = titleText
            desc.innerHTML = descText

        }
    }
})


//code for star
function fav(arg) {
    eleId = arg.parentNode.parentNode.children[0].id
    Q = JSON.parse(localStorage.getItem("Qstore"))
    let i
    for (i of Q) {

        if (i[0] == eleId) {
            if (i[3][2]) {
                arg.setAttribute("class", "notfav")
                i[3][2] = 0
            } else {
                arg.setAttribute("class", "fav")
                i[3][2] = 1
            }
            Q.sort((a, b) => {
                const aFourthElement = a[3][3]; // get the fourth element of the subarray in the first inner array
                const bFourthElement = b[3][3]; // get the fourth element of the subarray in the second inner array
                return bFourthElement - aFourthElement; // sort in descending order
            });
            localStorage.setItem("Qstore", JSON.stringify(Q));
            favSort()
            updateQList()
        }
    }
}

//thumbs UP
function up(arg) {


    eleId = arg.parentNode.parentNode.parentNode.children[0].id
    Q = JSON.parse(localStorage.getItem("Qstore"))

    let i
    for (i of Q) {

        if (i[0] == eleId) {
            i[3][0]++;
            i[3][3]++;
            localStorage.setItem("Qstore", JSON.stringify(Q));
            arg.parentNode.children[1].textContent = i[3][0]
        }
    }
    Q.sort((a, b) => {
        const aFourthElement = a[3][3]; // get the fourth element of the subarray in the first inner array
        const bFourthElement = b[3][3]; // get the fourth element of the subarray in the second inner array
        return bFourthElement - aFourthElement; // sort in descending order
    });

    localStorage.setItem("Qstore", JSON.stringify(Q));
    favSort()
    updateQList()
}

//Thumbs Down
function dn(arg) {


    eleId = arg.parentNode.parentNode.parentNode.children[0].id
    Q = JSON.parse(localStorage.getItem("Qstore"))

    let i
    for (i of Q) {

        if (i[0] == eleId) {
            i[3][1]--;
            i[3][3]--;
            localStorage.setItem("Qstore", JSON.stringify(Q));
            arg.parentNode.children[1].textContent = (-i[3][1])
        }
    }
    Q.sort((a, b) => {
        const aFourthElement = a[3][3]; // get the fourth element of the subarray in the first inner array
        const bFourthElement = b[3][3]; // get the fourth element of the subarray in the second inner array
        return bFourthElement - aFourthElement; // sort in descending order
    });

    localStorage.setItem("Qstore", JSON.stringify(Q));
    favSort()
    updateQList()
}

//thumbs UP -Response
function upR(arg) {
    let Q = JSON.parse(localStorage.getItem("Qstore"));

    eleId = arg.parentNode.parentNode.parentNode.parentNode.parentNode.id
    resId = arg.parentNode.parentNode.parentNode.id

    let i
    for (i of Q) {

        if (i[0] == eleId) {
            for (let j = 5; j < i.length; j++) {
                if (i[j][4] == resId) {
                    i[j][0]++;
                    i[j][5]++;
                    localStorage.setItem("Qstore", JSON.stringify(Q));
                    arg.parentNode.children[1].textContent = i[j][0]

                }
            }
            sorCo(eleId)
        }
    }
}

//Thumbs Down-response
function dnR(arg) {

    let Q = JSON.parse(localStorage.getItem("Qstore"));
    eleId = arg.parentNode.parentNode.parentNode.parentNode.parentNode.id
    resId = arg.parentNode.parentNode.parentNode.id

    let i
    for (i of Q) {

        if (i[0] == eleId) {
            for (let j = 5; j < i.length; j++) {
                if (i[j][4] == resId) {
                    i[j][1]--;
                    i[j][5]--;
                    localStorage.setItem("Qstore", JSON.stringify(Q));
                    arg.parentNode.children[1].textContent = -i[j][1]

                }
            }
            sorCo(eleId)
        }
    }
}

//function to sort comments
function sorCo(arg) {

    let Q = JSON.parse(localStorage.getItem("Qstore"));
    let R = JSON.parse(localStorage.getItem("Qstore"));

    for (let i = 0; i < Q.length; i++) {
        if (Q[i][0] == arg) {
            Q[i].splice(5)
            R = R[i].splice(5)

            //sort
            R.sort((a, b) => {
                const a5 = a[5];
                const b5 = b[5];
                return b5 - a5; // sort in descending order
            });



            Q[i].push(...R)
            RC = document.getElementById("rArea")
            RC.innerHTML = null
            for (let j = 5; j < Q[i].length; j++) {
                dispR(Q[i][j]);
            }

            localStorage.setItem("Qstore", JSON.stringify(Q));
        }
    }

}



function reSort() {
    if (localStorage.getItem("Qstore")) {

        let Q = JSON.parse(localStorage.getItem("Qstore"))

        let locId = 0
        for (let i of Q) {

            i[0] = locId
            locId++
        }
        localStorage.setItem("Qstore", JSON.stringify(Q));
        id = locId
    }
}




//live time 
setInterval(Time, 1000)

//Time function
function Time() {
    let timeS = document.getElementsByClassName("setT")
    for (let k of timeS) {
        k.textContent = getTime(k.id)
    }
}



//time function-courtesy(SOF)
function getTime(timestamp) {
    const now = new Date().getTime();
    const secondsSince = Math.floor((now - timestamp) / 1000);

    if (secondsSince < 60) {
        return `${secondsSince} second${secondsSince === 1 ? '' : 's'} ago`;
    }

    const minutesSince = Math.floor(secondsSince / 60);

    if (minutesSince < 60) {
        return `${minutesSince} minute${minutesSince === 1 ? '' : 's'} ago`;
    }

    const hoursSince = Math.floor(minutesSince / 60);

    if (hoursSince < 24) {
        return `${hoursSince} hour${hoursSince === 1 ? '' : 's'} ago`;
    }

    const daysSince = Math.floor(hoursSince / 24);

    if (daysSince < 7) {
        return `${daysSince} day${daysSince === 1 ? '' : 's'} ago`;
    }

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    return `${month} ${date.getDate()}, ${year}`;
}



reSort()

rgtDef()

updateQList()