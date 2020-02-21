const cors = 'https://cors-anywhere.herokuapp.com/';
var url = 'https://mondadori.pellegrinicloud.it/menu/1582282616/0/368/3';

fetch(cors + url, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(function(data) {
        // console.log(data);
        getinfo(data);
    })
    .catch(function(err) {
        console.log(err);
    });

console.log(cors);

function getinfo(body) {
    console.log('info');


    // var x = cachedEl.querySelector(".menu-wrapper");
    //var x = body.querySelectorAll(".menu-wrapper");
    var cachedEl = document.createElement('html');
    cachedEl.innerHTML = body;
    var x = cachedEl.querySelector(".menu-wrapper");

    console.log(x);


}