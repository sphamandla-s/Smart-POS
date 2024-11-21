function StoreSettings() {
    var updateItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"continent\">Continent</label>\n" +
        "                    <input type=\"text\" id=\"continent\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"country\">Country</label>\n" +
        "                    <input type=\"text\" id=\"country\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"province\">Provice</label>\n" +
        "                    <input type=\"text\" id=\"province\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"town\">Town</label>\n" +
        "                    <input type=\"text\" id=\"town\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"location\">Location</label>\n" +
        "                    <input type=\"text\" id=\"location\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"industry\">Industry</label>\n" +
        "                    <input type=\"text\" id=\"industry\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"phone\">Phone</label>\n" +
        "                    <input type=\"text\" id=\"phone\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"fax\">Fax</label>\n" +
        "                    <input type=\"text\" id=\"fax\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"email\">Email</label>\n" +
        "                    <input type=\"text\" id=\"email\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"website\">Website</label>\n" +
        "                    <input type=\"text\" id=\"website\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"taxnumber\">TaxNumber</label>\n" +
        "                    <input type=\"text\" id=\"taxnumber\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"storePackage\">Package</label>\n" +
        "                    <input type=\"text\" id=\"storePackage\" aria-describedby=\"info\" disabled>\n" +
        "                </div>\n" +
        "                <input type=\"button\" value=\"Update\" onclick=\"SendSaveDetails()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = updateItem;
}
function CreateBank() {
    var updateItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"accountHolder\">AccountHolder</label>\n" +
        "                    <input type=\"text\" id=\"accountHolder\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"accountNumber\">AccountNumber</label>\n" +
        "                    <input type=\"text\" id=\"accountNumber\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"accountType\">AccountType</label>\n" +
        "                    <input type=\"text\" id=\"accountType\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"bank\">Bank</label>\n" +
        "                    <input type=\"text\" id=\"bank\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"branch\">Branch</label>\n" +
        "                    <input type=\"text\" id=\"branch\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"paymentRef\">PaymentRef</label>\n" +
        "                    <input type=\"text\" id=\"paymentRef\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='sendBank' value=\"Save\" onclick=\"SaveBank()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = updateItem;
    document.getElementById('sendBank').addEventListener('click',function (event){
        event.preventDefault();
    });


}


