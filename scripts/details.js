var API_KEY  = "7435cdf7f5a44aa6a110117181d76c6b";
var URL_ROOT = "https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/";

var params = new URLSearchParams(window.location.search.substr(1));
var itemId = params.get("itemId");

var app = new Vue({
    el: "#app",
    data: {
        itemId: itemId,
        item: {displayProperties: {}},
    },
    methods: {
        imageUrl: function(iconPath) {
            if (iconPath !== null && iconPath !== undefined) {
                return "https://www.bungie.net/" + iconPath;
            }
        },

        goBack: function() {
            window.history.back();
        }
    }
});

var url = URL_ROOT + itemId + "/";
var request = new XMLHttpRequest();

console.log("Fetching details for item " + itemId);
console.log(document.referrer);

request.open("GET", url, true);

request.setRequestHeader("X-API-KEY", API_KEY);

request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);
        console.log(response.Response);
        app.item = response.Response;
    }
};

request.onerror = function () {
    console.error("Error while making ajax request.");
    console.error("request");
};

request.send();