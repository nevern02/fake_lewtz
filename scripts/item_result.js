var params = new URLSearchParams(window.location.search.substr(1));

Vue.component("item-result", {
    props: ["item"],
    computed: {
      detailsUrl: function () {
        return "show.html?itemId=" + this.item.hash;
      },

      imageUrl: function () {
        return "https://www.bungie.net" + this.item.displayProperties.icon;
      },
    }
});