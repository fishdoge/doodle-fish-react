import { database } from "./config.js";
import {
  collection,
  query,
  doc,
  getDoc,
  where,
  getDocs,
} from "firebase/firestore";

async function viweUserInfoByid(id) {
  const q = query(collection(database, "doodlePlayer"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  let user;
  let uid;
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      console.log(`User UID: ${doc.id}`);
      console.log(`User Data: `, doc.data());
      user = doc.data();
      uid = doc.id;
    });
  } else {
    console.log("No matching documents.");
  }
  return { user, uid };
}

export { viweUserInfoByid };
