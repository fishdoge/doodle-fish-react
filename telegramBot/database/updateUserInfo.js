import { database } from './firebaseconfig.js'
import { collection, query, updateDoc, where, getDocs, doc } from "firebase/firestore";
const keys = 'KYSRCAE872154'

// 查詢名稱為 "Frank" 的文件collection(database, "players")

async function updateDatabase(userName,score){
    const q = query(collection(database, "players"), where("name", "==", userName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log(`User ID: ${doc.id}`);
            console.log(`User Data: `, doc.data());
            // 在這裡您可以根據需求處理該文件
            // 例如，更新資料
            updateFrankData(doc.id);
        });
    } else {
        console.log("No matching documents.");
    }

    // 定義更新資料的函數
async function updateFrankData(uid) {
    const docRef = doc(database, "players", uid);

    // 使用 update 方法更新特定欄位

    await updateDoc(docRef,{
        name: 'Franklin',  // 更新名字
        score:score,
        apiKey: keys  // 更新 apiKey
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
}}

//updateDatabase("Franklin",7777777)


export { updateDatabase };