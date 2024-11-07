function FetchHistory() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myorders/history?emailcell="+
        sessionStorage.getItem("emailcell");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table border='2' width=\"100%\" align='center' class='table-general'>\n" +
                    "        <tr>\n" +
                    "            <th>StoreName</th>\n" +
                    "            <th>CreatedDate</th>\n" +
                    "            <th>Sent</th>\n" +
                    "            <th>Received</th>\n" +
                    "            <th>Accepted</th>\n" +
                    "            <th>Total</th>\n" +
                    "            <th>Notes</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].storename + "</td>";
                    rep += "<td>" + obj.data[c].orderDate + " | " + obj.data[c].orderTime + "</td>";
                    rep += "<td>" + obj.data[c].sent + "</td>";
                    rep += "<td>" + obj.data[c].received + "</td>";
                    rep += "<td>" + obj.data[c].accepted + "</td>";
                    rep += "<td>R: " + obj.data[c].total + "</td>";
                    rep += "<td>" + obj.data[c].notes + "</td>";
                    rep += "<td>";
                    rep +="<a onclick='ViewItemsForHistory("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Item(s)</a>";

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
function FetchInProgress() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myorders/inprogress?emailcell="+
        sessionStorage.getItem("emailcell");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table border='2' width=\"100%\" align='center' class='table-general'>\n" +
                    "        <tr>\n" +
                    "            <th>StoreName</th>\n" +
                    "            <th>CreatedDate</th>\n" +
                    "            <th>Sent</th>\n" +
                    "            <th>Received</th>\n" +
                    "            <th>Accepted</th>\n" +
                    "            <th>Total</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].storename + "</td>";
                    rep += "<td>" + obj.data[c].orderDate + " | " + obj.data[c].orderTime + "</td>";
                    rep += "<td>" + obj.data[c].sent + "</td>";
                    rep += "<td>" + obj.data[c].received + "</td>";
                    rep += "<td>" + obj.data[c].accepted + "</td>";
                    rep += "<td>R: " + obj.data[c].total + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='ViewItemsForHistory("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Item(s)</a>";
                    rep += "  |  ";
                    rep +="<a onclick='ViewBankDetails("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Bank Details</a>";
                    rep += "  |  ";
                    rep +="<a onclick='ViewNotes("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Notes(s)</a>";
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
function RemoveOrderItem(orderId,id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myorder/items/remove?emailcell=" +
        sessionStorage.getItem("emailcell") + "&orderId="+
        orderId + "&orderItemId=" + id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                ViewItems(orderId);
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send();
}
function ViewItemsForHistory(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myorder/items/list?emailcell="+
        sessionStorage.getItem("emailcell") + "&orderId=" + id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table border='2' width=\"100%\" align='center' class='table-general'>\n" +
                    "        <tr>\n" +
                    "            <th>BarCode</th>\n" +
                    "            <th>ItemName</th>\n" +
                    "            <th>Quantity</th>\n" +
                    "            <th>Price</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].barcode + "</td>";
                    rep += "<td>" + obj.data[c].itemname  + "</td>";
                    rep += "<td> " + "1" + "</td>";
                    rep += "<td>" + obj.data[c].price + "</td>";
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
function ViewNotes(id) {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <textarea id=\"notes\" name=\"body\" rows=\"3\" cols=\"45\" placeholder='Notes'></textarea>\n" +
        "                </div>\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myOrder?emailcell="+
        sessionStorage.getItem("emailcell") + "&orderId=" + id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                document.getElementById("notes").value = obj.data.notes;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function ViewBankDetails(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/store/bank/details/for/payment?orderId=" + id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table border='0' width=\"100%\" align='center' class='table-general'>";
                var c;
                var bank = 1;
                var row = 0;
                rep += "<tr>";
                for(c = 0; c < obj.count; c++){
                    rep += "<td><h5>"+ bank +". Bank</h5>";
                    rep += "<br/><b>AccountHolder: </b>" + obj.data[c].accountHolder;
                    rep += "<br/><b>AccountNumber: </b>" + obj.data[c].accountNumber;
                    rep += "<br/><b>AccountType: </b>" + obj.data[c].accountType;
                    rep += "<br/><b>Bank: </b>" + obj.data[c].bank;
                    rep += "<br/><b>Branch: </b>" + obj.data[c].branch;
                    rep += "<br/><b>PaymentFef: </b>" + obj.data[c].paymentRef + "</td>";
                    row += 1;
                    if(row > 2){
                        rep += "</tr><tr>";
                        row = 0;
                    }
                    bank += 1;
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
function ViewItems(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myorder/items/list?emailcell="+
        sessionStorage.getItem("emailcell") + "&orderId=" + id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table border='2' width=\"100%\" align='center' class='table-general'>\n" +
                    "        <tr>\n" +
                    "            <th>BarCode</th>\n" +
                    "            <th>ItemName</th>\n" +
                    "            <th>Quantity</th>\n" +
                    "            <th>Price</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].barcode + "</td>";
                    rep += "<td>" + obj.data[c].itemname  + "</td>";
                    rep += "<td> " + "1" + "</td>";
                    rep += "<td>" + obj.data[c].price + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='RemoveOrderItem("+ id +","+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Remove Item</a>";
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
function SendOrder(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myorder/send?emailcell=" +
        sessionStorage.getItem("emailcell") + "&orderId="+ id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                PendingOrders();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function DeleteOrder(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myorder/delete?emailcell=" +
        sessionStorage.getItem("emailcell") + "&orderId="+ id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                PendingOrders();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send();
}
function PendingOrders() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/myorders?emailcell="+
        sessionStorage.getItem("emailcell");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table border='2' width=\"100%\" align='center' class='table-general'>\n" +
                    "        <tr>\n" +
                    "            <th>StoreName</th>\n" +
                    "            <th>CreatedDate</th>\n" +
                    "            <th>SentStatus</th>\n" +
                    "            <th>Total</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].storename + "</td>";
                    rep += "<td>" + obj.data[c].orderDate + " | " + obj.data[c].orderTime + "</td>";
                    rep += "<td>" + obj.data[c].sent + "</td>";
                    rep += "<td>" + obj.data[c].total + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='ViewItems("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Item(s)</a>";
                    rep += " | ";
                    rep +="<a onclick='SendOrder("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Send Order</a>";
                    rep += " | ";
                    rep +="<a onclick='DeleteOrder("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Delete Order</a>";
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
function CreateOrder() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/create?emailcell="+
        sessionStorage.getItem("emailcell");
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                MyBucket();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function RemoveFromBucket(code) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/bucket/item/remove?emailcell="+
        sessionStorage.getItem("emailcell") + "&bucketcode="+ code;
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                MyBucket();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("resp").innerHTML = rep;
            }
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send();
}
function MyBucket() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/bucket/mybucket?emailcell="+ sessionStorage.getItem("emailcell");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width=\"100%\">\n" +
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
                    rep +="<a onclick='RemoveFromBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Remove</a>";
                    rep +="</td>";
                }
                rep += "</tr>";
                rep += "</table>";
                rep += "<p><input type=\"submit\" value=\"Create Order(s)\" onclick=\"CreateOrder()\"></p>";
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