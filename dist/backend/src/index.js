"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const multer_1 = __importDefault(require("./routes/api/multer"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use("/api", index_1.default);
app.use("/multer", multer_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/src")));
app.use((err, req, res) => {
    console.error("Global error handler:", err);
    res.status(500).send("Internal server error");
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
