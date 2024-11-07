function validateForItem() {
    var continent = document.getElementById("continents").value;
    var country = document.getElementById("countries").value;
    var province = document.getElementById("provinces").value;
    var town = document.getElementById("towns").value;
    var location = document.getElementById("locations").value;
    var itemname = document.getElementById("itemname").value;
    if(itemname !="" && continent =="" && country =="" && province =="" && town =="" && location ==""){
        ItemFilterAll();
    }else if(itemname !="" && continent !="" && country =="" && province =="" && town =="" && location ==""){
        itemFilterContinent();
    }else if(itemname !="" && continent !="" && country =="" && province =="" && town =="" && location ==""){
        itemFilterContinent();
    }else if(itemname !="" && continent !="" && country !="" && province =="" && town =="" && location ==""){
        itemFilterCountry();
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town =="" && location ==""){
        itemFilterProvince();
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town !="" && location ==""){
        itemFilterTown();
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town !="" && location !=""){
        itemFilterLocation();
    }else if(itemname =="" && continent =="" && country =="" && province =="" && town =="" && location ==""){
        ItemsAll();
    }
}
var tmp=  1;
var payload = 9;
var pagesAll;
var counterAll = 0;
var counterFilterAll = 0;
var counterFilterContinent = 0;
var counterFilterCountry = 0;
var counterFilterProvince = 0;
var counterFilterTown = 0;
var counterFilterLocation = 0;
var startAll = 0;
var startFilterAll = 0;
var startFilterContinent = 0;
var startFilterCounty = 0;
var startFilterProvince = 0;
var startFilterTown = 0;
var startFilterLocation = 0;
var payLoadAll = payload;
var payLoadFilterAll = payload;
var payLoadFilterContinent = payload;
var payLoadFilterCountry = payload;
var payLoadFilterProvince = payload;
var payLoadFilterTown = payload;
var payLoadFilterLocation = payload;
function Next() {
    var continent = document.getElementById("continents").value;
    var country = document.getElementById("countries").value;
    var province = document.getElementById("provinces").value;
    var town = document.getElementById("towns").value;
    var location = document.getElementById("locations").value;
    var itemname = document.getElementById("itemname").value;
    if(itemname =="" && continent =="" && country =="" && province =="" && town =="" && location ==""){
        if(counterAll < pagesAll - tmp){
            startAll += payload;
            payLoadAll += payload;
            counterAll += tmp;
        }
    }else if(itemname !="" && continent =="" && country =="" && province =="" && town =="" && location ==""){
        if(counterFilterAll < pagesAll - tmp){
            startFilterAll += payload;
            payLoadFilterAll += payload;
            counterFilterAll += tmp;
        }
    }else if(itemname !="" && continent !="" && country =="" && province =="" && town =="" && location ==""){
        if(counterFilterContinent < pagesAll - tmp){
            startFilterContinent += payload;
            payLoadFilterContinent += payload;
            counterFilterContinent += tmp;
        }
    }else if(itemname !="" && continent !="" && country !="" && province =="" && town =="" && location ==""){
        if(counterFilterCountry < pagesAll - tmp){
            startFilterCounty += payload;
            payLoadFilterCountry += payload;
            counterFilterCountry += tmp;
        }
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town =="" && location ==""){
        if(counterFilterProvince < pagesAll - tmp){
            startFilterProvince += payload;
            payLoadFilterProvince += payload;
            counterFilterProvince += tmp;
        }
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town !="" && location ==""){
        if(counterFilterTown < pagesAll - tmp){
            startFilterTown += payload;
            payLoadFilterTown += payload;
            counterFilterTown += tmp;
        }
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town !="" && location !=""){
        if(counterFilterLocation < pagesAll - tmp){
            startFilterLocation += payload;
            payLoadFilterLocation += payload;
            counterFilterLocation += tmp;
        }
    }
    validateForItem();
}
function Previous() {
    var continent = document.getElementById("continents").value;
    var country = document.getElementById("countries").value;
    var province = document.getElementById("provinces").value;
    var town = document.getElementById("towns").value;
    var location = document.getElementById("locations").value;
    var itemname = document.getElementById("itemname").value;
    if(itemname =="" && continent =="" && country =="" && province =="" && town =="" && location ==""){
        if(counterAll > 0){
            startAll -= payload;
            payLoadAll -= payload;
            counterAll -= tmp;
        }
    }else if(itemname !="" && continent =="" && country =="" && province =="" && town =="" && location ==""){
        if(counterFilterAll > 0){
            startFilterAll -= payload;
            payLoadFilterAll -= payload;
            counterFilterAll -= tmp;
        }
    }else if(itemname !="" && continent !="" && country =="" && province =="" && town =="" && location ==""){
        if(counterFilterContinent > 0){
            startFilterContinent -= payload;
            payLoadFilterContinent -= payload;
            counterFilterContinent -= tmp;
        }
    }else if(itemname !="" && continent !="" && country !="" && province =="" && town =="" && location ==""){
        if(counterFilterCountry > 0){
            startFilterCounty -= payload;
            payLoadFilterCountry -= payload;
            counterFilterCountry -= tmp;
        }
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town =="" && location ==""){
        if(counterFilterProvince > 0){
            startFilterProvince -= payload;
            payLoadFilterProvince -= payload;
            counterFilterProvince -= tmp;
        }
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town !="" && location ==""){
        if(counterFilterTown > 0){
            startFilterTown -= payload;
            payLoadFilterTown -= payload;
            counterFilterTown -= tmp;
        }
    }else if(itemname !="" && continent !="" && country !="" && province !="" && town !="" && location !=""){
        if(counterFilterLocation > 0){
            startFilterLocation -= payload;
            payLoadFilterLocation -= payload;
            counterFilterLocation -= tmp;
        }
    }
    validateForItem();
}
function itemFilterLocation() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/items/find/location?itemname="+
        document.getElementById("itemname").value + "&continent="+
        document.getElementById("continents").value + "&country="+
        document.getElementById("countries").value + "&province="+
        document.getElementById("provinces").value + "&town="+
        document.getElementById("towns").value + "&location="+
        document.getElementById("locations").value + "&start="+
        startFilterLocation + "&size="+ payLoadFilterLocation;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                pagesAll = Math.ceil(obj.count / payload)
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterLocation + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
                        rep += "<br/><b>" + obj.data[c].storename ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].address;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>" +  obj.data[c].itemname;
                        rep += "<br/>Price ZAR: " +  obj.data[c].price;
                        rep += " | In Stock: " +  obj.data[c].quantity;
                        rep += "<br/>";
                        rep +="<a onclick='addToBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Add to Bucket</a>";
                        rep += "  |  ";
                        rep +="<a onclick='viewStore("+obj.data[c].storecode+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterLocation + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
