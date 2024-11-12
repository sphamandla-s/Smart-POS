function CreateAddUser() {
    var newItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Firstname</label>\n" +
        "                    <input type=\"text\" id=\"firstname\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Surname</label>\n" +
        "                    <input type=\"text\" id=\"surname\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Username</label>\n" +
        "                    <input type=\"text\" id=\"username\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Password</label>\n" +
        "                    <input type=\"text\" oninput=\"checkPassword()\" id=\"password\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='sendUser' value=\"Save\" onclick=\"SaveUser()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newItem;
    document.getElementById('sendUser').addEventListener('click',function (event){
        event.preventDefault();
    });
}
function checkPassword(){
    //window.alert('testing password');
}
function CreateUpdateUser(id) {
    var newItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Firstname</label>\n" +
        "                    <input type=\"text\" id=\"firstname\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Surname</label>\n" +
        "                    <input type=\"text\" id=\"surname\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Username</label>\n" +
        "                    <input type=\"text\" id=\"username\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Password</label>\n" +
        "                    <input type=\"text\" id=\"password\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <input type=\"submit\" value=\"Update\" onclick=\"\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newItem;
    FetchUser(id);
}
function FetchUser(id){
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/system/users/find?storecode="+
        sessionStorage.getItem("storecode") + "&username="+
        sessionStorage.getItem("username") + "&id="+ id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                document.getElementById("firstname").value = obj.data.name;
                document.getElementById("surname").value = obj.data.surname;
                document.getElementById("username").value = obj.data.username;
                document.getElementById("password").value = "#####";
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
async function SendSystemUsersList(){
    const obj = await SystemUsersList();
    var rep;
    if(obj.success == true && obj.code == 200){
        rep = "<table class='table-filled' border='2' width=\"100%\">\n" +
            "        <thead>\n" +
            "            <tr>\n" +
            "                <th>Firstname</th>\n" +
            "                <th>Surname</th>\n" +
            "                <th>Username</th>\n" +
            "                <th>Pin</th>\n" +
            "                <th>Author</th>\n" +
            "                <th>CreatedDate</th>\n" +
            //"                <th>Action</th>\n" +
            "            </tr>\n" +
            "        </thead>\n";
        var c;
        for(c = 0; c < obj.count; c++){
            rep += "<tr>";
            rep += "<td>" + obj.data[c].name + "</td>";
            rep += "<td>" + obj.data[c].surname + "</td>";
            rep += "<td>" + obj.data[c].username + "</td>";
            rep += "<td>#####</td>";
            rep += "<td>" + obj.data[c].author + "</td>";
            rep += "<td>" + obj.data[c].udate + " ";
            rep += obj.data[c].utime + "</td>";
            //rep += "<td>";
            //rep +="<a onclick='CreateUpdateUser("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Edit</a>";
            //rep += "</td>";
        }
        rep += "</tr>";
        rep += "</table>";
        document.getElementById("main-container").innerHTML = rep;
    }else{
        var resp = "There are no registered users";
        document.getElementById("resp").innerHTML = "<p align='center'>"+ resp +"</p>";
    }

}
function SystemUsersList(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/system/users/list?username="+
        sessionStorage.getItem("username") + "&storecode="+
        sessionStorage.getItem("storecode"),{
        method: "GET",
        headers: {"Content-Type" : "application/json"}
    })
        .then(response=>response.json())
        .then(data=>{
            return data;
        })
        .catch(error =>{
            console.error("error:", error.message);
        })
}
async function SaveUser(){
    const url = sessionStorage.getItem("host") + "/api/v1/system/users/add?username="+
        sessionStorage.getItem("username") + "&addedUsername="+
        document.getElementById("username").value + "&addedPassword="+
        document.getElementById("password").value + "&storecode="+
        sessionStorage.getItem("storecode") + "&firstname="+
        document.getElementById("firstname").value + "&surname="+
        document.getElementById("surname").value;
    const options = {
        method: "PUT",
        headers: {"Content-Type" : "application/json"}
    }
    try {
        let result = await fetch(url,options)
        if(result.ok){
            //console.log(result.json());
            SendSystemUsersList();
        }
    }catch (error){
        console.error("error: "+ error);
        return error;
    }

}

function toggleSidebar() {
    const sidebar = document.querySelector('.main-side');
    const mainContainer = document.querySelector('.main-container');
    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        mainContainer.style.marginLeft = '260px';
    } else {
        mainContainer.style.marginLeft = '0';
    }
}