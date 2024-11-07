
function forUpdateLoad(){
    const barcode = document.getElementById("barcode").value;
    updateItemBarcode(barcode);
}
async function updateItemBarcode(barcode) {
    const updateItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <a onclick='ItemsList()'><h3>Return</h3></a>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"department\">Department</label>\n" +
        "                    <input type=\"text\" id=\"department\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">shop</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"category\">Category</label>\n" +
        "                    <input type=\"text\" id=\"category\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"itemname\">Itemname</label>\n" +
        "                    <input type=\"text\" id=\"itemname\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"description\">Description</label>\n" +
        "                    <input type=\"text\" id=\"description\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"vat\">Vat</label>\n" +
        "                    <input type=\"text\" id=\"vat\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"stockprice\">stockprice</label>\n" +
        "                    <input type=\"text\" id=\"stockprice\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"sellingprice\">SellingPrice</label>\n" +
        "                    <input type=\"text\" id=\"sellingprice\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"lowlevel\">LowLevel</label>\n" +
        "                    <input type=\"text\" id=\"lowlevel\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"location\">Location</label>\n" +
        "                    <input type=\"text\" id=\"location\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"shelf\">Shelf</label>\n" +
        "                    <input type=\"text\" id=\"shelfnumber\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"supplier\">Supplier</label>\n" +
        "                    <input type=\"text\" id=\"supplier\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='btnUpdate' value=\"Update\" onclick=\"update()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = updateItem;
    document.getElementById('btnUpdate').addEventListener('click', function (event){
        event.preventDefault();
    });
    const obj = await findItem(barcode);
    if (obj.success == true) {
        document.getElementById("department").value = obj.data.department;
        document.getElementById("category").value = obj.data.category;
        document.getElementById("itemname").value = obj.data.itemname;
        document.getElementById("description").value = obj.data.description;
        document.getElementById("vat").value = obj.data.vat;
        document.getElementById("stockprice").value = obj.data.stockprice;
        document.getElementById("sellingprice").value = obj.data.sellingprice;
        document.getElementById("lowlevel").value = obj.data.lowlevel;
        document.getElementById("location").value = obj.data.location;
        document.getElementById("shelfnumber").value = obj.data.shelfnumber;
        document.getElementById("supplier").value = obj.data.supplier;
        sessionStorage.setItem("itemcode", obj.data.barCode);
    }
}
function createSearchItem() {
    var addItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"barcode\">SearchItem(Barcode)</label>\n" +
        "                    <input type=\"text\" id=\"barcode\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                <input type=\"submit\" id='btnSearch' value=\"Search\" onclick=\"sendSeachStockItems()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = addItem;
    document.getElementById('btnSearch').addEventListener('click', function (event){
        event.preventDefault();
    });
}



async function update() {
    const url = sessionStorage.getItem("host") + "/api/v1/stockitems/item/update?"
        + "storeid=" + sessionStorage.getItem("storecode")
        + "&username=" + sessionStorage.getItem("username")
        +"&department="+ document.getElementById("department").value
        +"&category="+ document.getElementById("category").value
        +"&itemname="+ document.getElementById("itemname").value
        +"&description="+ document.getElementById("description").value
        +"&vat="+ document.getElementById("vat").value
        +"&barcode="+ sessionStorage.getItem("itemcode")
        +"&stockprice="+ document.getElementById("stockprice").value
        +"&sellingprice="+ document.getElementById("sellingprice").value
        +"&quantity=0"
        +"&lowlevel="+ document.getElementById("lowlevel").value
        +"&location="+ document.getElementById("location").value
        +"&shelfNumber="+ document.getElementById("shelfnumber").value
        +"&supplier=" + document.getElementById("supplier").value;
    const options = {
        method: "PUT",
        headers: {"Content-Type" : "application/json"}
    }
    let result = await fetch(url, options)
    if(result.ok){
        sendStockItems();
    }

}

function preAddItem(){
    var addItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"barcode\">Barcode for Add</label>\n" +
        "                    <input type=\"text\" id=\"barcode\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                <input type=\"submit\" id='btnAdd' value=\"Search\" onclick=\"forAddItem()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = addItem;
    document.getElementById('btnAdd').addEventListener('click', function (event){
        event.preventDefault();
    });
}

