function CreateNewMessage() {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"emailcell\">EmailOrCell</label>\n" +
        "                    <input type=\"text\" id=\"emailcell\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"subject\">Subject</label>\n" +
        "                    <input type=\"text\" id=\"subject\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <textarea id=\"body\" name=\"body\" rows=\"3\" cols=\"45\" placeholder='Message'></textarea>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" value=\"Send\" onclick=\"SendMessage()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
}
function SendMessage() {
    var rep = "";
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/messages/person/send?fromEmailcell=" +
        sessionStorage.getItem("emailcell") + "&toEmailcell="+
        document.getElementById("emailcell").value + "&subject="+
        document.getElementById("subject").value + "&body="+
        document.getElementById("body").value;
    xhttp.onreadystatechange = function() {
        if(this.status == 200){
            Inbox();
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function Sent() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/messages/person/sent/list?emailcell="+
        sessionStorage.getItem("emailcell");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table align='center' class=\"table-general\" border=\"2\" width=\"100%\">\n" +
                    "        <tr>\n" +
                    "            <th>To</th>\n" +
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
                    rep += "<td>" + obj.data[c].toName + "</td>";
                    rep += "<td>" + obj.data[c].messageDate + " | " + obj.data[c].messageTime + "</td>";
                    rep += "<td>" + obj.data[c].subject + "</td>";
                    rep += "<td>" + obj.data[c].messageRead + "</td>";
                    rep += "<td>" + obj.data[c].body + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='ViewSentMessage("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                    rep +="</td>";
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
function processViewInbox(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/messages/person/inbox/view?emailcell="+
        sessionStorage.getItem("emailcell") + "&msgId="+ id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                document.getElementById("emailcell").value = obj.data.fromName;
                document.getElementById("subject").value = obj.data.subject;
                document.getElementById("body").value = obj.data.body;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function processViewSent(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/messages/person/sent/view?emailcell="+
        sessionStorage.getItem("emailcell") + "&msgId="+ id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                //document.getElementById("emailcell").value = obj.data.fromName;
                document.getElementById("subject").value = obj.data.subject;
                document.getElementById("body").value = obj.data.body;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function viewMessage(id) {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"emailcell\">EmailOrCell</label>\n" +
        "                    <input type=\"text\" id=\"emailcell\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"subject\">Subject</label>\n" +
        "                    <input type=\"text\" id=\"subject\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <textarea id=\"body\" name=\"body\" rows=\"3\" cols=\"45\" placeholder='Message'></textarea>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" value=\"Send\" onclick=\"SendMessage()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    processViewInbox(id);
}
function ViewSentMessage(id) {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"subject\">Subject</label>\n" +
        "                    <input type=\"text\" id=\"subject\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <textarea id=\"body\" name=\"body\" rows=\"3\" cols=\"45\" placeholder='Message'></textarea>\n" +
        "                </div>\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    processViewSent(id);
}
function Inbox() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/messages/person/inbox?emailcell="+
        sessionStorage.getItem("emailcell");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table align='center' class=\"table-general\" border=\"2\" width=\"100%\">\n" +
                    "        <tr>\n" +
                    "            <th>From</th>\n" +
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
                    rep += "<td>" + obj.data[c].fromName + "</td>";
                    rep += "<td>" + obj.data[c].messageDate + " | " + obj.data[c].messageTime + "</td>";
                    rep += "<td>" + obj.data[c].subject + "</td>";
                    rep += "<td>" + obj.data[c].messageRead + "</td>";
                    rep += "<td>" + obj.data[c].body + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='viewMessage("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                    rep +="</td>";
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