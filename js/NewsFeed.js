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
    let rep = "";
    if (obj.success) {
        if (obj.count > 0) {
            let pages = Math.ceil(obj.count / payload);
            let pageInfo = `<div class="pagination">
                <span>NewsFeed Page ${counter + tmp} of ${pages}</span>
                <div class="page-controls">
                    <a onclick="Previous()" class="my-link">&laquo; Previous</a>
                    <a onclick="Next()" class="my-link">Next &raquo;</a>
                </div>
            </div>`;

            rep += pageInfo;
            rep += "<div class='cards'>";
            obj.data.forEach(item => {
                if (item.title) {
                    rep += `<div class='card'>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a onclick="viewStore(${item.storecode})" class="view-link">View</a>
                    </div>`;
                }
            });
            rep += "</div>";
            rep += pageInfo;
            document.getElementById("main-container").innerHTML = rep;
        } else {
            rep = "<p class='no-record-response'>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    } else {
        rep = "<p class='no-record-response'>Internal Server error occurred</p>";
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
