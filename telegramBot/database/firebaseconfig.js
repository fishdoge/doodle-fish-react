import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDHpyaP8hQrOLYFLaMv1pVLi1Zmhyuj7BY",
    authDomain: "drift-tes.firebaseapp.com",
    projectId: "drift-tes",
    storageBucket: "drift-tes.appspot.com",
    messagingSenderId: "564630023481",
    appId: "1:564630023481:web:9f2acce326ad30cf510ce8"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 獲取資料庫引用
const database = getFirestore(app);

export { database };
