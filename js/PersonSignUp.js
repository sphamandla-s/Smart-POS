function Validate(){
    var passedTest = true;
    var msg = "<u>Missing information</u>";
    if(document.getElementById("firstname").value == "firstname" || document.getElementById("firstname").value == ""){
        msg = msg + "</br> Firstname";
        passedTest = false;
    }
    if(document.getElementById("surname").value == "surname" || document.getElementById("surname").value == ""){
        msg = msg + "</br> Surname";
        passedTest = false;
    }
    if(document.getElementById("email").value == "email" && document.getElementById("cell").value == "cell"){
        msg = msg + "</br> Email or Cell";
        passedTest = false;
    }
    if(document.getElementById("email").value == "" && document.getElementById("cell").value == ""){
        msg = msg + "</br> Email or Cell";
        passedTest = false;
    }
    var password = document.getElementById("password").value;
    var cornfPassword = document.getElementById("confirmPassword").value;
    if(password == "password" || cornfPassword == "cornfirm password"){
        msg = msg + "</br> Password or Confirm Password";
        passedTest = false;
    }
    if(password == "" || cornfPassword == ""){
        msg = msg + "</br> Password or Confirm Password";
        passedTest = false;
    }
    if(password.localeCompare(cornfPassword) != 0){
        msg = msg + "</br> Password and Confirm Password mismatch";
        passedTest = false;
    }
    if(document.getElementById("birthday").value == ""){
        msg = msg + "</br> Invalid date selected";
        passedTest = false;
    }
    if(passedTest == true){
        PersonSignUp();
    }else {
        //alert(msg);
        document.getElementById("error-resp").innerHTML = msg;
    }
}
function PersonSignUp() {
    var xhttp = new XMLHttpRequest();
    var firstname = document.getElementById("firstname").value;
    var surname = document.getElementById("surname").value;
    var gender = document.getElementById("gender").value;
    var birthdate = document.getElementById("birthday").value;
    var email = document.getElementById("email").value;
    var cell = document.getElementById("cell").value;
    var password = document.getElementById("password").value;
    var url = sessionStorage.getItem("host") + "/api/v1/personal/signUp?firstname=" + firstname +
        "&surname=" + surname + "&gender=" + gender +"&dob="+ birthdate +
        "&email=" + email + "&cell="+ cell +"&password="+ password +"&active=true";
    var rep;
    console.log(url);
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                sessionStorage.setItem("emailcell", obj.data.email);
                sessionStorage.setItem("emailcell", obj.data.cell);
                var redirectWindow = window.open('/personal/personalHome.html', '_self');
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }else{
            rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
            document.getElementById("main-container").innerHTML = rep;
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}