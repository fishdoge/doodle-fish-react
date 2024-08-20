import { database } from './firebaseconfig.js'
import { collection, doc, getDocs } from "firebase/firestore";


// Add a new document in collection "cities"
async function readData(){
    const docRef = collection(database,'players')
    const docSnap = await getDocs(docRef);

    //console.log(docSnap);

    docSnap.forEach((doc)=>{
        console.log();
        console.log(doc.id)
        console.log(doc.data())
    })

}

async function searchUser(userName){
    const docRef = collection(database,'players')
    const docSnap = await getDocs(docRef);

    //console.log(userName == "Frank")

    const userData = docSnap.filter(element => element.data().name === userName);

    console.log(userData)

    return userData;
}

searchUser("Frank")