function itemFilterTown() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/items/find/town?itemname="+
        document.getElementById("itemname").value + "&continent="+
        document.getElementById("continents").value + "&country="+
        document.getElementById("countries").value + "&province="+
        document.getElementById("provinces").value + "&town="+
        document.getElementById("towns").value + "&start="+
        startFilterTown + "&size="+ payLoadFilterTown;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                pagesAll = Math.ceil(obj.count / payload)
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterTown + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
                        rep += "<br/><b>" + obj.data[c].storename ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].address;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>" +  obj.data[c].itemname;
                        rep += "<br/>Price ZAR: " +  obj.data[c].price;
                        rep += " | In Stock: " +  obj.data[c].quantity;
                        rep += "<br/>";
                        rep +="<a onclick='addToBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Add to Bucket</a>";
                        rep += "  |  ";
                        rep +="<a onclick='viewStore("+obj.data[c].storecode+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterTown + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
function itemFilterProvince() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/items/find/province?itemname="+
        document.getElementById("itemname").value + "&continent="+
        document.getElementById("continents").value + "&country="+
        document.getElementById("countries").value + "&province="+
        document.getElementById("provinces").value + "&start="+
        startFilterProvince + "&size="+ payLoadFilterProvince;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                pagesAll = Math.ceil(obj.count / payload)
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterProvince + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
                        rep += "<br/><b>" + obj.data[c].storename ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].address;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>" +  obj.data[c].itemname;
                        rep += "<br/>Price ZAR: " +  obj.data[c].price;
                        rep += " | In Stock: " +  obj.data[c].quantity;
                        rep += "<br/>";
                        rep +="<a onclick='addToBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Add to Bucket</a>";
                        rep += "  |  ";
                        rep +="<a onclick='viewStore("+obj.data[c].storecode+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterProvince + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
