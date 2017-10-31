var API_KEY  = "7435cdf7f5a44aa6a110117181d76c6b";
var URL_ROOT = "https://www.bungie.net/Platform/Destiny2/Armory/Search/DestinyInventoryItemDefinition/";

var app = new Vue({
    el: "#app",
    data: {
        params: new URLSearchParams(window.location.hash.substr(1)),
        items: [],
    },
    methods: {
        submit: function(event) {
            event.preventDefault();

            var text = document.getElementById("search").value;

            window.location.hash = "#search=" + text;

            app.items = [];

            app.search(text);
        },

        search: function(searchText) {
            var url     = URL_ROOT + searchText + "/";
            var request = new XMLHttpRequest();

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
    },

    created: function() {
        var searchTerm = this.params.get("search");

        if (searchTerm === null || searchTerm === undefined) { return; }

        document.addEventListener("DOMContentLoaded", function(_event) { 
            document.getElementById("search").value = searchTerm;
            app.search(searchTerm);
        });
    }
});