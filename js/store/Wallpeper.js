function FetchWelcome() {
    var tmp;
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stores/find/welcome?storecode="+
        sessionStorage.getItem("storecode") + "&username="+ sessionStorage.getItem("username");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                var tmp = "Welcome to " + obj.data.storeName;
                tmp += "(";
                tmp += sessionStorage.getItem("username") + ")";
                tmp += " | NewMessages(";
                tmp += obj.data.newMessages + ")";
                tmp += " | NewOrders(";
                tmp += obj.data.newOrders + ")";
                var resp = "<marquee behavior=\"alternate\" bgcolor=\"#f8f8ff\" direction=\"left\" height:=\"\" loop=\"7\"\n" +
                    "             scrollamount=\"1\" scrolldelay=\"2\" width=\"100%\">\n" +
                    "    <span style=\"font-size: 20px;color:#839496\">\n" +
                    " "+ tmp +"</span></marquee>";
                document.getElementById("msg").innerHTML = resp;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}