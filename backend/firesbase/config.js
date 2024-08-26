"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyDHpyaP8hQrOLYFLaMv1pVLi1Zmhyuj7BY",
    authDomain: "drift-tes.firebaseapp.com",
    projectId: "drift-tes",
    storageBucket: "drift-tes.appspot.com",
    messagingSenderId: "564630023481",
    appId: "1:564630023481:web:9f2acce326ad30cf510ce8",
};
// 初始化 Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
// 獲取資料庫引用
exports.database = (0, firestore_1.getFirestore)(app);