async function SendBankList(){
    const obj = await BankList();
    if(obj.success == true){
        rep = "<table class='table-filled' border='2' width=\"100%\">\n"+
            "        <tr>\n" +
            "            <td>CreatedDate</td>\n" +
            "            <td>AccHolder</td>\n" +
            "            <td>AccNumber</td>\n" +
            "            <td>AccType</td>\n" +
            "            <td>Bank</td>\n" +
            "            <td>Branch</td>\n" +
            "            <td>PaymentRef</td>\n" +
            "            <td>Action</td>\n" +
            "        </tr>";
        var c;
        for(c = 0; c < obj.count; c++){
            rep += "<tr>";
            rep += "<td>" + obj.data[c].bDate + " | " + obj.data[c].bTime;
            rep += "<td>" + obj.data[c].accountHolder + "</td>";
            rep += "<td>" + obj.data[c].accountNumber + "</td>";
            rep += "<td>" + obj.data[c].accountType + "</td>";
            rep += "<td>" + obj.data[c].bank + "</td>";
            rep += "<td>" + obj.data[c].branch + "</td>";
            rep += "<td>" + obj.data[c].paymentRef + "</td>";
            rep += "<td>";
            rep +="<a onclick='SendDeleteBank("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>Remove Bank</a>";
            rep += "</td>";
        }
        rep += "</tr>";
        rep += "</table>";
        document.getElementById("main-container").innerHTML = rep;
    }
}
async function BankList(){
    try {
        const response = await fetch(sessionStorage.getItem("host") + "/api/v1/store/bank/details/get?username=" +
            sessionStorage.getItem("username") + "&storecode=" + sessionStorage.getItem("storecode"), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
async function SendDeleteBank(id){
    const obj = await DeleteBank(id);
    if(obj.success == true){
        SendBankList();
    }
}
async function DeleteBank(id){
    try {
        const response = await fetch(sessionStorage.getItem("host") + "/api/v1/store/bank/details/remove?username=" +
            sessionStorage.getItem("username") + "&storecode=" +
            sessionStorage.getItem("storecode") + "&bankId=" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
function CreatePackage() {
    var rep;
    rep = "<table class='table-filled' border='2' width=\"100%\">";
    rep += "<tr>";
    rep += "<td></td>";
    rep += "<td align='center'><h5>Free</h5></td>";
    rep += "<td align='center'><h5>Starter</h5></td>";
    rep += "<td align='center'><h5>Standard</h5></td>";
    rep += "<td align='center'><h5>Global</h5></td>";
    rep += "</tr>";
    //stock item row
    rep += "<tr>";
    rep += "<td><b>No. of Stockitems</b></td>";
    rep += "<td align='center'>10</td>";
    rep += "<td align='center'>5000</td>";
    rep += "<td align='center'>20000</td>";
    rep += "<td align='center'>unlimited</td>";
    rep += "</tr>";
    //items pictures
    rep += "<tr>";
    rep += "<td><b>Items Pictures</b></td>";
    rep += "<td align='center'>non</td>";
    rep += "<td align='center'>single per item</td>";
    rep += "<td align='center'>single per item</td>";
    rep += "<td align='center'>albums</td>";
    rep += "</tr>";
    //System Users
    rep += "<tr>";
    rep += "<td><b>System Users</b></td>";
    rep += "<td align='center'>1</td>";
    rep += "<td align='center'>10</td>";
    rep += "<td align='center'>25</td>";
    rep += "<td align='center'>unlimited</td>";
    rep += "</tr>";
    //System Users
    rep += "<tr>";
    rep += "<td><b>System Users</b></td>";
    rep += "<td align='center'>3 Months</td>";
    rep += "<td align='center'>unlimited</td>";
    rep += "<td align='center'>unlimited</td>";
    rep += "<td align='center'>unlimited</td>";
    rep += "</tr>";
    //price row
    rep += "<tr>";
    rep += "<td></td>";
    rep += "<td align='center'><h5>Free</h5></td>";
    rep += "<td align='center'><h5>ZAR: 69.00 P/M</h5></td>";
    rep += "<td align='center'><h5>ZAR: 99.00 P/M</h5></td>";
    rep += "<td align='center'><h5>ZAR: 199.00 P/M</h5></td>";
    rep += "<tr>";
    document.getElementById("main-container").innerHTML = rep;

}
async function SendFetchDetails(){
    const obj = await FetchDetails();
    if(obj.success == true){
        document.getElementById("continent").value = obj.data.continent;
        document.getElementById("country").value = obj.data.country;
        document.getElementById("province").value = obj.data.province;
        document.getElementById("town").value = obj.data.town;
        document.getElementById("location").value = obj.data.location;
        document.getElementById("industry").value = obj.data.industry;
        document.getElementById("phone").value = obj.data.phone;
        document.getElementById("fax").value = obj.data.fax;
        document.getElementById("email").value = obj.data.email;
        document.getElementById("website").value = obj.data.website;
        document.getElementById("taxnumber").value = obj.data.taxnumber;
        document.getElementById("storePackage").value = obj.data.storePackage;
    }
}
async function FetchDetails(){
    try {
        const response = await fetch(sessionStorage.getItem("host") + "/api/v1/general/store/settings/get?strorecode=" +
            sessionStorage.getItem("storecode"), {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
function StoreSettings() {
    var updateItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"continent\">Continent</label>\n" +
        "                    <input type=\"text\" id=\"continent\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"country\">Country</label>\n" +
        "                    <input type=\"text\" id=\"country\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"province\">Provice</label>\n" +
        "                    <input type=\"text\" id=\"province\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"town\">Town</label>\n" +
        "                    <input type=\"text\" id=\"town\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"location\">Location</label>\n" +
        "                    <input type=\"text\" id=\"location\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"industry\">Industry</label>\n" +
        "                    <input type=\"text\" id=\"industry\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"phone\">Phone</label>\n" +
        "                    <input type=\"text\" id=\"phone\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"fax\">Fax</label>\n" +
        "                    <input type=\"text\" id=\"fax\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"email\">Email</label>\n" +
        "                    <input type=\"text\" id=\"email\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"website\">Website</label>\n" +
        "                    <input type=\"text\" id=\"website\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"taxnumber\">TaxNumber</label>\n" +
        "                    <input type=\"text\" id=\"taxnumber\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"storePackage\">Package</label>\n" +
        "                    <input type=\"text\" id=\"storePackage\" aria-describedby=\"info\" disabled>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='sendSettings' value=\"Update\" onclick=\"SaveDetails()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = updateItem;
    SendFetchDetails();
    document.getElementById("sendSettings").addEventListener("click",function (event){
        event.preventDefault()
    });
}

async function SaveBank(){
    const url = sessionStorage.getItem("host") + "/api/v1/store/bank/details/insert?username="+
        sessionStorage.getItem("username") +"&storecode="+
        sessionStorage.getItem("storecode") + "&accountHolder="+
        document.getElementById("accountHolder").value + "&accountNumber="+
        document.getElementById("accountNumber").value + "&accountType="+
        document.getElementById("accountType").value + "&bank="+
        document.getElementById("bank").value + "&branch="+
        document.getElementById("branch").value + "&paymentRef="+
        document.getElementById("paymentRef").value;
    const options = {
        method: "PUT",
        headers: {"Content-Type" : "application/json"}
    }
    try {
        let result = await fetch(url,options)
        if(result.ok){
            SendBankList();
        }
    }catch (error){
        console.error("error: "+ error);
        return error;
    }
}
async function SaveDetails(){
    const url = sessionStorage.getItem("host") + "/api/v1/general/store/settings/update?storecode=" +
        sessionStorage.getItem("storecode")+"&username="+
        sessionStorage.getItem("username") +"&continent="+
        document.getElementById("continent").value + "&country="+
        document.getElementById("country").value + "&province="+
        document.getElementById("province").value + "&town=" +
        document.getElementById("town").value + "&location="+
        document.getElementById("location").value + "&industry="+
        document.getElementById("industry").value + "&phone=" +
        document.getElementById("phone").value + "&fax=" +
        document.getElementById("fax").value + "&email="+
        document.getElementById("email").value +  "&website="+
        document.getElementById("website").value + "&taxnumber="+
        document.getElementById("taxnumber").value;
    const options = {
        method: "PUT",
        headers: {"Content-Type" : "application/json"}
    }
    try {
        let result = await fetch(url,options)
        if(result.ok){
            console.log(result.json());
            StoreSettings();
        }
    }catch (error){
        console.error("error: "+ error);
        return error;
    }

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