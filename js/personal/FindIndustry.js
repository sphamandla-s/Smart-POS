var tmp = 1;
var payload = 6;
var pagesAll = 0;
var counterAll = 0;
var counterContinent = 0;
var counterCountry = 0;
var counterProvince = 0;
var counterTown = 0;
var counterLocation = 0;
var startAll = counterAll;
var startContinent = counterAll;
var startCountry = counterAll;
var startProvince = counterAll;
var startTown = counterAll;
var startLocation = counterAll;
var payloadAll = payload;
var payloadContinent = payload;
var payloadCountry = payload;
var payloadProvince = payload;
var payloadTown = payload;
var payloadLocation = payload;
function Next() {
    var continent = document.getElementById("continent").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var town = document.getElementById("town").value;
    var location = document.getElementById("location").value;
    if(continent == "" && country == "" && province == "" && town == "" && location == ""){
        if(counterAll < pagesAll - tmp){
            startAll += payload;
            payloadAll += payload;
            counterAll += tmp;
        }
    }else if(continent != "" && country == "" && province == "" && town == "" && location == ""){
        if(counterContinent < pagesAll - tmp){
            startContinent += payload;
            payloadContinent += payload;
            counterContinent += tmp;
        }
    }else if(continent != "" && country != "" && province == "" && town == "" && location == ""){
        if(counterCountry < pagesAll - tmp){
            startCountry += payload;
            payloadCountry += payload;
            counterCountry += tmp;
        }
    }else if(continent != "" && country != "" && province != "" && town == "" && location == ""){
        if(counterProvince < pagesAll - tmp){
            startProvince += payload;
            payloadProvince += payload;
            counterProvince += tmp;
        }
    }else if(continent != "" && country != "" && province != "" && town != "" && location == ""){
        if(counterTown < pagesAll - tmp){
            startTown += payload;
            payloadTown += payload;
            counterTown += tmp;
        }
    }else if(continent != "" && country != "" && province != "" && town != "" && location != ""){
        if(counterLocation < pagesAll - tmp){
            startLocation += payload;
            payloadLocation += payload;
            counterLocation += tmp;
        }
    }
    ValidateList()
}
function Previous() {
    var continent = document.getElementById("continent").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var town = document.getElementById("town").value;
    var location = document.getElementById("location").value;
    if(continent == "" && country == "" && province == "" && town == "" && location == ""){
        if(counterAll > 0){
            startAll -= payload;
            payloadAll -= payload;
            counterAll -= tmp;
        }
    }else if(continent != "" && country == "" && province == "" && town == "" && location == ""){
        if(counterContinent > 0){
            startContinent -= payload;
            payloadContinent -= payload;
            counterContinent -= tmp;
        }
    }else if(continent != "" && country != "" && province == "" && town == "" && location == ""){
        if(counterCountry > 0){
            startCountry -= payload;
            payloadCountry -= payload;
            counterCountry -= tmp;
        }
    }else if(continent != "" && country != "" && province == "" && town == "" && location == ""){
        if(counterProvince > 0){
            startProvince -= payload;
            payloadProvince -= payload;
            counterProvince -= tmp;
        }
    }else if(continent != "" && country != "" && province == "" && town != "" && location == ""){
        if(counterTown> 0){
            startTown -= payload;
            payloadTown -= payload;
            counterTown -= tmp;
        }
    }else if(continent != "" && country != "" && province == "" && town != "" && location != ""){
        if(counterLocation> 0){
            startLocation -= payload;
            payloadLocation -= payload;
            counterLocation -= tmp;
        }
    }
    ValidateList()
}
function ValidateList() {
    var continent = document.getElementById("continent").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var town = document.getElementById("town").value;
    var location = document.getElementById("location").value;
    if(continent == "" && country == "" && province == "" && town == "" && location == ""){
        StoresAll();
    }else if(continent != "" && country == "" && province == "" && town == "" && location == ""){
        StoresContinent();
    }else if(continent != "" && country != "" && province == "" && town == "" && location == ""){
        StoresCountry();
    }else if(continent != "" && country != "" && province != "" && town == "" && location == ""){
        StoresProvince();
    }else if(continent != "" && country != "" && province != "" && town != "" && location == ""){
        StoresTown();
    }else if(continent != "" && country != "" && province != "" && town != "" && location != ""){
        StoresLocation();
    }

}
function StoresLocation() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stores/location?continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province="+
        document.getElementById("province").value + "&town="+
        document.getElementById("town").value + "&location="+
        document.getElementById("location").value + "&start="+
        startLocation + "&size="+ payloadLocation;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width=\"100%\">\n" +
                    "<tr>"
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].logo != null && obj.data[c].logo != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><img src='"+ obj.data[c].logo +"' alt='photo' width='170px' height='200px'>";
                        rep += "<br/><b>" + obj.data[c].storeName ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].addressOne;
                        rep += "<br/>" +  obj.data[c].addressTwo;
                        rep += " | " +  obj.data[c].addressThree;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>";
                        rep +="<a onclick='viewStore("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        rep += "</td>";
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
function StoresTown() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stores/town?continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province="+
        document.getElementById("province").value + "&town="+
        document.getElementById("town").value + "&start="+
        startTown + "&size="+ payloadTown;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width=\"100%\">\n" +
                    "<tr>"
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].logo != null && obj.data[c].logo != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><img src='"+ obj.data[c].logo +"' alt='photo' width='170px' height='200px'>";
                        rep += "<br/><b>" + obj.data[c].storeName ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].addressOne;
                        rep += "<br/>" +  obj.data[c].addressTwo;
                        rep += " | " +  obj.data[c].addressThree;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>";
                        rep +="<a onclick='viewStore("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        rep += "</td>";
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
function StoresProvince() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stores/province?continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province="+
        document.getElementById("province").value + "&start="+
        startProvince + "&size="+ payloadProvince;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width=\"100%\">\n" +
                    "<tr>"
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].logo != null && obj.data[c].logo != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><img src='"+ obj.data[c].logo +"' alt='photo' width='170px' height='200px'>";
                        rep += "<br/><b>" + obj.data[c].storeName ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].addressOne;
                        rep += "<br/>" +  obj.data[c].addressTwo;
                        rep += " | " +  obj.data[c].addressThree;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>";
                        rep +="<a onclick='viewStore("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        rep += "</td>";
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
function StoresCountry() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stores/country?continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&start="+
        startCountry + "&size="+ payloadCountry;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width=\"100%\">\n" +
                    "<tr>"
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].logo != null && obj.data[c].logo != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><img src='"+ obj.data[c].logo +"' alt='photo' width='170px' height='200px'>";
                        rep += "<br/><b>" + obj.data[c].storeName ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].addressOne;
                        rep += "<br/>" +  obj.data[c].addressTwo;
                        rep += " | " +  obj.data[c].addressThree;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>";
                        rep +="<a onclick='viewStore("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        rep += "</td>";
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
function StoresContinent() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stores/continent?continent="+
        document.getElementById("continent").value + "&start="+
        startContinent + "&size="+ payloadContinent;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table class='table-filled' border='2' width=\"100%\">\n" +
                    "<tr>"
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].logo != null && obj.data[c].logo != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><img src='"+ obj.data[c].logo +"' alt='photo' width='170px' height='200px'>";
                        rep += "<br/><b>" + obj.data[c].storeName ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].addressOne;
                        rep += "<br/>" +  obj.data[c].addressTwo;
                        rep += " | " +  obj.data[c].addressThree;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>";
                        rep +="<a onclick='viewStore("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        rep += "</td>";
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
function StoresAll() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stores/all?start="+
        startAll + "&size="+ payloadAll;
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
                rep += "<table class='table-filled' border='2' width=\"100%\">\n" +
                    "<tr>"
                var c;
                var row = 0;
                var len = obj.data.length;
                for(c = 0; c < len; c++){
                    if(obj.data[c].logo != null && obj.data[c].logo != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }
                        rep += "<td align='center'><img src='"+ obj.data[c].logo +"' alt='photo' width='170px' height='200px'>";
                        rep += "<br/><b>" + obj.data[c].storeName ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].addressOne;
                        rep += "<br/>" +  obj.data[c].addressTwo;
                        rep += " | " +  obj.data[c].addressThree;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>";
                        rep +="<a onclick='viewStore("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        rep += "</td>";
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
function ValidateIndustry() {
    var continent = document.getElementById("continent").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var town = document.getElementById("town").value;
    var location = document.getElementById("location").value;
    if(continent == "" && country == "" && province == "" && town == "" && location == ""){
        sendIndustryAll();
    }else if(continent != "" && country == "" && province == "" && town == "" && location == ""){
        FindIndustryContinent();
    }else if(continent != "" && country != "" && province == "" && town == "" && location == ""){
        FindIndustryCountry();
    }else if(continent != "" && country != "" && province != "" && town == "" && location == ""){
        FindIndustryProvince();
    }else if(continent != "" && country != "" && province != "" && town != "" && location == ""){
        FindIndustryTown();
    }else if(continent != "" && country != "" && province != "" && town != "" && location != ""){
        StoresLocation();
    }

}
function FindIndustryTown() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/settings/pojo/industries/summary/town?continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province="+
        document.getElementById("province").value + "&town="+
        document.getElementById("town").value;
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
                    rep += "<td><h4>" + obj.data[c].name ;
                    rep += "</h4><h6>";
                    rep += " ( ";
                    rep +=  obj.data[c].counter;
                    rep += " )"
                    rep += "</h6></td>";
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
function FindIndustryProvince() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/settings/pojo/industries/summary/province?continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province="+
        document.getElementById("province").value;
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
                    rep += "<td><h4>" + obj.data[c].name ;
                    rep += "</h4><h6>";
                    rep += " ( ";
                    rep +=  obj.data[c].counter;
                    rep += " )"
                    rep += "</h6></td>";
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
function FindIndustryCountry() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/settings/pojo/industries/summary/country?continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value ;
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
                    rep += "<td><h4>" + obj.data[c].name ;
                    rep += "</h4><h6>";
                    rep += " ( ";
                    rep +=  obj.data[c].counter;
                    rep += " )"
                    rep += "</h6></td>";
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
function FindIndustryContinent() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/settings/pojo/industries/summary/continent?continent="+
        document.getElementById("continent").value;
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
                    rep += "<td><h4>" + obj.data[c].name ;
                    rep += "</h4><h6>";
                    rep += " ( ";
                    rep +=  obj.data[c].counter;
                    rep += " )"
                    rep += "</h6></td>";
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
function FindIndustryAll() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/settings/pojo/industries/summary/all";
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
                    rep += "<td><h4>" + obj.data[c].name ;
                    rep += "</h4><h6>";
                    rep += " ( ";
                    rep +=  obj.data[c].counter;
                    rep += " )"
                    rep += "</h6></td>";
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
function viewStore(id) {
    sessionStorage.setItem("storecode", id);
    var redirectWindow = window.open('viewStore.html', '_self');
}