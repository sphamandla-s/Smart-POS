function ViewSpecialItems(specialId) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/specials/items/person/view?specialCode="+ specialId +"&storecode="+
        sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class=\"table-general\" border=\"2\" width=\"100%\">\n" +
                    "<tr>"
                var c;
                var row = 0;
                for(c = 0; c < obj.count; c++){
                    if(row > 3){
                        rep += "</tr><tr>";
                        row = 0;
                    }
                    rep += "<td align='center'><img src='"+ obj.data[c].picture +"' alt='photo' width='150px' height='180px'>";
                    rep += "<br/></b>"
                    rep +=  obj.data[c].department;
                    rep += "<br/>" +  obj.data[c].category;
                    rep += "<br/>" +  obj.data[c].itemname;
                    rep += "<br/>" +  obj.data[c].description;
                    rep += "<br/>Price ZAR: " +  obj.data[c].sellingprice;
                    rep += " | In Stock: " +  obj.data[c].quantity;
                    rep += "<br/>";
                    row++;
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

var pagesAll = 0;
var payload = 21;
var start = 0;
var size = payload;
var counterAll = 1;
var tmp = 0;
function Next(){
    if(counterAll < pagesAll){
        start += payload;
        size += payload;
        counterAll += 1;
    }
    sendLoad();
}
function Previous(){
    if(counterAll > 1){
        start -= payload;
        size -= payload;
        counterAll -= 1;
    }
    sendLoad();
}

async function sendContacts(){    
    const obj = await contacts();   
    console.log(obj)    
    if (obj.success == true) {
        rep = "<div>";
            rep += "<form class='container-form'>";
            rep += "<p><h4><b>StoreName : </b>"+ obj.data.storeName +"</h4></p>";
            rep += "<p><b>Address : </b>"+ obj.data.addressOne +" ; "+ obj.data.addressTwo +" ; "+ obj.data.addressThree+"</p>";
            rep += "<p><b>Phone : </b>"+obj.data.phone +"</p>";
            rep += "<p><b>Email : </b>"+obj.data.email +"</p>";
            rep += "<p><b>Fax : </b>"+obj.data.fax +"</p>";
            rep += "<p><b>Website : </b>"+obj.data.website +"</p>";
            rep += "<p><b>CreatedDate : </b>"+obj.data.createDate +"</p>";
            rep += "<p><img src='"+ obj.data.logo +"' alt='photo' width='220px' height='200px'></p>";
            rep += "</form>";
            rep += "</div>";
            document.getElementById("main-container").innerHTML = rep;
        }else{
            rep = "<p><h4>Invalid store ID</h4></p>";
            document.getElementById("main-container").innerHTML = rep;
        }  
                
}
function contacts(){
    const url = sessionStorage.getItem("host") + "/api/v1/stores/contacts?storeId="+
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

async function sendLocation(){    
    const obj = await loc();   
    console.log(obj)    
    if (obj.success == true) {
        rep = "<div>";
            rep += "<form class='container-form'>";
            rep += "<p><h5><b>Store Location</b></h5></p>";
            rep += "<p><b>Continent : </b>"+ obj.data.continent +"</p>";
            rep += "<p><b>Country : </b>"+ obj.data.country +"</p>";
            rep += "<p><b>Province : </b>"+ obj.data.province +"</p>";
            rep += "<p><b>Town : </b>"+ obj.data.town +"</p>";
            rep += "<p><b>Location : </b>"+ obj.data.location +"</p>";
            rep += "<p><b>Industry : </b>"+ obj.data.industry +"</p>";                       
            rep += "</form>";
            rep += "</div>";
            document.getElementById("main-container").innerHTML = rep;
        }else{
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }  
                
}
function loc(){
    const url = sessionStorage.getItem("host") + "/api/v1/general/store/settings/get?strorecode="+
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

async function sendSpecials(){    
    const obj = await specials();   
    console.log(obj)    
    if (obj.success == true) {
        rep = "<table border='2' width=\"100%\" align='center' class='table-general'>\n" +
                    "        <tr>\n" +
                    "            <th>SpecialName</th>\n" +
                    "            <th>SpecialDescription</th>\n" +
                    "            <th>StartDate</th>\n" +
                    "            <th>EndDate</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].specialName + "</td>";
                    rep += "<td>" + obj.data[c].specialDescription + "</td>";
                    rep += "<td>" + obj.data[c].startDate + "</td>";
                    rep += "<td>" + obj.data[c].endDate + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='ViewSpecialItems("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>ViewItems</a>";
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
function specials(){
    const url = sessionStorage.getItem("host") + "/api/v1/specials/person/view?storecode="+ sessionStorage.getItem("storecode");    
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

async function sendMenus(){    
    const obj = await menus();   
    console.log(obj)    
    if (obj.success == true) {
        rep = "<table border='2' width=\"100%\" align='center' class='table-general'>\n" +
                    "        <tr>\n" +
                    "            <th>MenuName</th>\n" +
                    "            <th>MenuDescription</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].menuName + "</td>";
                    rep += "<td>" + obj.data[c].menuDescription + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='ViewMenuItems("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>ViewItems</a>";
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
function menus(){
    const url = sessionStorage.getItem("host") + "/api/v1/menus/person/list?storecode="+ sessionStorage.getItem("storecode");    
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

async function sendLoad(){    
    const obj = await load();   
    //console.log(obj);    
    if (obj.success == true) {
        pagesAll = Math.ceil(obj.count / payload)
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page " + counterAll + " of " + pagesAll;
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>&laquo Previous</a></h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class=\"table-general\" border=\"2\" width=\"100%\">\n" +
                "<tr>"
            var c;
            var row = 0;
            var len = obj.data.length;
            for(c = 0; c < len; c++){
                if(obj.data[c].picture != null && obj.data[c].picture != 'undefined'){
                    if(row > 2){
                        rep += "</tr><tr>";
                        row = 0;
                    }
                    rep += "<td align='center'><img src='"+ obj.data[c].picture +"' alt='photo' width='150px' height='180px'>";
                    rep += "<br/><b>" + obj.data[c].department ;
                    rep += "</b>";
                    rep += "<br/>" +  obj.data[c].category;
                    rep += "<br/>" +  obj.data[c].itemname;
                    rep += "<br/>Price ZAR: " +  obj.data[c].sellingprice;
                    rep += " | In Stock: " +  obj.data[c].quantity;
                    row++;
                }
            }
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page " + counterAll + " of " + pagesAll;
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>&laquo Previous</a></h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        } else {
            rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
            document.getElementById("main-container").innerHTML = rep;
        }    
}
function load(){
    const url = sessionStorage.getItem("host") + "/api/v1/stockitems/view/store?storecode="+
        sessionStorage.getItem("storecode") + "&start="+
        start + "&size="+ size;    
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