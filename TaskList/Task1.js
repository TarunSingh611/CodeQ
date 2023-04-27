var task

let textA = document.getElementById("input")

//creating a task
function createTask(textA) {

    //text
    let textBox = document.createElement("Div")
    textBox.setAttribute("class", "col-10 text-break text")

    let editBox = document.createElement("Input")
    editBox.setAttribute("type", "textbox")
    editBox.setAttribute("class", "col-10 text-break textE")
    editBox.setAttribute("style", "display:none")
        //btnArea
    let btnArea = document.createElement("DIV")
    btnArea.setAttribute("class", "col-2")
    btnArea.setAttribute("style", "padding:0px")
    textBox.textContent = textA

    //chkbox
    let chkBox = document.createElement("INPUT")
    chkBox.setAttribute("type", "checkbox");
    chkBox.setAttribute("class", "CB");
    chkBox.setAttribute("onclick", "chk(this)")


    //edit
    let edit = document.createElement("label")
    edit.setAttribute("class", "edit")
    edit.innerHTML = "&#128393"
    edit.setAttribute("onclick", "edit(this.parentNode.parentNode)")

    //delete
    let del = document.createElement("label")
    del.setAttribute("class", "del")
    del.innerHTML = "&#10006"
    del.setAttribute("onclick", "del(this.parentNode.parentNode)")

    //appending children
    let task = document.createElement("DIV")
    task.setAttribute("class", "row tsk")
    task.appendChild(textBox)
    task.appendChild(editBox)
    btnArea.appendChild(chkBox)
    btnArea.appendChild(edit)
    btnArea.appendChild(del)

    task.appendChild(btnArea)
    task.setAttribute("style", "border-bottom:#7e8893 solid 2px")
        //finalising
    tskArea.appendChild(task)

}

//Text Area Code
textA.addEventListener('keypress', function(e) {

    if (e.key === 'Enter') {
        textA.value = textA.value.trim();
        if (textA.value == "" || textA.value == "\n") {
            textA.value = "";

            textA.value = null
            return;
        }


        if (!localStorage.getItem("storageList")) {
            var storage = [];
        } else {
            storage = JSON.parse(localStorage.getItem("storageList"))
        }
        let text = textA.value
        let chkval = 0
        let task = { text, chkval };
        storage.push(task);


        localStorage.setItem("storageList", JSON.stringify(storage));

        createTask(text)
        textA.value = null

    }

});


//delete
function del(arg) {
    let data = JSON.parse(localStorage.getItem("storageList"));
    let tasks = document.getElementsByClassName("tsk");

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i] === arg) {
            data = data.filter((task, index) => index !== i);
            break;
        }
    }
    arg.remove()
    localStorage.setItem("storageList", JSON.stringify(data));

}




function chk(arg) {
    let data = JSON.parse(localStorage.getItem("storageList"));
    let CB = document.getElementsByClassName("CB");

    for (let i = 0; i < CB.length; i++) {

        if (CB[i] === arg) {
            if (data[i].chkval) {
                data[i].chkval = 0
                arg.parentNode.parentNode.setAttribute("class", "row tsk")
            } else {
                data[i].chkval = 1;
                arg.parentNode.parentNode.setAttribute("class", "row tsk tskLine")
            }
            break;
        }
    }

    localStorage.setItem("storageList", JSON.stringify(data));


}
//EditFunction
function edit(arg) {
    let data = JSON.parse(localStorage.getItem("storageList"));
    arg.children[1].value = arg.children[0].textContent
    arg.children[1].setAttribute("style", "display:block")
    arg.children[0].setAttribute("style", "display:none")
    arg.children[1].focus()

    arg.children[1].addEventListener("blur", function() {
        editCnf()

    })

    arg.children[1].addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { editCnf() }

    })

    let T = document.getElementsByClassName("text")
    let i = 0
    for (i; i < T.length; i++) {

        if (T[i] === arg.children[0]) {
            break
        }
    }

    function editCnf() {
        if (arg.children[1].value == "") {

            arg.children[0].setAttribute("style", "display:block")
            arg.children[1].setAttribute("style", "display:none")



        } else {
            data[i].text = arg.children[1].value
            arg.children[0].setAttribute("style", "display:block")
            arg.children[1].setAttribute("style", "display:none")
            arg.children[0].textContent = arg.children[1].value
            localStorage.setItem("storageList", JSON.stringify(data));

        }
    }
}


//loading Storage

function update() {

    let data = JSON.parse(localStorage.getItem("storageList"))
    for (let i of data) {
        createTask(i.text)
    }

    //checkboxUpdate
    let CB = document.getElementsByClassName("CB");
    for (let i = 0; i < CB.length; i++) {


        if (data[i].chkval) {
            CB[i].checked = true
            CB[i].parentNode.parentNode.setAttribute("class", "row tsk tskLine")
        } else { CB[i].checked = false }

    }
}
update()