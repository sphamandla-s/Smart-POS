function craeteOrder() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/create?emailcell="+
        sessionStorage.getItem("emailcell");
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                fetchList();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function removeFromBucket(code) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/bucket/item/remove?emailcell="+
        sessionStorage.getItem("emailcell") + "&bucketcode="+ code;
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                fetchList();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send();
}
function fetchList() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/bucket/mybucket?emailcell="+ sessionStorage.getItem("emailcell");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table align='center' class=\"table-general\" border=\"2\" width=\"95%\">\n" +
                    "        <tr>\n" +
                    "            <th>ItemCode</th>\n" +
                    "            <th>ItemName</th>\n" +
                    "            <th>Price</th>\n" +
                    "            <th>AddedDate</th>\n" +
                    "            <th>AddedTime</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].barcode + "</td>";
                    rep += "<td>" + obj.data[c].itemname + "</td>";
                    rep += "<td>" + obj.data[c].price + "</td>";
                    rep += "<td>" + obj.data[c].bucketDate + "</td>";
                    rep += "<td>" + obj.data[c].bucketTime + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='removeFromBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Remove</a>";
                    rep +="</td>";
                }
                rep += "</tr>";
                rep += "</table>";
                document.getElementById("bucket-list").innerHTML = rep;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}