window.history.pushState({},null, sessionStorage.getItem('url'));
function Users() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"systemUsers.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function Banking() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"banking.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function Reports() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"reports.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function syncronise() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"syncronise.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function StoreMessages() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"storeMessages.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function Orders() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"orders.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function Settings() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"settings.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function StockItems() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"stockitems.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function Home() {
    var myStoreFrame = "<iframe src=\"wallpaper.html\" scrolling=\"yes\" height=\"78%\" width=\"96%\"\n" +
        "            name=\"iframe_index\" title=\"SmartPOS\" style=\"display: block;\"></iframe>";
    document.getElementById('for-frame').innerHTML = myStoreFrame;
}
function logout() {
    localStorage.removeItem("storecode");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    var redirectWindow = window.open("../index.html", '_self');
}

document.querySelector(".navbar-toggle").addEventListener("click", function() {
    const menu = document.querySelector(".navbar-links"); 
    const toggleIcon = document.querySelector(".navbar-toggle"); 
    
    menu.classList.toggle("open"); 

    if (menu.classList.contains("open")) {
        toggleIcon.innerHTML = "&times;";
    } else {
        toggleIcon.innerHTML = "&#9776;";
    }
});

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(link => link.classList.remove('active')); 
        this.classList.add('active'); 
    })
});