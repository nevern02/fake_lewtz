var API_KEY = "7435cdf7f5a44aa6a110117181d76c6b";
var URL_ROOT = "https://www.bungie.net/Platform/Destiny2/Manifest/";

var app = new Vue({
  el: "#app",

  data: {
    params: new URLSearchParams(window.location.search.substr(1)),
    itemId: null,
    item: { displayProperties: {} },
    stats: []
  },

  methods: {
    imageUrl: function (iconPath) {
      if (iconPath !== null && iconPath !== undefined) {
        return "https://www.bungie.net/" + iconPath;
      }
    },

    getStat: function(hash) {
      var stat = null;

      for (var i = 0; i < app.stats.length; i++) {
        if (app.stats[i].hash === hash) {
          stat = {hash: hash, name: app.stats[i].displayProperties.name};
          break;
        }
      }

      for (var i = 0; i < app.item.investmentStats.length; i++) {
        if (app.item.investmentStats[i].statTypeHash === hash) {
          stat.value = app.item.investmentStats[i].value;
          break;
        }
      }

      return stat;
    },

    goBack: function () {
      window.history.back();
    },

    fetchStats: function() {
      for (var i = 0; i < app.item.investmentStats.length; i++) {
        if (app.item.investmentStats[i].value === 0) { continue; }

        var hash     = app.item.investmentStats[i].statTypeHash;
        var url      = URL_ROOT + "DestinyStatDefinition/" + hash + "/";
        var request  = new XMLHttpRequest();

        request.open("GET", url, true);

        request.setRequestHeader("X-API-KEY", API_KEY);

        request.onload = function(event) {
          if (event.currentTarget.status >= 200 && event.currentTarget.status < 400) {
            var response = JSON.parse(event.currentTarget.responseText);
            app.stats.push(response.Response);
          }
        };

        request.onerror = function() {
          console.error("Error whilemaking ajax request.");
          console.error(request);
        }

        request.send();
      }
    }
  },

  created: function () {
    this.itemId = this.params.get("itemId");
    var url     = URL_ROOT + "DestinyInventoryItemDefinition/" + this.itemId + "/";
    var request = new XMLHttpRequest();
    var app     = this;

    request.open("GET", url, true);

    request.setRequestHeader("X-API-KEY", API_KEY);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);
        app.item = response.Response;
        app.fetchStats();
      }
    };

    request.onerror = function () {
      console.error("Error while making ajax request.");
      console.error(request);
    };

    request.send();
  }
});
