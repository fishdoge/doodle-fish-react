import { doc, deleteDoc, collection } from "firebase/firestore";
import { viweUserInfoByTelegramID } from '../database/getUid.js'
import { database } from "./firebaseconfig.js";


async function deleteUser(userTelegramID){
    const userUid = await viweUserInfoByTelegramID(userTelegramID);
    await deleteDoc(doc(database, "players", userUid));
}



export { deleteUser }