async function addItem(barcode) {
    const addItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"barcode\">Barcode</label>\n" +
        "                    <input type=\"text\" id=\"barcode\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"stockprice\">stockprice</label>\n" +
        "                    <input type=\"text\" id=\"stockprice\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"sellingprice\">SellingPrice</label>\n" +
        "                    <input type=\"text\" id=\"sellingprice\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"quantity\">Quantity</label>\n" +
        "                    <input type=\"text\" id=\"quantity\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"supplier\">Supplier</label>\n" +
        "                    <input type=\"text\" id=\"supplier\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"invoicenumber\">InvoiceNumber</label>\n" +
        "                    <input type=\"text\" id=\"invoicenumber\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='btnAdd' value=\"Add\" onclick=\"add()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = addItem;
    document.getElementById('btnAdd').addEventListener('click', function (event){
        event.preventDefault();
    });
    const obj = await findItem(barcode);
    if(obj.success == true){
        document.getElementById("barcode").value = obj.data.barcode;
        document.getElementById("stockprice").value = obj.data.stockprice;
        document.getElementById("sellingprice").value = obj.data.sellingprice;
        document.getElementById("quantity").value = obj.data.quantity;
        document.getElementById("supplier").value = obj.data.supplier;
        document.getElementById("invoicenumber").value = obj.data.location;
        sessionStorage.setItem("itemcode", obj.data.barCode);
    }
}

async function createAdddItem(barcode) {
    const addItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +        
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"barcode\">Barcode</label>\n" +
        "                    <input type=\"text\" id=\"barcode\" disabled aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"invoicenumber\">InvoiceNumber</label>\n" +
        "                    <input type=\"text\" id=\"invoicenumber\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"quantity\">ExistingQuantity</label>\n" +
        "                    <input type=\"text\" id=\"quantity\" disabled aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"newQuantity\">Added Quantity</label>\n" +
        "                    <input type=\"text\" id=\"newQuantity\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"supplier\">Supplier</label>\n" +
        "                    <input type=\"text\" id=\"supplier\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"stockprice\">stockprice</label>\n" +
        "                    <input type=\"text\" id=\"stockprice\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"sellingprice\">SellingPrice</label>\n" +
        "                    <input type=\"text\" id=\"sellingprice\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +       
        
        "                <input type=\"submit\" id='btnAdd' value=\"Add\" onclick=\"sendAdd()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = addItem;
    document.getElementById('btnAdd').addEventListener('click', function (event){
        event.preventDefault();
    });
    const obj = await findItem(barcode);
    if(obj.success == true){
        document.getElementById("barcode").value = obj.data.barCode;
        document.getElementById("stockprice").value = obj.data.stockprice;
        document.getElementById("sellingprice").value = obj.data.sellingprice;
        document.getElementById("quantity").value = obj.data.quantity;
        document.getElementById("supplier").value = obj.data.supplier;
        document.getElementById("invoicenumber").value = obj.data.location;
        sessionStorage.setItem("itemcode", obj.data.barCode);
    }
}

