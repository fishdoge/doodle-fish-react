import { database } from "./config.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

async function createUserData(userTonAddress, userId, score, token) {
  const userData = {
    address: userTonAddress,
    id: userId,
    bestScore: score,
    token: token,
    invitee: [],
  };

  await addDoc(collection(database, "doodlePlayer"), userData);
  console.log("user data, ", userData);
  return userData;
}

async function updateUserData(id, score, token) {
  const { uid } = await getUser(id);

  try {
    const docRef = doc(database, "doodlePlayer", uid);
    await updateDoc(docRef, {
      bestScore: score,
      token: token,
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

async function updateInvitee(id, newInvitee) {
  const { uid, user } = await getUser(id);

  const docRef = doc(database, "doodlePlayer", uid);
  let updatedInviteeArray = [];
  if (user.invitee && Array.isArray(user.invitee)) {
    updatedInviteeArray = [...user.invitee, newInvitee];
  } else {
    updatedInviteeArray = [newInvitee];
  }
  await updateDoc(docRef, {
    invitee: updatedInviteeArray,
  });
}

async function getUser(id) {
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

export { createUserData, updateUserData, updateInvitee, getUser };
