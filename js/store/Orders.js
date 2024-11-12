function AddNotes() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/store/add/notes?orderId="+
        sessionStorage.getItem("orderId") + "&storecode="+
        sessionStorage.getItem("storecode") + "&notes="+ document.getElementById("notes").value;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                fetchList();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function CreateAddNotes(orderId) {
    //var orderId = prompt("Please enter the OrderId");
    sessionStorage.setItem("orderId", orderId);
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <textarea id=\"notes\" name=\"body\" rows=\"3\" cols=\"45\" placeholder='Notes'></textarea>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" value=\"Save\" onclick=\"AddNotes()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
}
function ViewSender(id) {
    //var id = prompt("Please enter the OrderId to view the sender");
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/personal/find/sender?orderId="+
        id + "&storecode=" + sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<p align='left'><h4>Sender Info</h4><br/>";
                rep += "Name: " + obj.data.firstname;
                rep += " " + obj.data.surname + "</br>";
                rep += "Phone: " + obj.data.cell + "</br>";
                rep += "Email: " + obj.data.email;
                rep += "</p>";
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
function Accept(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/orders/store/accept?username="+
        sessionStorage.getItem("username") + "&orderId="+
        id + "&storecode=" + sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                fetchList();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}


async function sendAcceptOrder(id){    
    const obj = await acceptOrder(id);   
    console.log(obj)
    if(obj.success == true && obj.count > 0){
        sendOrdersList();        
    }else{
        rep = "<p class=error-response>Error occured</p>";
        document.getElementById("main-container").innerHTML = rep;
    }
}
function acceptOrder(id){
    const url = sessionStorage.getItem("host") + "/api/v1/orders/store/accept?username="+
        sessionStorage.getItem("username") + "&orderId="+
        id + "&storecode=" + sessionStorage.getItem("storecode");    
    return fetch(url,{
        method: "PUT",
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



async function sendViewOrder(id){    
    const obj = await viewOrder(id);   
    console.log(obj)
    if(obj.success == true){
        if (obj.count > 0) {
            rep = "<table class='table-filled' border='2' width=\"100%\">\n" +
                    "        <thead>\n" +
                    "            <tr>\n" +
                    "                <th>BarCode</th>\n" +
                    "                <th>Itemname</th>\n" +
                    "                <th>Quantity</th>\n" +
                    "                <th>Price</th>\n" +
                    "            </tr>\n" +
                    "        </thead>\n";
            var c;
            for(c = 0; c < obj.count; c++){
                rep += "<tr>";
                rep += "<td>" + obj.data[c].barcode + "</td>";
                rep += "<td>" + obj.data[c].itemname + "</td>";
                rep += "<td>1</td>";
                rep += "<td>" + obj.data[c].price + "</td>";
            }
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;           
        }else{
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}
function viewOrder(id){
    const url = sessionStorage.getItem("host") + "/api/v1/orders/store/items/list?orderId="+
        id + "&storecode=" + sessionStorage.getItem("storecode");    
    return fetch(url,{
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
async function sendOrdersList(){    
    const obj = await ordersList();   
    console.log(obj)
    if(obj.success == true){
        if (obj.count > 0) {
            rep = "<table class='table-filled' border='2' width=\"100%\">\n"+
                    "        <tr>\n" +
                    "            <th>CreatedDate</th>\n" +
                    "            <th>Viewed</th>\n" +
                    "            <th>Accepted</th>\n" +
                    "            <th>Total</th>\n" +
                    "            <th>Notes</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].orderDate + " | " + obj.data[c].orderTime + "</td>";
                    rep += "<td>" + obj.data[c].received + "</td>";
                    rep += "<td>" + obj.data[c].accepted + "</td>";
                    rep += "<td>" + obj.data[c].total + "</td>";
                    rep += "<td>" + obj.data[c].notes + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='sendViewOrder("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Items</a>";
                    rep += " | ";
                    rep +="<a onclick='CreateAddNotes("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Notes</a>";
                    rep += " | ";
                    rep +="<a onclick='sendAcceptOrder("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Accept</a>";
                    rep += " | ";
                    rep +="<a onclick='ViewSender("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Sender</a>";
                    rep +="</td>";
                }
                rep += "</tr>";
                rep += "</table>";
                document.getElementById("main-container").innerHTML = rep;            
        }else{
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}
function ordersList(){
    const url = sessionStorage.getItem("host") + "/api/v1/orders/store/inbox?storecode="+
        sessionStorage.getItem("storecode");    
    return fetch(url,{
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