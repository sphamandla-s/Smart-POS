function viewStore(id) {
    sessionStorage.setItem("storecode", id);
    //console.log(id);
    var redirectWindow = window.open('viewStore.html', '_self');
}
var tmp=  1;
var payload = 30;
var pages;
var start = 0;
var size = payload;
var counter = 0;
async function Next() {
    //counter = counter + tmp;
    if(counter < pages - 1){
        start = start + payload;
        size = size + payload;
        counter = counter + tmp;
    }
    console.log("counter : "+ counter +" on next start: "+ start + " size: "+ size +"pages: "+ pages);
    await sendFindItem();
}
async function Previous() {
    //counter = counter + tmp;
    if(counter > 0){
        start = start - payload;
        size = size - payload;
        counter = counter - tmp;
    }
    console.log("counter : "+ counter +" on next start: "+ start + " size: "+ size +"pages: "+ pages);
    await sendFindItem();
}
async function sendFindItem(){
    document.getElementById("main-container").innerHTML = `
    <div class="loader-container">
        <div class="loader"></div>
    </div>`;     const obj = await findItem();   
    //console.log(obj);
    var rep = "";
    if (obj.success == true) {
                pages = Math.ceil(obj.count / payload);
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counter + tmp;
                rep += "<td align='left'>FindItem Page " + a + " of " + pages;
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
                        //rep += "<td align='center'><img src='"+ obj.data[c].picture +"' alt='photo' width='150px' height='180px'>";
                        rep += "<td align='center'><b>" + obj.data[c].itemname + "</b><br/>" ;
                        rep += "Price ZAR: " +  obj.data[c].sellingprice;
                        rep += " | In Stock: " +  obj.data[c].quantity;
                        rep += "<br/>";
                        rep +="<a onclick='viewStore("+obj.data[c].storeCode+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a></td>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";
                pagesAll = Math.ceil(obj.count / payload)
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counter + tmp;
                rep += "<td align='left'>Page " + a + " of " + pages;
                rep += "<td align='left'></td>";
                rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>&laquo Previous</a></h5></td>";
                rep += "<td align='right'><h5><a onclick='Next()' class='my-link'>Next &raquo</a></h5></td>";
                rep += "</tr>";
                rep += "</table>";
                document.getElementById("main-container").innerHTML = rep;
            } else {
                rep = "<p class=no-record-response>No record found</p>";
                document.getElementById("main-container").innerHTML = rep;
            }
    
}
function findItem(){    
    
    var continent = document.getElementById("continents").value;
    var country = document.getElementById("countries").value;
    var province = document.getElementById("provinces").value;
    var town = document.getElementById("towns").value;
    var location = document.getElementById("locations").value;
    var itemname = document.getElementById("itemname").value;   
    const url = sessionStorage.getItem("host") + "/api/v1/items/filter?continent="+ continent
            +"&country="+ country +"&province="+ province +"&town="+ town
            +"&location="+ location +"&itemname="+ itemname +"&start="+ start +"&size="+ size;
    //console.log(url);
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
document.getElementById('btnSearchItem').addEventListener('click', function (event){
        event.preventDefault();
    });
