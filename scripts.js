var API_KEY  = "7435cdf7f5a44aa6a110117181d76c6b";
var URL_ROOT = "https://www.bungie.net/Platform/Destiny2/Armory/Search/DestinyInventoryItemDefinition/";

var app = new Vue({
    el: "#app",
    data: {
        items: [],
        message: "Hello vue!"
    },
    methods: {
        search: function(event) {
            event.preventDefault();

            app.items = [];

            var searchText = document.getElementById("search").value;
            var url        = URL_ROOT + searchText + "/";
            var request    = new XMLHttpRequest();

            console.log("Searching for " + searchText);

            request.open("GET", url, true);

            request.setRequestHeader("X-API-KEY", API_KEY);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var response = JSON.parse(request.responseText);
                    var results  = response.Response.results.results;

                    for (var i = 0; i < results.length; i++) {
                        app.items.push(results[i]);
                    }
                }
            };

            request.onerror = function() {
                console.error("Error while making ajax request.");
                console.error("request");
            };

            request.send();
        }
    }
});