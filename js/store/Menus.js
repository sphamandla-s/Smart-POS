function CreateMenu() {
    var rep = "<table width=\"525px\" border=\"2\" align=\"center\">\n" +
        "        <tr>\n" +
        "            <td>Name</td>\n" +
        "            <td><input type=\"text\" id=\"name\" placeholder=\"MenuName\" class =\"inner-txt-small\"></td>\n" +
        "            <td>Description</td>\n" +
        "            <td><input type=\"text\" id=\"description\" placeholder=\"MenuDescription\" class =\"inner-txt-small\"></td>\n" +
        "        </tr>\n" +
        "        <tr>\n" +
        "<td colspan='4' align='center'><input type=\"button\" onclick=\"CreateMenu()\" value=\"Save Menu\" class=\"button\"></td>\n" +
        "        </tr>\n" +
        "    </table>";
    document.getElementById("menu").innerHTML = rep;
}
function FetchList() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/menus/store/list?storecode="+
        sessionStorage.getItem("storecode") + "&username="+ sessionStorage.getItem("username");
    var rep = "";
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                rep = "<table align='center' class=\"table-general\" border=\"2\" width=\"750px\">\n" +
                    "        <tr>\n" +
                    "            <th>CreatedBy</th>\n" +
                    "            <th>Name</th>\n" +
                    "            <th>Description</th>\n" +
                    "            <th>Action</th>\n" +
                    "        </tr>\n" +
                    "    </thead>";
                var c;
                for(c = 0; c < obj.count; c++){
                    rep += "<tr>";
                    rep += "<td>" + obj.data[c].username + "</td>";
                    rep += "<td>" + obj.data[c].menuName + "</td>";
                    rep += "<td>" + obj.data[c].menuDescription + "</td>";
                    rep += "<td>"
                    rep +="<a onclick='ViewSpecialItems("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>ViewItems</a>";
                    rep += " | ";
                    rep +="<a onclick='CreateAddSpecialItems("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>AddItems</a>";
                    rep += " | ";
                    rep +="<a onclick='DeleteSpecial("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>DeleteMenu</a>";
                    rep +="</td>";
                }
                rep += "</tr>";
                rep += "</table>";
                document.getElementById("menus-list").innerHTML = rep;
            } else {
                rep = "Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data;
                document.getElementById("sub-menu").innerHTML = rep;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}