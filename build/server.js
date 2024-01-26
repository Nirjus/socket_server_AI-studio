"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const secret_1 = require("./secret/secret");
app_1.server.listen(secret_1.port, () => {
    console.log(`socket server running on http://localhost:${secret_1.port}`);
});
