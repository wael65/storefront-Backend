"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create token Validator middleware
var verifyToken = function (req, res, next) {
    try {
        if (process.env.TOKEN_SECRET) {
            var authorizationHeader = req.headers
                .authorization;
            var token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
            next();
        }
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
exports["default"] = verifyToken;
