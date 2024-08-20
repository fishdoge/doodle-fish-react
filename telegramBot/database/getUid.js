import { database } from './firebaseconfig.js'
import { collection, query, doc, getDoc, where, getDocs } from "firebase/firestore";

// 查詢名稱為 "Frank" 的文件collection(database, "players")

async function viweUserInfoByName(userName){
    const q = query(collection(database, "players"), where("name", "==", userName));
    const querySnapshot = await getDocs(q);
    let uid;
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log(`User UID: ${doc.id}`);
            console.log(`User Data: `, doc.data());
            uid = doc.id;
        });
    } else {
        console.log("No matching documents.");
    }
    return uid;
}

async function viweUserInfoByTelegramID(TelegramID){
    const q = query(collection(database, "players"), where("telegramID", "==", TelegramID));
    const querySnapshot = await getDocs(q);
    let uid = null;
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log(`User UID: ${doc.id}`);
            console.log(`User Data: `, doc.data());
            uid = doc.id;
        });

    } else {
        console.log("No matching documents.");
    }

    return uid;
}

async function getUserInfo(uid){
    const docRef = doc(database, "players", uid);
    const docSnap = await getDoc(docRef);

    //console.log(docSnap.data());

    return docSnap.data();
}



export {viweUserInfoByName, viweUserInfoByTelegramID, getUserInfo};