function DeleteSpecialItem(id, specialId) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/specials/store/items/delete?username="+
        sessionStorage.getItem("username") + "&storecode="+
        sessionStorage.getItem("storecode") + "&specialId="+ specialId + "&itemid=" + id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                ViewSpecialItems(specialId);
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("sub-menu").innerHTML = rep;
            }
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send();
}
function AddSpecialItem(id,specialId) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/specials/store/items/add?username="+
        sessionStorage.getItem("username") + "&storecode="+
        sessionStorage.getItem("storecode") + "&specialId="+ specialId + "&itemId="+ id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                document.getElementById("sub-menu").innerHTML = "";
                CreateAddSpecialItems(specialId);
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("sub-menu").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function CreateAddSpecialItems(specialId) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/stockitems/stocklist?storecode="+
        sessionStorage.getItem("storecode") + "&username="+ sessionStorage.getItem("username");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table align='center' class=\"table-general\" border=\"2\" width=\"95%\">\n" +
                    "        <tr>\n" +
                    "            <th>Department</th>\n" +
                    "            <th>Category</th>\n" +
                    "            <th>Itemname</th>\n" +
                    "            <th>Barcode</th>\n" +
                    "            <th>stockPrice</th>\n" +
                    "            <th>SellingPrice</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].department + "</td>";
                    rep += "<td>" + obj.data[c].category + "</td>";
                    rep += "<td>" + obj.data[c].itemname + "</td>";
                    rep += "<td>" + obj.data[c].barCode + "</td>";
                    rep += "<td>" + obj.data[c].stockprice + "</td>";
                    rep += "<td>" + obj.data[c].sellingprice + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='AddSpecialItem("+obj.data[c].id+","+ specialId+");' style='cursor: pointer; cursor: hand; color: blue;'>AddItem</a>";
                    rep +="</td>";
                }
                rep += "</tr>";
                rep += "</table>";
                document.getElementById("specials-list").innerHTML = rep;
                document.getElementById("for-button").innerHTML = "";
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("sub-menu").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

}
function ViewSpecialItems(specialId) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/specials/store/items/view?username="+
        sessionStorage.getItem("username") + "&storecode="+
        sessionStorage.getItem("storecode") + "&specialId="+ specialId;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table align='center' class=\"table-general\" border=\"2\" width=\"95%\">\n" +
                    "        <tr>\n" +
                    "            <th>Department</th>\n" +
                    "            <th>Category</th>\n" +
                    "            <th>Itemname</th>\n" +
                    "            <th>Barcode</th>\n" +
                    "            <th>stockPrice</th>\n" +
                    "            <th>SellingPrice</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].department + "</td>";
                    rep += "<td>" + obj.data[c].category + "</td>";
                    rep += "<td>" + obj.data[c].itemname + "</td>";
                    rep += "<td>" + obj.data[c].barCode + "</td>";
                    rep += "<td>" + obj.data[c].stockprice + "</td>";
                    rep += "<td>" + obj.data[c].sellingprice + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='DeleteSpecialItem("+obj.data[c].id+","+ specialId+");' style='cursor: pointer; cursor: hand; color: blue;'>DeleteItem</a>";
                    rep +="</td>";
                }
                rep += "</tr>";
                rep += "</table>";
                document.getElementById("specials-list").innerHTML = rep;
                document.getElementById("for-button").innerHTML = "";
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("sub-menu").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
function CreateSpecial() {
    var rep = "<table width=\"525px\" border=\"2\" align=\"center\">\n" +
        "        <tr>\n" +
        "            <td>Name</td>\n" +
        "            <td><input type=\"text\" id=\"name\" placeholder=\"SpecialName\" class =\"inner-txt-small\"></td>\n" +
        "            <td>EndDate</td>\n" +
        "            <td><input type=\"date\" value=\"yyyy-mm-dd\" id=\"enddate\" name=\"date\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td>Description</td>\n" +
        "            <td><input type=\"text\" id=\"description\" placeholder=\"SpecialDescription\" class =\"inner-txt-small\"></td>\n" +
        "            <td>StartDate</td>\n" +
        "            <td><input type=\"date\" value=\"yyyy-mm-dd\" id=\"startdate\" name=\"date\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "            <td align=\"center\" colspan=\"4\"><input type=\"button\" onclick=\"SaveSpecial()\" value=\"Save Special\" class=\"button\">\n" +
        "            </td>\n" +
        "        </tr>\n" +
        "    </table>";
    document.getElementById("menu").innerHTML = rep;
}
function DeleteSpecial(id) {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/specials/store/delete?username="+
        sessionStorage.getItem("username") + "&storecode="+
        sessionStorage.getItem("storecode") + "&specialId="+ id;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                FetchList();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("sub-menu").innerHTML = rep;
            }
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send();
}
function SaveSpecial() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/specials/insert?username="+
        sessionStorage.getItem("username") + "&storecode="+
        sessionStorage.getItem("storecode") + "&specialName="+
        document.getElementById("name").value + "&specialDescription="+
        document.getElementById("description").value + "&startDate="+
        document.getElementById("startdate").value + "&endDate="+
        document.getElementById("enddate").value;
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                FetchList();
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("sub-menu").innerHTML = rep;
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.send();
}
function FetchList() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/specials/store/list?username="+
        sessionStorage.getItem("username") + "&storecode="+ sessionStorage.getItem("storecode");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table align='center' class=\"table-general\" border=\"2\" width=\"95%\">\n" +
                    "        <tr>\n" +
                    "            <th>CreatedBy</th>\n" +
                    "            <th>Name</th>\n" +
                    "            <th>Description</th>\n" +
                    "            <th>StartDate</th>\n" +
                    "            <th>EndDate</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].username + "</td>";
                    rep += "<td>" + obj.data[c].specialName + "</td>";
                    rep += "<td>" + obj.data[c].specialDescription + "</td>";
                    rep += "<td>" + obj.data[c].startDate + "</td>";
                    rep += "<td>" + obj.data[c].endDate + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='ViewSpecialItems("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>ViewItems</a>";
                    rep += " | ";
                    rep +="<a onclick='CreateAddSpecialItems("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>AddItems</a>";
                    rep += " | ";
                    rep +="<a onclick='DeleteSpecial("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>DeleteSpecial</a>";
                    rep +="</td>";
                }
                rep += "</tr>";
                rep += "</table>";
                document.getElementById("specials-list").innerHTML = rep;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("sub-menu").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}