function findItem(barcode){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stockitems/find/item/id?storecode="+
            sessionStorage.getItem('storecode')+"&id="+ barcode ,{
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


async function sendAdd(){
    const obj = await add();
    console.log(obj);
    if(obj.success == true){
        if (obj.count > 0) {
           sendStockItems();
        }else{
            rep = "<p class='no-record-response'>Error has occured</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}

function add(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stockitems/add/quantity?barcode="+
        document.getElementById("barcode").value +"&invoicenumber="+
        document.getElementById("invoicenumber").value +"&supplier="+
        document.getElementById("supplier").value +"&quantity="+
        document.getElementById("newQuantity").value +"&stockprice="+
        document.getElementById("stockprice").value +"&sellingprice="+
        document.getElementById("sellingprice").value +"&username="+
        sessionStorage.getItem('username')+"&storecode="+ sessionStorage.getItem('storecode'),{
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

function createItem() {
    var newItem = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"department\">Department</label>\n" +
        "                    <input type=\"text\" id=\"department\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">shop</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"category\">Category</label>\n" +
        "                    <input type=\"text\" id=\"category\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"itemname\">Itemname</label>\n" +
        "                    <input type=\"text\" id=\"itemname\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"barcode\">Barcode</label>\n" +
        "                    <input type=\"text\" id=\"barcode\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"description\">Description</label>\n" +
        "                    <input type=\"text\" id=\"description\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"vat\">Vat</label>\n" +
        "                    <input type=\"text\" id=\"vat\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"stockprice\">stockprice</label>\n" +
        "                    <input type=\"text\" id=\"stockprice\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"sellingprice\">SellingPrice</label>\n" +
        "                    <input type=\"text\" id=\"sellingprice\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"quantity\">Quantity</label>\n" +
        "                    <input type=\"text\" id=\"quantity\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"lowlevel\">LowLevel</label>\n" +
        "                    <input type=\"text\" id=\"lowlevel\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"location\">Location</label>\n" +
        "                    <input type=\"text\" id=\"location\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"shelf\">Shelf</label>\n" +
        "                    <input type=\"text\" id=\"shelfnumber\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"supplier\">Supplier</label>\n" +
        "                    <input type=\"text\" id=\"supplier\" aria-describedby=\"info\">\n" +
        "                    <span class=\"material-icons\">location</span>\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='sendItem' value=\"Save\" onclick=\"saveItem()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newItem;
    document.getElementById('sendItem').addEventListener('click',function (event){
        event.preventDefault();
    });
    

}
async function saveItem(){
    const url = sessionStorage.getItem("host") + "/api/v1/stockitems/insert/item?"
        + "storeid=" + sessionStorage.getItem("storecode")
        + "&username=" + sessionStorage.getItem("username")
        +"&department="+ document.getElementById("department").value
        +"&category="+ document.getElementById("category").value
        +"&itemname="+ document.getElementById("itemname").value
        +"&description="+ document.getElementById("description").value
        +"&vat="+ document.getElementById("vat").value
        +"&barcode="+ document.getElementById("barcode").value
        +"&stockprice="+ document.getElementById("stockprice").value
        +"&sellingprice="+ document.getElementById("sellingprice").value
        +"&quantity="+ document.getElementById("quantity").value
        +"&lowlevel="+ document.getElementById("lowlevel").value
        +"&location="+ document.getElementById("location").value
        +"&shelfNumber="+ document.getElementById("shelfnumber").value
        +"&supplier=" + document.getElementById("supplier").value;
    const options = {
        method: "PUT",
        headers: {"Content-Type" : "application/json"}
    }
    try {
        let result = await fetch(url,options)
        if(result.ok){
            //console.log(result.json());
            sendStockItems();
        }
    }catch (error){
        console.error("error: "+ error);
        return error;
    }

}
var pages = 0;
var payload = 20;
var start = 0;
var size = payload;
var counter = 1;

function next(){
    if(counter < pages){
        start += payload;
        size += payload;
        counter += 1;
    }
    sendStockItems();
}
function previous(){
    if(counter > 1){
        start -= payload;
        size -= payload;
        counter -= 1;
    }
    sendStockItems();
}
async function sendStockItems(){
    document.getElementById("main-container").innerHTML = "<p class=no-record-response>Fetching Stock....</p>";
    const obj = await stockItems();
    //console.log(obj);
    if(obj.success == true){
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            pages = Math.ceil(obj.count / payload);
            rep += "<td align='left'>StockItems " + counter + " of " + pages;
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='previous()' class='my-link'>&laquo Previous</a></h5></td>";
            rep += "<td align='right'><h5><a onclick='next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>Category</th>";
            rep += "<th>Name</th>";
            rep += "<th>Code</th>";
            rep += "<th>StockP.</th>";
            rep += "<th>SellingP.</th>";
            rep += "<th>Qnty</th>";
            rep += "<th>Supplier</th>";
            rep += "<th>Action</th>";
            rep += "</tr>";
            var c;
            var len = obj.data.length;
            for(c = 0; c < len; c++){
                rep += "<tr>";
                rep += "<td>" + obj.data[c].category + "</td>";
                rep += "<td>" + obj.data[c].itemname + "</td>";
                rep += "<td>" + obj.data[c].barCode + "</td>";
                rep += "<td>" + obj.data[c].stockprice + "</td>";
                rep += "<td>" + obj.data[c].sellingprice + "</td>";
                rep += "<td>" + obj.data[c].quantity + "</td>";
                rep += "<td>" + obj.data[c].supplier + "</td>";
                rep += "<td><a onclick='createAdddItem("+ obj.data[c].id +")' class='my-link'>Add</a>";
                rep += " | <a onclick='receiveId("+ obj.data[c].id +")' class='my-link'>History</a></td>";
                //sendItemHistory(barcode)
                //receiveBarcode(code)
                rep += "</tr>";
            }
            rep = rep + "</table>";
            pages = Math.ceil(obj.count / payload)
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>StockItems " + counter + " of " + pages;
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='previous()' class='my-link'>&laquo Previous</a></h5></td>";
            rep += "<td align='right'><h5><a onclick='next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        }else{
            rep = "<p class='no-record-response'>You do not have any Stockitems</>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}

function stockItems(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stockitems/stocklist?storecode="+
        sessionStorage.getItem('storecode') + "&username="+
        sessionStorage.getItem('username') + "&start=" + start +"&size=" + size ,{
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
var id="";
var startHistory = 0;
var counterHistory = 1;
var pagesHistory = 0;
var sizeHistory = payload;

function receiveId(itemId){
    startHistory = 0;
    counterHistory = 1;
    pagesHistory = 0;
    sizeHistory = payload;
    id = itemId;
    sendItemHistory();
}
function nextHistory(){
    if(counterHistory < pagesHistory){
        startHistory += payload;
        sizeHistory += payload;
        counterHistory += 1;
    }
    sendItemHistory();
}
function previousHistory(){
    if(counterHistory > 1){
        startHistory -= payload;
        sizeHistory -= payload;
        counterHistory -= 1;
    }
    sendItemHistory();
}
async function sendItemHistory(){
    const obj = await ItemHistory();    
    if(obj.success == true){
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            pagesHistory = Math.ceil(obj.count / payload);
            rep += "<td align='left'>ItemHistory " + counterHistory + " of " + pagesHistory;
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='previousHistory()' class='my-link'>&laquo Previous</a></h5></td>";
            rep += "<td align='right'><h5><a onclick='nextHistory()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>Itemname</th>";
            rep += "<th>StockP.</th>";
            rep += "<th>SellingP.</th>";
            rep += "<th>InvoiceN.</th>";
            rep += "<th>Supplier.</th>";
            rep += "<th>DateTime</th>";            
            rep += "<th>Quantity</th>";            
            rep += "</tr>";
            var c;
            var len = obj.data.length;
            for(c = 0; c < len; c++){
                rep += "<tr>";
                rep += "<td>" + obj.data[c].itemname + "</td>";
                rep += "<td>" + obj.data[c].stockprice + "</td>";
                rep += "<td>" + obj.data[c].sellingprice + "</td>";
                rep += "<td>" + obj.data[c].invoiceNumber + "</td>";
                rep += "<td>" + obj.data[c].supplier + "</td>";
                rep += "<td>" + obj.data[c].invoiceDate;
                rep += " | " + obj.data[c].invoiceTime + "</td>";
                rep += "<td>" + obj.data[c].quantity + "</td>";                
                rep += "</tr>";
            }
            rep = rep + "</table>";
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            pagesHistory = Math.ceil(obj.count / payload);
            rep += "<td align='left'>ItemHistory " + counterHistory + " of " + pagesHistory;
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='previousHistory()' class='my-link'>&laquo Previous</a></h5></td>";
            rep += "<td align='right'><h5><a onclick='nextHistory()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        }else{
            rep = "<p class='no-record-response'>History cannot be found for the item</>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}

function ItemHistory(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stockitems/itemhistory?storecode="+ sessionStorage.getItem("storecode") 
            + "&username="+ sessionStorage.getItem("username") + "&id="+
            id +"&start="+ startHistory +"&size="+ sizeHistory ,{
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

async function sendSeachStock(){
    const obj = await searchItems();    
    if(obj.success == true){
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            pages = Math.ceil(obj.count / payload);
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            //rep += "<td align='right'><h5><a onclick='previous()' class='my-link'>&laquo Previous</a></h5></td>";
            //rep += "<td align='right'><h5><a onclick='next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>Category</th>";
            rep += "<th>Name</th>";
            rep += "<th>Code</th>";
            rep += "<th>StockP.</th>";
            rep += "<th>SellingP.</th>";
            rep += "<th>Qnty</th>";
            rep += "<th>Supplier</th>";
            rep += "<th>Action</th>";
            rep += "</tr>";
            var c;
            var len = obj.data.length;
            for(c = 0; c < len; c++){
                rep += "<tr>";
                rep += "<td>" + obj.data[c].category + "</td>";
                rep += "<td>" + obj.data[c].itemname + "</td>";
                rep += "<td>" + obj.data[c].barCode + "</td>";
                rep += "<td>" + obj.data[c].stockprice + "</td>";
                rep += "<td>" + obj.data[c].sellingprice + "</td>";
                rep += "<td>" + obj.data[c].quantity + "</td>";
                rep += "<td>" + obj.data[c].supplier + "</td>";
                rep += "<td><a onclick='createAdddItem("+ obj.data[c].id +")' class='my-link'>Add</a>";
                rep += " | <a onclick='sendItemHistory("+ obj.data[c].id +")' class='my-link'>History</a></td>";
                rep += "</tr>";
            }
            rep = rep + "</table>";
            pages = Math.ceil(obj.count / payload)
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            //rep += "<td align='right'><h5><a onclick='previous()' class='my-link'>&laquo Previous</a></h5></td>";
            //rep += "<td align='right'><h5><a onclick='next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        }else{
            rep = "<p class='no-record-response'>StockItem with the given barcode cannot be found</>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}

function searchItems(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stockitems/search?storecode="+
            sessionStorage.getItem('storecode')+"&username="+
            sessionStorage.getItem('username')+"&barcode="+document.getElementById('barcode').value,{
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

async function sendPendingUpdates(){
    const obj = await pendingUpdates();
    
    if(obj.success == true){
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            pages = Math.ceil(obj.count / payload);
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            //rep += "<td align='right'><h5><a onclick='previous()' class='my-link'>&laquo Previous</a></h5></td>";
            //rep += "<td align='right'><h5><a onclick='next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>BarCode</th>";
            rep += "<th>StockPrice</th>";
            rep += "<th>SellingPrice</th>";
            rep += "<th>Quantity</th>";
            rep += "<th>InvoiceNo</th>";
            rep += "<th>Supplier</th>";
            rep += "<th>Time</th>";            
            rep += "</tr>";
            var c;
            var len = obj.data.length;
            for(c = 0; c < len; c++){
                rep += "<tr>";
                rep += "<td>" + obj.data[c].barCode + "</td>";
                rep += "<td>" + obj.data[c].stockprice + "</td>";
                rep += "<td>" + obj.data[c].sellingprice + "</td>";
                rep += "<td>" + obj.data[c].quantity + "</td>";
                rep += "<td>" + obj.data[c].invoiceNumber + "</td>";
                rep += "<td>" + obj.data[c].supplier + "</td>";
                rep += "<td>" + obj.data[c].invoiceDate + " | " +obj.data[c].invoiceTime +"</td>";
                //rep += "<td>" + obj.data[c].supplier + " | ";                
                rep += "</tr>";
            }
            rep = rep + "</table>";
            pages = Math.ceil(obj.count / payload)
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            //rep += "<td align='right'><h5><a onclick='previous()' class='my-link'>&laquo Previous</a></h5></td>";
            //rep += "<td align='right'><h5><a onclick='next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        }else{
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}

function pendingUpdates(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stockitems/pending/updates?storecode="+
            sessionStorage.getItem('storecode')+"&username="+
            sessionStorage.getItem('username')+"&deleted=false",{
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

async function sendUpdatesHistory(){
    const obj = await updatesHistory();
    
    if(obj.success == true){
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            pages = Math.ceil(obj.count / payload);
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            //rep += "<td align='right'><h5><a onclick='previous()' class='my-link'>&laquo Previous</a></h5></td>";
            //rep += "<td align='right'><h5><a onclick='next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>BarCode</th>";
            rep += "<th>StockPrice</th>";
            rep += "<th>SellingPrice</th>";
            rep += "<th>Quantity</th>";
            rep += "<th>InvoiceNo</th>";
            rep += "<th>Supplier</th>";
            rep += "<th>Time</th>";            
            rep += "</tr>";
            var c;
            var len = obj.data.length;
            for(c = 0; c < len; c++){
                rep += "<tr>";
                rep += "<td>" + obj.data[c].barCode + "</td>";
                rep += "<td>" + obj.data[c].stockprice + "</td>";
                rep += "<td>" + obj.data[c].sellingprice + "</td>";
                rep += "<td>" + obj.data[c].quantity + "</td>";
                rep += "<td>" + obj.data[c].invoiceNumber + "</td>";
                rep += "<td>" + obj.data[c].supplier + "</td>";
                rep += "<td>" + obj.data[c].invoiceDate + " | " +obj.data[c].invoiceTime +"</td>";
                //rep += "<td>" + obj.data[c].supplier + " | ";                
                rep += "</tr>";
            }
            rep = rep + "</table>";
            pages = Math.ceil(obj.count / payload)
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            //rep += "<td align='right'><h5><a onclick='previous()' class='my-link'>&laquo Previous</a></h5></td>";
            //rep += "<td align='right'><h5><a onclick='next()' class='my-link'>Next &raquo</a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        }else{
            rep = "<p class='no-record-response'>You do not have any updates history<p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}

function updatesHistory(){
    return fetch(sessionStorage.getItem("host") + "/api/v1/stockitems/pending/updates?storecode="+
            sessionStorage.getItem('storecode')+"&username="+
            sessionStorage.getItem('username')+"&deleted=true",{
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


