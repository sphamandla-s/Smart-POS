window.history.pushState({},null, sessionStorage.getItem('url'));
function signUp() {
    window.open('personalSignUp.html', '_self');
}
/**
 function Loggin() {
        var xhttp = new XMLHttpRequest();
        var username = document.getElementById("username").value;
        var password = document.getElementById("exampleInputPassword1").value;
        var storecode = document.getElementById("storecode").value
        var url = "http://localhost:2019/api/v1/personal/loggin?emailorcell=mkokosb%40gmail.com&password=try123...";
        xhttp.onreadystatechange = function() {
            if (this.status == 200) {
                var response = xhttp.responseText;
                var obj = JSON.parse(response);
                if (obj.success == true) {
                    var redirectWindow = window.open('/store/businessHome.html', '_self');
                } else {
                    document.getElementById("main-container").innerHTML = "<p align='center'>Incorrect Loggin details</p>";
                }
            }else{
                var rep = "Status: " + obj.status + "</br>Code :" + obj.error;
                document.getElementById("main-container").innerHTML = rep;
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

 **/
function PersonIn() {
    var xhttp = new XMLHttpRequest();
    var emailcell = document.getElementById("exampleInputEmail1").value;
    var password = document.getElementById("exampleInputPassword1").value;
    var url = sessionStorage.getItem("host") + "/api/v1/personal/loggin?emailorcell="+
        emailcell + "&password="+ password;
    var rep;
    console.log(url);
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                sessionStorage.setItem("emailcell", emailcell);
                var redirectWindow = window.open('/personal/personalHome.html', '_self');
            } else {

            }
        }else{

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
/**
function ReplaceUrl(){
    window.history.pushState("object or string", "Title", sessionStorage.getItem("url"));
}
*/

async function SendBussinessLoggin() {
    console.log("Attempting to log in...");
    const obj = await BussinessLoggin();

    if (obj && obj.success === true && obj.code === 200) {
        sessionStorage.setItem("username", obj.data.username);
        sessionStorage.setItem("storecode", obj.data.storeCode);
        window.location.href = '/store/business.html';
    } else {
        document.getElementById("resp").innerHTML = "<p align='center'>Incorrect Login details</p>";
    }
}

function BussinessLoggin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("exampleInputPassword1").value;
    const storecode = document.getElementById("storecode").value;
    const url = `${sessionStorage.getItem("host")}/api/v1/system/users/loggin?storecode=${storecode}&username=${username}&pin=${password}`;

    console.log(`Fetching from URL: ${url}`);
    return fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .catch(error => {
        console.error("Login request failed:", error.message);
        document.getElementById("resp").innerHTML = "<p align='center'>Error during login attempt. Please try again later.</p>";
    });
}

async function SendPersonalLoggin(){
    const obj = await PersonalLoggin();
    //console.log(obj);
    if(obj.success == true && obj.code == 200){
        var emailcell = document.getElementById("exampleInputEmail1").value;
        sessionStorage.setItem("emailcell", emailcell);
        var redirectWindow = window.open('/personal/personal.html', '_self');
    }else{
        document.getElementById("resp").innerHTML = "<p align='center'>Incorrect Loggin details</p>";
    }

}
async function PersonalLoggin(){
    var emailcell = document.getElementById("exampleInputEmail1").value;
    var password = document.getElementById("exampleInputPassword1").value;
    try {
        const response = await fetch(sessionStorage.getItem("host") + "/api/v1/personal/loggin?emailorcell=" +
            emailcell + "&password=" + password, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
