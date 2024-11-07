window.history.pushState("object or string", "Title", sessionStorage.getItem("url"));
function ReplaceUrl(){
    
    NewsFeed();
}
function Ordering() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"ordering.html\" name=\"iframe_index\"\n" +
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
function Messages() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"messages.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function MyStores() {
    var myStoreFrame = "<iframe allowfullscreen class=\"responsive-iframe\" src=\"myStores.html\" name=\"iframe_index\"\n" +
        "            title=\"SmartPOS | MkokoComputers\"></iframe>";
    document.getElementById('frame-container').innerHTML = myStoreFrame;
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function Home(){
    var myStoreFrame = "<iframe src=\"personalIndex.html\" scrolling=\"yes\" height=\"78%\" width=\"96%\"\n" +
        "            name=\"iframe_index\" title=\"SmartPOS\" style=\"display: block;\"></iframe>";
    document.getElementById('for-frame').innerHTML = myStoreFrame;
}
function MyOrders(){
    var myStoreFrame = "<iframe src=\"ordering.html\" scrolling=\"yes\" height=\"78%\" width=\"96%\"\n" +
        "            name=\"iframe_index\" title=\"SmartPOS\" style=\"display: block;\"></iframe>";
    document.getElementById('for-frame').innerHTML = myStoreFrame;
}
function MyBucket(){
    var myStoreFrame = "<iframe src=\"myBucket.html\" scrolling=\"yes\" height=\"78%\" width=\"96%\"\n" +
        "            name=\"iframe_index\" title=\"SmartPOS\" style=\"display: block;\"></iframe>";
    document.getElementById('for-frame').innerHTML = myStoreFrame;
    document.getElementById("navbarNavDropdown").style.overflow = "hidden";
}
function logout() {
    console.log("before loggin out:" + sessionStorage.getItem("emailcell"));
    localStorage.removeItem("emailcell");
    localStorage.removeItem("password");
    console.log("after loggin out:" + sessionStorage.getItem("emailcell"));
    var redirectWindow = window.open("../index.html", '_self');
}
function findPerson() {
    var xhttp = new XMLHttpRequest();
    var url = sessionStorage.getItem("host") + "/api/v1/person/find/emailcell?emailcell="+
        sessionStorage.getItem("emailcell");
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            var response = xhttp.responseText;
            var obj = JSON.parse(response);
            if (obj.success == true) {
                //alert("I am happy");
                var name = obj.data.firstname;
                document.getElementById("person").value = name;
            } else {
                document.getElementById("main-container").innerHTML = "<p align='center'>Incorrect Loggin details</p>";
            }
        }else{
            var rep = "Status: " + obj.status + "</br>Code :" + obj.error;
            document.getElementById("main-container").innerHTML = rep;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
