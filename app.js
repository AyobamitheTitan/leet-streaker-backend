"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./routes/user_router"));
const leet_router_1 = __importDefault(require("./routes/leet_router"));
const dotenv_1 = require("dotenv");
const connect_1 = __importDefault(require("./connect"));
const auth_1 = __importDefault(require("./middleware/auth"));
const errorHandler_1 = __importDefault(require("./error/errorHandler"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
app.get("/", (req, res) => {
    res.status(200).json({ application: "leet-streaker" });
});
const PORT = process.env.PORT;
app.use("/api/v1", user_router_1.default);
app.use((req, res, next) => (0, auth_1.default)(req, res, next));
app.use("/api/leet", leet_router_1.default);
app.listen(PORT, () => {
    (0, connect_1.default)()
        .then(() => {
        console.log("Successfully conected to the database");
    })
        .catch((e) => {
        console.log(e);
    });
    console.log("live on port ", PORT);
});
app.use(errorHandler_1.default);
