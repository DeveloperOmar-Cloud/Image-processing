"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDirectory = "D:/0 - Programming/ImageProcessing/backend/uploads";
const jpg = "D:/0 - Programming/ImageProcessing/backend/src/data/input.jpg";
const testImgPath = path_1.default.join(__dirname, "testimg.jpg");
describe("image proccessing test", () => {
    it("should create a jpg and upload it", () => __awaiter(void 0, void 0, void 0, function* () {
        if (fs_1.default.existsSync(jpg) == false) {
            console.log("404 - JPG not found");
        }
        const data = fs_1.default.readFileSync(jpg);
        fs_1.default.writeFileSync(testImgPath, data);
        const res = yield (0, supertest_1.default)(index_1.default).post("/multer").attach("file", testImgPath);
        expect(res.status).toBe(200);
        const uploadedFiles = fs_1.default.readdirSync(uploadDirectory);
        expect(uploadedFiles.length).toBeGreaterThan(0);
        const uploadedFile = uploadedFiles[0];
        expect(uploadedFile.endsWith(".jpg")).toBeTrue;
    }));
});
