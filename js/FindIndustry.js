function viewStore(id) {
    sessionStorage.setItem("storecode", id);
    var redirectWindow = window.open('viewStore.html', '_self');
}

async function sendFilterIndustry() {
    document.getElementById("main-container").innerHTML = `
    <div class="loader-container">
        <div class="loader"></div>
    </div>`;

    const obj = await filterIndustry();
    let rep = "";

    if (obj.success === true) {
        if (obj.count > 0) {
            let pages = Math.ceil(obj.count / payload);
            let pageInfo = `<div class="pagination">
                <span>FindStore Page ${counter + tmp} of ${pages}</span>
                <div class="page-controls">
                    <a onclick="Previous()" class="my-link">&laquo; Previous</a>
                    <a onclick="Next()" class="my-link">Next &raquo;</a>
                </div>
            </div>`;
            rep += pageInfo
            rep += `<div class="cards">`;

            obj.data.forEach((industry) => {
                rep += `
                <div class="card">
                    <h4>${industry.name}</h4>
                    <h6>(${industry.counter})</h6>
                </div>`;
            });

            rep += `</div>`;
            document.getElementById("main-container").innerHTML = rep;
        } else {
            document.getElementById("main-container").innerHTML = "<p class='no-record-response'>No record found</p>";
        }
    } else {
        rep = `<p class='no-record-response'>Success: ${obj.success} Code: ${obj.code}<br>Error Message: ${obj.data}</p>`;
        document.getElementById("main-container").innerHTML = rep;
    }
}

function filterIndustry(){
    var continent = document.getElementById("continent").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var town = document.getElementById("town").value;
    var location = document.getElementById("location").value;
    const url = sessionStorage.getItem("host") + "/api/v1/settings/pojo/industries/summary/filter?continent="+ continent
            +"&country="+ country +"&province="+ province +"&town="+ town +"&location="+ location;
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

var tmp=  1;
var payload = 6;
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
    await sendListFilterIndustry();
}
async function Previous() {
    //counter = counter + tmp;
    if(counter > 0){
        start = start - payload;
        size = size - payload;
        counter = counter - tmp;
    }
    console.log("counter : "+ counter +" on next start: "+ start + " size: "+ size +"pages: "+ pages);
    await sendListFilterIndustry();
}

async function sendListFilterIndustry(){
    document.getElementById("main-container").innerHTML = "<p class=no-record-response>Processing....</p>";
    const obj = await filterListIndustry();      
    if(obj.success == true){
        if(obj.count > 0){                
                pages = Math.ceil(obj.count / payload);
                rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counter + tmp;
                rep += "<td align='left'>List Industry Page " + a + " of " + pages;
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
                    if(obj.data[c].logo != null && obj.data[c].logo != 'undefined'){
                        if(row > 2){
                            rep += "</tr><tr>";
                            row = 0;
                        }                        
                        rep += "<td align='center'><img src='"+ obj.data[c].logo +"' alt='photo' width='170px' height='200px'>";
                        rep += "<br/><b>" + obj.data[c].storeName ;
                        rep += "<br/></b>"
                        rep +=  obj.data[c].addressOne;
                        rep += "<br/>" +  obj.data[c].addressTwo;
                        rep += " | " +  obj.data[c].addressThree;
                        rep += "<br/>" +  obj.data[c].phone;
                        rep += " | "  +  obj.data[c].email;
                        rep += "<br/>";
                        rep +="<a onclick='viewStore("+obj.data[c].id+");' style='cursor: pointer; cursor: hand; color: blue;'>View Store</a>";
                        rep += "</td>";
                        row++;
                    }
                }
                rep += "</tr>";
                rep += "</table>";                
                pages = Math.ceil(obj.count / payload);
                rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
                rep += "<tr>";
                var a = counter + tmp;
                rep += "<td align='left'>List Industry Page " + a + " of " + pages;
                rep += "<td align='left'></td>";
                rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>&laquo Previous</a></h5></td>";
                rep += "<td align='right'><h5><a onclick='Next()' class='my-link'>Next &raquo</a></h5></td>";
                rep += "</tr>";
                document.getElementById("main-container").innerHTML = rep;
            } else {
                rep = "<p class=no-record-response>No record found</p>";
                document.getElementById("main-container").innerHTML = rep;
            }        
        } else {
        rep = "<p class=no-record-response>Success: " + obj.success + " Code: " + obj.code + "</br>Error Message: " + obj.data+"</p>";
        document.getElementById("main-container").innerHTML = rep;
    }
        
        
}
function filterListIndustry(){
    var continent = document.getElementById("continent").value;
    var country = document.getElementById("country").value;
    var province = document.getElementById("province").value;
    var town = document.getElementById("town").value;
    var location = document.getElementById("location").value;
    const url = sessionStorage.getItem("host") + "/api/v1/stores/filter?start="+ start 
            +"&size="+ size +"&continent="+ continent +"&country="+ country 
            +"&province="+ province +"&town="+ town +"&location="+location;
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