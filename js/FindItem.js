function viewStore(id) {
    sessionStorage.setItem("storecode", id);
    //console.log(id);
    var redirectWindow = window.open('viewStore.html', '_self');
}
var tmp = 1;
var payload = 30;
var pages;
var start = 0;
var size = payload;
var counter = 0;
async function Next() {
    //counter = counter + tmp;
    if (counter < pages - 1) {
        start = start + payload;
        size = size + payload;
        counter = counter + tmp;
    }
    console.log("counter : " + counter + " on next start: " + start + " size: " + size + "pages: " + pages);
    await sendFindItem();
}
async function Previous() {
    //counter = counter + tmp;
    if (counter > 0) {
        start = start - payload;
        size = size - payload;
        counter = counter - tmp;
    }
    console.log("counter : " + counter + " on next start: " + start + " size: " + size + "pages: " + pages);
    await sendFindItem();
}
async function sendFindItem() {
    document.getElementById("main-container").innerHTML = `
    <div class="loader-container">
        <div class="loader"></div>
    </div>`;

    const obj = await findItem();
    let rep = "";

    if (obj.success === true) {
        const pages = Math.ceil(obj.count / payload);
        const a = counter + tmp;

        let pageInfo = `<div class="pagination">
        <span>FindItem Page ${counter + tmp} of ${pages}</span>
        <div class="page-controls">
            <a onclick="Previous()" class="my-link">&laquo; Previous</a>
            <a onclick="Next()" class="my-link">Next &raquo;</a>
        </div>
    </div>`;
        rep += pageInfo

        rep += `<div class="cards">`;

        obj.data.forEach(item => {
            if (item.itemname && item.sellingprice !== 'undefined') {
                rep += `
                <div class="card">
                    <h3>${item.itemname}</h3>
                    <p>Price ZAR: ${item.sellingprice}</p>
                    <p>In Stock: ${item.quantity}</p>
                    <a onclick="viewStore(${item.storeCode})" class="view-link">View Store</a>
                </div>`;
            }
        });

        rep += `</div>`;

        rep += pageInfo

        document.getElementById("main-container").innerHTML = rep;
    } else {
        rep = "<p class='no-record-response'>No record found</p>";
        document.getElementById("main-container").innerHTML = rep;
    }
}

function findItem() {

    var continent = document.getElementById("continents").value;
    var country = document.getElementById("countries").value;
    var province = document.getElementById("provinces").value;
    var town = document.getElementById("towns").value;
    var location = document.getElementById("locations").value;
    var itemname = document.getElementById("itemname").value;
    const url = sessionStorage.getItem("host") + "/api/v1/items/filter?continent=" + continent
        + "&country=" + country + "&province=" + province + "&town=" + town
        + "&location=" + location + "&itemname=" + itemname + "&start=" + start + "&size=" + size;
    //console.log(url);
    return fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("error:", error.message);
        })
}
document.getElementById('btnSearchItem').addEventListener('click', function (event) {
    event.preventDefault();
});
