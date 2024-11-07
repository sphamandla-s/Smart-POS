function viewStore(id) {
    sessionStorage.setItem("storecode", id);
    var redirectWindow = window.open('viewStore.html', '_self');
}

var tmp = 1;
var payload = 10;
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
    await filterNewsFeed();
}
async function Previous() {
    //counter = counter + tmp;
    if (counter > 0) {
        start = start - payload;
        size = size - payload;
        counter = counter - tmp;
    }
    console.log("counter : " + counter + " on next start: " + start + " size: " + size + "pages: " + pages);
    await filterNewsFeed();
}
async function filterNewsFeed() {
    document.getElementById("main-container").innerHTML = `
    <div class="loader-container">
        <div class="loader"></div>
    </div>`; 
    const obj = await fetchNewsFeed();
    //console.log(obj);
    var rep = "";
    if (obj.success = true) {
        if (obj.count > 0) {
            pages = Math.ceil(obj.count / payload)
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            var a = counter + tmp;
            rep += "<td align='left'>NewsFeed Page " + a + " of " + pages;
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
            for (c = 0; c < len; c++) {
                if (obj.data[c].title != null && obj.data[c].title != 'undefined') {
                    if (row > 2) {
                        rep += "</tr><tr>";
                        row = 0;
                    }
                    rep += "<td align='center'><b>" + obj.data[c].title;
                    rep += "</b><br/>" + obj.data[c].description;
                    rep += "<br/><a onclick='viewStore(" + obj.data[c].storecode + ");' style='cursor: pointer; cursor: hand; color: blue;'>View</a>";
                    row++;
                }
            }
            rep += "</tr>";
            rep += "</table>";
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
    } else {
        rep = "<p class=no-record-response>Internal Server error occured</p>";
        document.getElementById("main-container").innerHTML = rep;
    }
}
function fetchNewsFeed() {
    var continent = document.getElementById("continent").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var town = document.getElementById("town").value;
    var location = document.getElementById("location").value;
    var obj = {
        continent: continent,
        country: country,
        province: province,
        town: town,
        location: location
    }
    var tojson = JSON.stringify(obj);
    //console.log(tojson);
    const url = sessionStorage.getItem("host") + "/api/v1/newsfeed/filter?continent=" + continent +
        "&country=" + country + "&province=" + province + "&town=" + town +
        "&location=" + location + "&start=" + start + "&size=" + size;
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
