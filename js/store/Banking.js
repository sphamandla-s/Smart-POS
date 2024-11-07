function FetchTodayList() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/bank/today/list?username="+
        sessionStorage.getItem("username") + "&storecode="+ sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width=\"100%\">\n"+
                    "        <tr>\n" +
                    "            <th>Date</th>\n" +
                    "            <th>Username</th>\n" +
                    "            <th>Type</th>\n" +
                    "            <th>Code</th>\n" +
                    "            <th>Description</th>\n" +
                    "            <th>Amount</th>\n" +
                    "            <th>Balance</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].bDate + " | " + obj.data[c].bTime;
                    rep += "<td>" + obj.data[c].username + "</td>";
                    rep += "<td>" + obj.data[c].transactionType + "</td>";
                    rep += "<td>" + obj.data[c].transactionCode + "</td>";
                    rep += "<td>" + obj.data[c].tDescription + "</td>";
                    rep += "<td>" + obj.data[c].amount + "</td>";
                    rep += "<td>" + obj.data[c].balance + "</td>";
                    rep += "</tr>";
                }
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
function CreateProcessing() {
    var newItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"code\">Code</label>\n" +
        "                    <input type=\"text\" id=\"code\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">none</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"description\">Description</label>\n" +
        "                    <input type=\"text\" id=\"description\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">none</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"amount\">Amount</label>\n" +
        "                    <input type=\"text\" id=\"amount\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" value=\"Save\" onclick=\"Process()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newItem;
}
function Validate() {
    var passedTest = true;
    var msg = "<u>Missing information</u>";
    if(document.getElementById("deposit").checked == false && document.getElementById("widraw").checked == false) {
        msg = msg + "</br> Select Deposit or Widraw";
        passedTest = false;
    }
    if(document.getElementById("deposit").checked == true && document.getElementById("widraw").checked == true){
        msg = msg + "</br> Select one option between Deposit and Widraw";
        passedTest = false;
    }
    if(document.getElementById("amount").value == ""){
        msg = msg + "</br> Please put a valid amount";
        passedTest = false;
    }
    if(document.getElementById("code").value == ""){
        msg = msg + "</br> Missing Transaction Code";
        passedTest = false;
    }
    if(document.getElementById("description").value == ""){
        msg = msg + "</br> Missing Transaction Description";
        passedTest = false;
    }
    if(passedTest == true){
        Process();
    }else{
        document.getElementById("resp").innerHTML = msg;
    }
}
function Process() {
    var amount = document.getElementById("amount").value;
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/bank/store/insert?username="+
        sessionStorage.getItem("username") + "&storecode="+
        sessionStorage.getItem("storecode") + "&amount="+
        document.getElementById("amount").value + "&transCode="+
        document.getElementById("code").value + "&transDescrip="+
        document.getElementById("description").value;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                FetchTodayList();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}