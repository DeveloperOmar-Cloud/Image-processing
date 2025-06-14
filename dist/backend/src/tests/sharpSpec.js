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
const fs_1 = __importDefault(require("fs"));
const sharp_1 = require("../routes/api/sharp");
describe("image processing", () => {
    const height = 200;
    const width = 200;
    const path = `D:/0 - Programming/ImageProcessing/backend/src/data/200x200.jpg`;
    it(`creates the resized image ${height}x${width}`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, sharp_1.processImg)();
        expect(fs_1.default.existsSync(path)).toBeTrue();
        if (fs_1.default.existsSync(path)) {
            fs_1.default.unlinkSync(path);
        }
    }));
});
