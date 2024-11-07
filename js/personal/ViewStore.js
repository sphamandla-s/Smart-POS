function Contacts() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host")+"/api/v1/stores/contacts?storeId="+
        sessionStorage.getItem("storecode");
    var rep="";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            rep = "<div>";
            rep += "<form class='container-form'>";
            rep += "<p><h4><b>StoreName : </b>"+ obj.storeName +"</h4></p>";
            rep += "<p><b>Address : </b>"+ obj.addressOne +" ; "+ obj.addressTwo +" ; "+ obj.addressThree+"</p>";
            rep += "<p><b>Phone : </b>"+obj.phone +"</p>";
            rep += "<p><b>Email : </b>"+obj.email +"</p>";
            rep += "<p><b>Fax : </b>"+obj.fax +"</p>";
            rep += "<p><b>Website : </b>"+obj.website +"</p>";
            rep += "<p><b>CreatedDate : </b>"+obj.createDate +"</p>";
            rep += "<p><img src='"+ obj.logo +"' alt='photo' width='220px' height='200px'></p>";
            rep += "</form>";
            rep += "</div>";
            document.getElementById("main-container").innerHTML = rep;
        }else if(this.status == 404){
            rep = "<p><h4>Invalid store ID</h4></p>";
            document.getElementById("main-container").innerHTML = rep;
        }else{
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            rep = "<p><h4>"+ obj.message +"</h4></p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
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
function ViewSpecials() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/specials/person/view?storecode="+ sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
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
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function ViewMenus() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/menus/person/list?storecode="+ sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
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
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function ViewStockItems() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stockitems/view/store?storecode="+
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
                    if(row > 2){
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
    myload();
}
function Previous(){
    if(counterAll > 1){
        start -= payload;
        size -= payload;
        counterAll -= 1;
    }
    myload();
}
function myload() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stockitems/view/store?storecode="+
        sessionStorage.getItem("storecode") + "&start="+
        start + "&size="+ size;
    //console.log(url);
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
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
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}