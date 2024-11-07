var tmp=  1;
var payload = 15;
var pagesAll;
var counterAll = 0;
var counterContinent = counterAll;
var counterCountry = counterAll;
var counterProvince = counterAll;
var counterTown = counterAll;
var counterLocation = counterAll;
var startContinent = 0;
var startCountry = 0;
var startProvince = 0;
var startTown = 0;
var startLocation = 0;
var payLoadContinent = payload;
var payLoadCountry = payload;
var payLoadProvince = payload;
var payLoardTown = payload;
var payLoadLocation = payload;
function Next() {
    if(document.getElementById("continent").value == "" && document.getElementById("country").value == ""
        && document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        if(counterAll < pagesAll - tmp){
            counterAll = counterAll + tmp;
        }
    }else if(document.getElementById("country").value == ""
        && document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        if(counterContinent < pagesAll - tmp){
            startContinent = startContinent + payload;
            payLoadContinent = payLoadContinent + payload;
            counterContinent = counterContinent + tmp;
        }
    }else if(document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        if(counterCountry < pagesAll - tmp){
            startCountry = startCountry + payload;
            payLoadCountry = payLoadCountry + payload;
            counterCountry = counterCountry + tmp;
        }
    }else if(document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        if(counterProvince < pagesAll - tmp){
            startProvince = startProvince + payload;
            payLoadProvince = payLoadProvince + payload;
            counterProvince = counterProvince + tmp;
        }
    }else if(document.getElementById("location").value == ""){
        if(counterTown < pagesAll - tmp){
            startTown = startTown + payload;
            payLoardTown = payLoardTown + payload;
            counterTown = counterTown + tmp;
        }
    }else {
        if(counterLocation < pagesAll - tmp){
            startLocation = startLocation + payload;
            payLoadLocation = payLoadLocation + payload;
            counterLocation = counterLocation + tmp;
        }
    }
    Validate();
}
function Previous() {
    if(document.getElementById("continent").value == "" && document.getElementById("country").value == ""
        && document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        if(counterAll > 0){
            counterAll = counterAll - tmp;
        }
    }else if(document.getElementById("country").value == ""
        && document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        if(counterContinent > 0){
            startContinent = startContinent - payload;
            payLoadContinent = payLoadContinent - payload;
            counterContinent = counterContinent - tmp;
        }
    }else if(document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        if(counterCountry > 0){
            startCountry = startCountry - payload;
            payLoadCountry = payLoadCountry - payload;
            counterCountry = counterCountry - tmp;
        }
    }else if(document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        if(counterProvince > 0){
            startProvince = startProvince - payload;
            payLoadProvince = payLoadProvince - payload;
            counterProvince = counterProvince - tmp;
        }
    }else if(document.getElementById("location").value == ""){
        if(counterTown > 0){
            startTown = startTown - payload;
            payLoardTown = payLoardTown - payload;
            counterTown = counterTown - tmp;
        }
    }else {
        if(counterLocation > 0){
            startLocation = startLocation - payload;
            payLoadLocation = payLoadLocation - payload;
            counterLocation = counterLocation - tmp;
        }
    }
    Validate();
}
function Validate() {
    if(document.getElementById("continent").value == "" && document.getElementById("country").value == ""
        && document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        NewsFeedAll();
    }else if(document.getElementById("country").value == ""
        && document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        NewsFeedContinent();
    }else if(document.getElementById("province").value =="" && document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        NewsFeedCountry();
    }else if(document.getElementById("town").value == ""
        && document.getElementById("location").value == ""){
        NewsFeedProvince();
    }else if(document.getElementById("location").value == ""){
        NewsFeedTown();
    }else{
        NewsFeedLocation();
    }
}
function NewsFeedLocation() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/newsfeed/location?start="+
        startLocation +"&size="+ payLoadLocation + "&continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province=" +
        document.getElementById("province").value + "&town="+
        document.getElementById("town").value + "&location="+
        document.getElementById("location").value;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width='100%'>";
                rep += "<tr>";
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].title != null && obj.data[c].title != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><b>" + obj.data[c].title;
                        rep +=  "</b><br/>" + obj.data[c].description;
                        rep +="<br/><a onclick='viewStore("+ obj.data[c].storecode +");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterLocation + tmp;
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
function NewsFeedTown() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/newsfeed/town?start="+
        startTown +"&size="+ payLoardTown + "&continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province=" +
        document.getElementById("province").value + "&town="+
        document.getElementById("town").value ;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width='100%'>";
                rep += "<tr>";
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].title != null && obj.data[c].title != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><b>" + obj.data[c].title;
                        rep +=  "</b><br/>" + obj.data[c].description;
                        rep +="<br/><a onclick='viewStore("+ obj.data[c].storecode +");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterTown + tmp;
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
function NewsFeedProvince() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/newsfeed/province?start="+
        startProvince +"&size="+ payLoadProvince + "&continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province=" +
        document.getElementById("province").value;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width='100%'>";
                rep += "<tr>";
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].title != null && obj.data[c].title != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><b>" + obj.data[c].title;
                        rep +=  "</b><br/>" + obj.data[c].description;
                        rep +="<br/><a onclick='viewStore("+ obj.data[c].storecode +");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterProvince + tmp;
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
function NewsFeedCountry() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/newsfeed/country?start="+
        startCountry +"&size="+ payLoadCountry + "&continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width='100%'>";
                rep += "<tr>";
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].title != null && obj.data[c].title != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><b>" + obj.data[c].title;
                        rep +=  "</b><br/>" + obj.data[c].description;
                        rep +="<br/><a onclick='viewStore("+ obj.data[c].storecode +");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterCountry + tmp;
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
function NewsFeedContinent() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/newsfeed/continent?start="+
        startContinent +"&size="+ payLoadContinent + "&continent="+
        document.getElementById("continent").value;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width='100%'>";
                rep += "<tr>";
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].title != null && obj.data[c].title != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><b>" + obj.data[c].title;
                        rep +=  "</b><br/>" + obj.data[c].description;
                        rep +="<br/><a onclick='viewStore("+ obj.data[c].storecode +");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counterContinent + tmp;
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
function NewsFeedAll() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/newsfeed/all?start="+ counterAll + "&size="+ payload;
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
                rep += "<table class='table-filled' border='2' width='100%'>";
                rep += "<tr>";
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].title != null && obj.data[c].title != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><b>" + obj.data[c].title;
                        rep +=  "</b><br/>" + obj.data[c].description;
                        rep +="<br/><a onclick='viewStore("+ obj.data[c].storecode +");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
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
function viewStore(id) {
    sessionStorage.setItem("storecode", id);
    var redirectWindow = window.open('viewStore.html', '_self');
}