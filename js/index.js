function clearSession(){
    sessionStorage.clear();
    setHost();
}
function setHost() {
    sessionStorage.setItem("host","http://SERVER:2021");
    //sessionStorage.setItem("host","http://102.130.118.167:2021");
    
    sessionStorage.setItem("url","");
    window.history.pushState({},null, sessionStorage.getItem('url'));
    NewsFeed();
}
function ReplaceUrl(){
    window.history.pushState("object or string", "Title", sessionStorage.getItem("url"));
    NewsFeed();
}
function PersonLoggin() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"personalLoggin.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function FindItem() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"findItem.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function FindIndustry() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"findIndustry.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function NewsFeed() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"newsFeed.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}

// JavaScript to toggle navbar on mobile
document.querySelector(".navbar-toggle").addEventListener("click", function() {
    const menu = document.querySelector(".navbar-links"); 
    const toggleIcon = document.querySelector(".navbar-toggle"); 
    
    menu.classList.toggle("open"); 

    // Update the icon based on the menu state
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

