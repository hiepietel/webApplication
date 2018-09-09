var geo = document.getElementById("geo");
var date = document.getElementById("date");
//var username = document.getElementById("username");
var storage = window.localStorage;
function func() {
    if (!storage.pageLoadCount) storage.pageLoadCount = 0;
    storage.pageLoadCount = parseInt(storage.pageLoadCount, 10) + 1;
    document.getElementById('count').innerHTML = "I'm happy that you visit us again. <br> it's your: " + storage.pageLoadCount + " time(s)";
    var data = new Date();
    if (!storage.yourData) storage.yourData = 0;
    date.innerHTML = "your last visit time:<br> " + storage.yourData;;
    storage.yourData = data.getDate() + "." + data.getMonth() + "." + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    if (storage.latitude && storage.longitude) {
        geo.innerHTML = "your last position:<br> Latitude: " + storage.latitude + "<br>Longitude: " + storage.longitude;
 
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}


function showPosition(position) {

    storage.latitude = position.coords.latitude;
    storage.longitude = position.coords.longitude;

    //geo.innerHTML = "Latitude: " + position.coords.latitude +
    //"<br>Longitude: " + position.coords.longitude;
}

