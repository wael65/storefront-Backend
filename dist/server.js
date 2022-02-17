"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var dashRoute_1 = __importDefault(require("./handlers/dashRoute"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
app.use(body_parser_1["default"].json());
//app.all('*', verifyToken);
app.get('/', function (req, res) {
    res.send('Main Endpoint');
});
(0, users_1["default"])(app);
(0, products_1["default"])(app);
(0, orders_1["default"])(app);
(0, dashRoute_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