function itemFilterCountry() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/items/find/country?itemname="+
        document.getElementById("itemname").value + "&continent="+
        document.getElementById("continents").value + "&country="+
        document.getElementById("countries").value + "&start="+
        startFilterCounty + "&size="+ payLoadFilterCountry;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                pagesAll = Math.ceil(obj.count / payload)
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterCountry + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
                        rep += "<br/><b>" + obj.data[c].storename ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].address;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>" +  obj.data[c].itemname;
                        rep += "<br/>Price ZAR: " +  obj.data[c].price;
                        rep += " | In Stock: " +  obj.data[c].quantity;
                        rep += "<br/>";
                        rep +="<a onclick='addToBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Add to Bucket</a>";
                        rep += "  |  ";
                        rep +="<a onclick='viewStore("+obj.data[c].storecode+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterCountry + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
function itemFilterContinent() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/items/find/continent?itemname="+
        document.getElementById("itemname").value + "&continent="+
        document.getElementById("continents").value + "&start="+
        startFilterContinent + "&size="+
        payLoadFilterContinent;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                pagesAll = Math.ceil(obj.count / payload)
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterContinent + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
                        rep += "<br/><b>" + obj.data[c].storename ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].address;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>" +  obj.data[c].itemname;
                        rep += "<br/>Price ZAR: " +  obj.data[c].price;
                        rep += " | In Stock: " +  obj.data[c].quantity;
                        rep += "<br/>";
                        rep +="<a onclick='addToBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Add to Bucket</a>";
                        rep += "  |  ";
                        rep +="<a onclick='viewStore("+obj.data[c].storecode+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterContinent + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
function ItemsAll() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/items/all?start="+
        startAll + "&size=" + payLoadAll;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                pagesAll = Math.ceil(obj.count / payload)
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterAll + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
                        rep += "<br/><b>" + obj.data[c].storename ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].address;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>" +  obj.data[c].itemname;
                        rep += "<br/>Price ZAR: " +  obj.data[c].price;
                        rep += " | In Stock: " +  obj.data[c].quantity;
                        rep += "<br/>";
                        rep +="<a onclick='addToBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Add to Bucket</a>";
                        rep += "  |  ";
                        rep +="<a onclick='viewStore("+obj.data[c].storecode+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterAll + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
function ItemFilterAll() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/items/find/all?itemname="+
        document.getElementById("itemname").value + "&start="+
        startFilterAll + "&size="+ payLoadFilterAll;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                pagesAll = Math.ceil(obj.count / payload)
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterAll + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
                        rep += "<br/><b>" + obj.data[c].storename ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].address;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>" +  obj.data[c].itemname;
                        rep += "<br/>Price ZAR: " +  obj.data[c].price;
                        rep += " | In Stock: " +  obj.data[c].quantity;
                        rep += "<br/>";
                        rep +="<a onclick='addToBucket("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Add to Bucket</a>";
                        rep += "  |  ";
                        rep +="<a onclick='viewStore("+obj.data[c].storecode+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterFilterAll + tmp;
                rep += "<td align='left'>Page " + a + " of " + pagesAll;
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
function addToBucket(code) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host")+"/api/v1/bucket/insert?emailcell="+
        sessionStorage.getItem("emailcell") + "&itemId="+code;
    var rep;
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                //alert("The item has been to your bucket");
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("main-container").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function viewStore(id) {
    sessionStorage.setItem("storecode", id);
    var redirectWindow = window.open('viewStore.html', '_self');
}