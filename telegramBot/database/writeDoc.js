import { database } from './firebaseconfig.js'
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { viweUserInfoByTelegramID } from './getUid.js'


// Add a new document in collection "cities"
async function writeUserData(name,telegramID){
    const state = await viweUserInfoByTelegramID(telegramID);
    if(state != null){
        return null;
    }

    const userData = {
        name: name,
        telegramID:telegramID,
        score:5000,
    };

   // Add a new document in collection "cities"
    await addDoc(collection(database, "players"),userData)
    .then(
        console.log("user data, ",userData)
    );
}


async function updateScore(telegramID,score){
    const uid = await viweUserInfoByTelegramID(telegramID);

    const docRef = doc(database, "players", uid);
    await updateDoc(docRef,{
        score:score,
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
}


//await writeUserData("Facker",87878787878777)

export { writeUserData, updateScore }