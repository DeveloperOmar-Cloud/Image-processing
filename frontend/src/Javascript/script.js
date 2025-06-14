var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var uploadForm = document.getElementById("uploadForm");
var fileInput = document.getElementById("fileInput");
var uploadWidthInput = document.getElementById("uploadWidthInput");
var uploadHeightInput = document.getElementById("uploadHeightInput");
var filenameInput = document.getElementById("filenameInput");
var galleryContainer = document.getElementById("gallery");
var resizeForm = document.getElementById("resizeForm");
var resizeWidthInput = document.getElementById("resizeWidthInput");
var resizeHeightInput = document.getElementById("resizeHeightInput");
var selectedImageNameSpan = document.getElementById("selectedImageName");
var resizedImageUrlSpan = document.getElementById("resizedImageUrl");
var selectedImage = null;
var loadGallery = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, files, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/uploads")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                files = _a.sent();
                if (!galleryContainer)
                    return [2 /*return*/];
                galleryContainer.innerHTML = "";
                files.forEach(function (file) {
                    var wrapper = document.createElement("div");
                    wrapper.className = "thumbnail-wrapper";
                    var img = document.createElement("img");
                    img.src = "http://localhost:3000/uploads/".concat(file);
                    img.alt = file;
                    img.className = "thumbnail";
                    if (selectedImage === file)
                        img.classList.add("selected");
                    img.addEventListener("click", function () {
                        selectedImage = file;
                        document.querySelectorAll(".thumbnail").forEach(function (el) {
                            return el.classList.remove("selected");
                        });
                        img.classList.add("selected");
                        if (selectedImageNameSpan) {
                            selectedImageNameSpan.textContent = file;
                        }
                    });
                    var caption = document.createElement("div");
                    caption.textContent = file;
                    caption.style.fontSize = "12px";
                    wrapper.appendChild(img);
                    wrapper.appendChild(caption);
                    galleryContainer.appendChild(wrapper);
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error loading gallery:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
if (uploadForm) {
    uploadForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
        var file, filename, width, height, formData, response, text, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!((_a = fileInput === null || fileInput === void 0 ? void 0 : fileInput.files) === null || _a === void 0 ? void 0 : _a.length) || !uploadWidthInput || !uploadHeightInput || !filenameInput) {
                        alert("Please fill out all fields and select a file.");
                        return [2 /*return*/];
                    }
                    file = fileInput.files[0];
                    filename = filenameInput.value.trim();
                    width = parseInt(uploadWidthInput.value.trim(), 10);
                    height = parseInt(uploadHeightInput.value.trim(), 10);
                    if (!filename || filename.length > 40) {
                        alert("Invalid filename. Max 40 characters allowed.");
                        return [2 /*return*/];
                    }
                    if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
                        alert("Width and height must be positive integers.");
                        return [2 /*return*/];
                    }
                    formData = new FormData();
                    formData.append("file", file);
                    formData.append("filename", filename);
                    formData.append("width", width.toString());
                    formData.append("height", height.toString());
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:3000/multer", {
                            method: "POST",
                            body: formData,
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    text = _b.sent();
                    if (response.ok) {
                        alert("✅ " + text);
                        loadGallery();
                    }
                    else {
                        alert("❌ Upload failed: " + text);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.error(error_2);
                    alert("❌ Error uploading file.");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
if (resizeForm) {
    resizeForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
        var width, height, url, response, errorText, data, fullUrl, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!selectedImage || !resizeWidthInput || !resizeHeightInput) {
                        alert("Please select an image and enter new dimensions.");
                        return [2 /*return*/];
                    }
                    width = parseInt(resizeWidthInput.value.trim(), 10);
                    height = parseInt(resizeHeightInput.value.trim(), 10);
                    if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
                        alert("Width and height must be positive integers.");
                        return [2 /*return*/];
                    }
                    url = "http://localhost:3000/api/sharp?filename=".concat(encodeURIComponent(selectedImage), "&width=").concat(width, "&height=").concat(height);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.text()];
                case 3:
                    errorText = _a.sent();
                    throw new Error(errorText);
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _a.sent();
                    if (resizedImageUrlSpan) {
                        fullUrl = "http://localhost:3000".concat(data.url);
                        resizedImageUrlSpan.innerHTML = "<a href=\"".concat(fullUrl, "\" target=\"_blank\">").concat(fullUrl, "</a>");
                    }
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    alert("❌ Failed to resize image.");
                    console.error("Resize error:", err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
}
loadGallery();
