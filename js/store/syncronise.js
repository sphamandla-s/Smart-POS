function refresh(){
    syncronise();
}
function syncronise() {
    var text = "<div class=\"form-layout\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"txtstockitems\">Latest Sync</label>\n" +
        "                    <br/>\n" +        
        "                    <input type=\"text\" id='txtstockitems' disabled aria-describedby=\"info\">\n" +
        "                    <input type=\"text\" id='txtSales' disabled aria-describedby=\"info\">\n" +
        "                    <input type=\"text\" id='txtBank' disabled aria-describedby=\"info\">\n" +        
        "                    <input type=\"text\" id='txtItemHistory' disabled aria-describedby=\"info\">\n" +
        "                    <input type=\"text\" id='txtAdjustments' disabled aria-describedby=\"info\">\n" +
        "                    <input type=\"submit\" id=\"btnRefresh\" value=\"Refresh\" onclick=\"refresh()\">\n" +
        "                </div>\n"         
        "        </div>";    
    document.getElementById("main-container").innerHTML = text;    
    document.getElementById('btnRefresh').addEventListener('click', function (event){
        event.preventDefault();
    });
    fetchStockItems();
    fetchSales();
    fetchBankAccount();
    fetchItemHistory();
    fetchStockDownload();

}
async function fetchStockItems(){
    const obj = await stockItems();

    if(obj.success == true && obj.count > 0){
        var msg = "StockItems Upload: " + obj.data.uDate + " : " + obj.data.uTime;
        msg += " | " + obj.data.username;
        document.getElementById("txtstockitems").value = msg;
    }else{
        document.getElementById("txtstockitems").value = "No StockItem has ever been uploaded";
    }

}
function stockItems(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/remote/upload?storecode="+
        sessionStorage.getItem("storecode") +"&title=stockitems",{
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
async function fetchBankAccount(){
    const obj = await bankAccount();
    if(obj.success == true && obj.count > 0){
        var msg = "Bank Upload: " + obj.data.uDate + " : " + obj.data.uTime;
        msg += " | " + obj.data.username;
        document.getElementById("txtBank").value = msg;
    }else{
        document.getElementById("txtBank").value = "No bank record has ever been uploaded";
    }

}
function bankAccount(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/remote/upload?storecode="+
        sessionStorage.getItem("storecode")+"&title=bank",{
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
async function fetchSales(){
    const obj = await Sales();
    if(obj.success == true && obj.count > 0){
        var msg = "Sales Upload: " + obj.data.uDate + " : " + obj.data.uTime;
        msg += " | " + obj.data.username;
        document.getElementById('txtSales').value = msg;
    }else{
        document.getElementById("txtsalesdaily").value = "No sale record has ever been uploaded";
    }

}
function Sales(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/remote/upload?storecode="+
        sessionStorage.getItem("storecode")+"&title=Sales Daily",{
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
async function fetchItemHistory(){
    const obj = await itemHistory();    
    if(obj.success == true && obj.count > 0)
    {
        var msg = "ItemHistory Upload: " + obj.data.uDate + " : " + obj.data.uTime;
        msg += " | " + obj.data.username;
        document.getElementById('txtItemHistory').value = msg;
    }else{
        document.getElementById("txtItemHistory").value = "No Item history has ever been uploaded";
    }

}
function itemHistory(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/remote/upload?storecode="+
        sessionStorage.getItem("storecode")+"&title=Item History",{
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
async function fetchStockDownload(){
    const obj = await stockDownload();    
    if(obj.success == true && obj.count > 0)
    {
        var msg = "Online adjustments: " + obj.data.uDate + " : " + obj.data.uTime;
        msg += " | " + obj.data.username;
        document.getElementById('txtAdjustments').value = msg;
    }else{
        document.getElementById("txtAdjustments").value = "No online adjustments has ever been made";
    }

}
function stockDownload(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/remote/upload?storecode="+
        sessionStorage.getItem("storecode")+"&title=OnlineSync",{
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