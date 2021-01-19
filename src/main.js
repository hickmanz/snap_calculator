"use strict";
exports.__esModule = true;
require("@/scss/global.scss");
require("vue-select/src/scss/vue-select.scss");
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var store_1 = require("./store");
var vuetify_1 = require("./plugins/vuetify");
vue_1["default"].config.productionTip = false;
new vue_1["default"]({
    router: router_1["default"],
    store: store_1["default"],
    vuetify: vuetify_1["default"],
    render: function (h) { return h(App_vue_1["default"]); }
}).$mount('#app');
