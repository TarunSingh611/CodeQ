const langSelect = document.getElementById("lang");
const com = document.getElementById("compile");

if (localStorage.getItem("Qstore")) {
    langSelect.value = JSON.parse(localStorage.getItem("Qstore")).langId;
    document.getElementById("code").value = JSON.parse(localStorage.getItem("Qstore")).code;
}

com.addEventListener('click', function() {
    let langId = document.getElementById("lang").value;
    let code = document.getElementById("code").value;

    let Q = { code, langId };
    localStorage.setItem("Qstore", JSON.stringify(Q));

    compile(Q)
});

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://api.jdoodle.com/v1/execute';

function compile(Q) {
    const data = {
        clientId: "8014f077650a7b9af792f0b993673b4b",
        clientSecret: "97c3bb4609d29e6036158a664be4f7183ef177ef6143a3e62e7e9265e22b166e",
        script: Q.code,
        language: Q.langId,
        versionIndex: "0"
    };

    fetch(proxyUrl + apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            showResult(result.output);
        })
        .catch(error => {
            showResult(error);
        });
}


function showResult(output) {


    out = document.getElementById("output");
    out.innerHTML = output;

}