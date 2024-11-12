function ViewSender(id){
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/messages/store/inbox/sender?messageId="+
        id + "&storecode="+ sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<p align='left'>Name: " + obj.data.firstname;
                rep += " " + obj.data.surname + "</br>";
                rep += "Phone: " + obj.data.cell + "</br>";
                rep += "Email: " + obj.data.email;
                //rep += "</br><input type='button' class='button' value='OK' onclick='FetchList()'"
                rep += "</p>"
                document.getElementById("main-container").innerHTML = rep;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function InsertViewMessage(text) {
    document.getElementById("body").value = text;
}
function ViewMessage(id) {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <textarea id=\"body\" name=\"body\" rows=\"3\" cols=\"45\" placeholder='Message'></textarea>\n" +
        "                </div>\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/messages/store/inbox/view?storecode="+
        sessionStorage.getItem("storecode") + "&messageId="+ id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                document.getElementById("body").value = obj.data.body;
                //var msg = obj.data.body;
                //document.getElementById("sub-menu").innerHTML = rep;
                //InsertViewMessage(msg);
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function FetchList() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/messages/store/inbox/list?storecode="+
        sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width=\"100%\">\n"+
                    "        <tr>\n" +
                    "            <th>CreatedDate</th>\n" +
                    "            <th>Subject</th>\n" +
                    "            <th>Read</th>\n" +
                    "            <th>Body</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<style='color:red'>";
                    rep += "<td>" + obj.data[c].messageDate + " | " + obj.data[c].messageTime + "</td>";
                    rep += "<td>" + obj.data[c].subject + "</td>";
                    rep += "<td>" + obj.data[c].messageRead + "</td>";
                    rep += "<td>" + obj.data[c].body + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='ViewMessage("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                    rep += " | ";
                    rep +="<a onclick='ViewSender("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Sender</a>";
                    rep +="</td>";
                    rep += "</style>";
                }
                rep += "</tr>";
                rep += "</table>";
                document.getElementById("main-container").innerHTML = rep;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
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