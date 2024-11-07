function deleteStore() {
    if(window.confirm("You are about to delete a store! are you sure of your action?")){
        var xhttp = new XMLHttpRequest();
        var storecode = prompt("Please enter the storecode to be deleted!","0");
        var url = sessionStorage.getItem("host") +"/api/v1/stores/delete?emailcell="+
            sessionStorage.getItem("emailcell") + "&storecode=" + storecode;
        var rep;
        xhttp.onreadystatechange = function() {
            if (this.status == 200) {
                var response = xhttp.responseText;
                var obj = JSON.parse(response);
                if (obj.success == true) {
                    LoadMyStore();
                } else {
                    rep = "Success: " + obj.success + " Code: " + obj.code + "<br/>Error Message: " + obj.data;
                    document.getElementById("main-container").innerHTML = rep;
                }
            }
        };
        xhttp.open("DELETE", url, true);
        xhttp.send();
    }else{
        alert("he said no");
    }
}
function createUpdateStore() {
    var newStore = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"storename\">Storename</label>\n" +
        "                    <input type=\"text\" id=\"storename\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">shop</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"addressone\">AddressOne</label>\n" +
        "                    <input type=\"text\" id=\"addressone\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"addresstwo\">AddressTwo</label>\n" +
        "                    <input type=\"text\" id=\"addresstwo\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"addressthree\">AddressThree</label>\n" +
        "                    <input type=\"text\" id=\"addressthree\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" value=\"Update\" onclick=\"updateStore()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newStore;
    SendGetStoreDetails();
}
function updateStore() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host")+"/api/v1/stores/mystore/update?storecode="+
        sessionStorage.getItem("storecode") + "&storeName="+
        document.getElementById("storename").value + "&emailcell="+
        sessionStorage.getItem("emailcell") + "&addressOne="+
        document.getElementById("addressone").value + "&addressTwo="+
        document.getElementById("addresstwo").value + "&addressThree="+
        document.getElementById("addressthree").value;
    var rep="";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                LoadMyStore();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "<br/>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function populateUpdateStore() {
    var xhttp = new XMLHttpRequest();
    var storeId = prompt("Please enter your store Id");
    var url = sessionStorage.getItem("host")+"/api/v1/stores/my/store?storecode="+
        storeId + "&emailcell="+
        sessionStorage.getItem("emailcell") ;
    sessionStorage.setItem("storecode", storeId);
    var rep;
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                document.getElementById("storename").value = obj.data.storeName;
                document.getElementById("addressone").value = obj.data.addressOne;
                document.getElementById("addresstwo").value = obj.data.addressTwo;
                document.getElementById("addressthree").value = obj.data.addressThree;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "<br/>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

async function SendGetStoreDetails(){
    const obj = await GetStoreDetails();
    if(obj.success == true){
        document.getElementById("storename").value = obj.data.storeName;
        document.getElementById("addressone").value = obj.data.addressOne;
        document.getElementById("addresstwo").value = obj.data.addressTwo;
        document.getElementById("addressthree").value = obj.data.addressThree;;
    }

}
function GetStoreDetails(){
    var storeId = prompt("Please enter your store Id");
    sessionStorage.setItem("storecode", storeId);
    return fetch(sessionStorage.getItem("host") + "/api/v1/stores/my/store?storecode="+
        storeId + "&emailcell="+
        sessionStorage.getItem("emailcell"),{
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
function createStore() {
    var newStore = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"storename\">Storename</label>\n" +
        "                    <input type=\"text\" id=\"storename\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">shop</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"addressone\">AddressOne</label>\n" +
        "                    <input type=\"text\" id=\"addressone\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"addresstwo\">AddressTwo</label>\n" +
        "                    <input type=\"text\" id=\"addresstwo\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"addressthree\">AddressThree</label>\n" +
        "                    <input type=\"text\" id=\"addressthree\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" value=\"Save\" onclick=\"SendCreateStore()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newStore;
}

async function SendCreateStore(){
    const obj = await CreateStore();
    if(obj.success == true){
        TermsAndConditions();
        }

    }

function CreateStore(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stores/insertStore?storeName="+
        document.getElementById("storename").value+"&emailcell="+
        sessionStorage.getItem("emailcell")+"&addressOne="+
        document.getElementById("addressone").value+"&addressTwo="+
        document.getElementById("addresstwo").value+"&addressThree="+
        document.getElementById("addressthree").value,{
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

function TermsAndConditions() {
    var terms = "<header>\n" +
        "            <h1 style=\"margin-bottom: 0.5em;\">Welcome to Smart-POS</h1>\n" +
        "            <p>Please note! our site is still under development, we might have changes in Future.</p>\n" +
        "            <p>To run a online store, firstly create your store</p>\n" +
        "            <p>To access your store, go to our home page, then business</p>\n" +
        "            <ul style=\"font-size: 18px;\">\n" +
        "                <li>Username: (your fistname)</li>\n" +
        "                <li>Password: (your password)</li>\n" +
        "                <li>Storecode: (on your stores list)</li>\n" +
        "            </ul>\n" +
        "            <p>For status your store(s) will be assign to free packages, to change log in to the store\n</p>"+
        "            <p>and go to settings\n</p>"+
        "        </header>";
    var newStore = "<p><h1>Please NOTE!</h1><br/> \n" +
        "   Our site is still under development, registered stores will subscribe to free packages,<br/>\n"+
        "   For status, your stores will be asssign to free package\n"+
        "   <b>Please go to home page, then business:</b> <br/>\n"+
        "   <ul>username: is your Firstname</ul><br/>\n"+
        "   <ul>password: is your password</ul><br/>\n"+
        "   <ul>storecode: is on your stores list</ul><br/>\n"+
        "   Make sure you log in to you store, go to settings, settings then put your business location details.<br/>\n" +
        "   For your store to be performing at its best.";
    document.getElementById("main-container").innerHTML = terms;
}

async function SendStoresList(){
    const obj = await storesList();
    if(obj.success == true){
        rep = "<table border='2' width=\"100%\" align='center' class='table-general'>\n" +
            "        <thead>\n" +
            "        <tr>\n" +
            "            <th>StoreName</th>\n" +
            "            <th>StoreCode</th>\n" +
            "            <th>Address</th>\n" +
            "            <th>Package</th>\n" +
            "            <th>CreatedDate</th>\n" +
            "            <th>Action</th>\n" +
            "        </tr>\n" +
            "        </thead>\n" +
            "        <tbody>";
        var c;
        for(c = 0; c < obj.count; c++){
            rep += "<tr>";
            rep += "<td>" + obj.data[c].storeName + "</td>";
            rep += "<td>" + obj.data[c].id + "</td>";
            rep += "<td>" + obj.data[c].addressOne +", " + obj.data[c].addressTwo + ", " +obj.data[c].addressThree+ "</td>";
            rep += "<td>" + obj.data[c].storePackage + "</td>";
            rep += "<td>" + obj.data[c].createDate + "</td>";
            rep += "<td>";
            rep +="<a onclick='LoggInToStore("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Loggin</a>";
            rep +="</td>";
            rep += "</tr>";
        }
        rep = rep + "</tbody>\n" +
            "    </table>";
        document.getElementById("main-container").innerHTML = rep;
    }

}
function storesList(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stores/my/stores?emailcell=" +
        sessionStorage.getItem("emailcell"),{
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


