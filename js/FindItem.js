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

async function findItem() {

    var continent = document.getElementById("continent").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var town = document.getElementById("town").value;
    var location = document.getElementById("location").value;
    var itemname = document.getElementById("itemname").value;
    const url = sessionStorage.getItem("host") + "/api/v1/items/filter?continent=" + continent
        + "&country=" + country + "&province=" + province + "&town=" + town
        + "&location=" + location + "&itemname=" + itemname + "&start=" + start + "&size=" + size;
    //console.log(url);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
document.getElementById('btnSearchItem').addEventListener('click', function (event) {
    event.preventDefault();
});


document.addEventListener("DOMContentLoaded", loadContinents);


async function fetchData(body) {
    const endpoint = sessionStorage.getItem("host") + "/api/v1/location/filter";


    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });



        if (!response.ok) throw new Error(`Error: ${response.statusText}`);


        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}


async function loadContinents() {
    const continentSelect = document.getElementById("continent");
    continentSelect.innerHTML = '<option value="">Select Continent</option>'; // Default option

    const continents = await fetchData({

        "continent": "",
        "country": "",
        "provice": "",
        "town": "",
        "location": ""

    });

    console.log("Continents Loaded:", continents.data);

    if (continents && continents.data && Array.isArray(continents.data)) {
        continents.data.forEach(continent => {
            const option = document.createElement("option");
            option.value = continent.continentName;
            option.textContent = continent.continentName;
            continentSelect.appendChild(option);
        });

    } else {
        console.error("No continents data available.");
    }
    return continents;
}


async function loadCountries() {
    const continent = document.getElementById("continent").value;
    const countrySelect = document.getElementById("country");
    countrySelect.innerHTML = '<option value="">Select Country</option>';
    countrySelect.disabled = false;

    console.log("continent", continent)

    if (continent) {
        const countries = await fetchData({

            "continent": continent,
            "country": "",
            "provice": "",
            "town": "",
            "location": ""
        });

        console.log("Countries Loaded:", countries.data);

        if (countries && countries.data && Array.isArray(countries.data)) {
            countries.data.forEach(country => {
                const option = document.createElement("option");
                option.value = country.countryName;
                option.textContent = country.countryName;
                countrySelect.appendChild(option);
            });
        }
    }
}

async function loadProvinces() {
    const continent = document.getElementById("continent").value;
    const country = document.getElementById("country").value;
    const provinceSelect = document.getElementById("province");
    provinceSelect.innerHTML = '<option value="">Select Province</option>'; // Default option
    provinceSelect.disabled = false;

    console.log("country :", country)

    if (country) {
        const provinces = await fetchData({
            "continent": continent,
            "country": country,
            "provice": "",
            "town": "",
            "location": ""
        });

        console.log("Provinces Loaded:", provinces.data);

        if (provinces && provinces.data && Array.isArray(provinces.data)) {
            provinces.data.forEach(province => {
                const option = document.createElement("option");
                option.value = province.provinceName;
                option.textContent = province.provinceName;
                provinceSelect.appendChild(option);
            });
        }
    }
}

async function loadTowns() {
    const continent = document.getElementById("continent").value;
    const country = document.getElementById("country").value;
    const province = document.getElementById("province").value;
    const townSelect = document.getElementById("town");
    townSelect.innerHTML = '<option value="">Select Town</option>';
    townSelect.disabled = false;


    if (province) {
        const towns = await fetchData({
            "continent": continent,
            "country": country,
            "provice": province,
            "town": "",
            "location": ""
        });

        console.log("Towns Loaded:", towns.data);

        if (towns && towns.data && Array.isArray(towns.data)) {
            towns.data.forEach(town => {
                const option = document.createElement("option");
                option.value = town.townName;
                option.textContent = town.townName;
                townSelect.appendChild(option);
            });
        }
    }
}

async function loadLocations() {
    const continent = document.getElementById("continent").value;
    const country = document.getElementById("country").value;
    const province = document.getElementById("province").value;
    const town = document.getElementById("town").value;
    const locationSelect = document.getElementById("location");
    locationSelect.innerHTML = '<option value="">Select Location</option>';
    locationSelect.disabled = false;


    console.log("town :", town)
    if (town) {
        const locations = await fetchData({
            "continent": continent,
            "country": country,
            "provice": province,
            "town": town,
            "location": ""
        });

        console.log("Locations Loaded:", locations.data);

        if (locations && locations.data && Array.isArray(locations.data)) {
            locations.data.forEach(location => {
                const option = document.createElement("option");
                option.value = location.locationName;
                option.textContent = location.locationName;
                locationSelect.appendChild(option);
            });
        }
    }
}
