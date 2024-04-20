"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config({ path: "./config.env" });
const app = (0, express_1.default)();
const port = 3005;
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose_1.default
    .connect(DB)
    .then(() => console.log("資料庫連線成功"));
app.use(express_1.default.json());
app.use('/', user_1.default);
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.status(404);
    res.send(JSON.stringify({
        status: "false",
        message: "抱歉你的頁面找不到",
    }));
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.send("網頁發生問題，請稍後再試");
});
app.listen(port, () => {
    console.log(`伺服器已經啟動於http://localhost:${port}`);
});
