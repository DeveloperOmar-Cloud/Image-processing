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
const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
if (uploadForm && fileInput && widthInput && heightInput) {
    uploadForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!fileInput.files || fileInput.files.length == 0) {
            return alert("Please select a file");
        }
        const file = fileInput.files[0];
        const width = widthInput.value;
        const height = heightInput.value;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("width", width);
        formData.append("height", height);
        try {
            const response = yield fetch("http://localhost:3000/multer", {
                method: "POST",
                body: formData,
            });
            console.log("Response status:", response.status);
            const text = yield response.text();
            console.log("Server response txt:", text);
            if (response.ok) {
                alert(text);
            }
            else {
                alert("Upload failed!");
            }
        }
        catch (err) {
            console.error("Fectch threw error", err);
            alert("Error uploading file.");
        }
    }));
}
