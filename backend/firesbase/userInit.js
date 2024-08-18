import { database } from "./config.js";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { viweUserInfoByid } from "./getUid.js";

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
  const { uid } = await viweUserInfoByid(id);

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
  const { uid, user } = await viweUserInfoByid(id);

  console.log(user);

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

async function addRandomUsers(num) {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Evan",
    "Fiona",
    "George",
    "Hannah",
    "Ian",
    "Julia",
  ];

  for (let a = 0; a < num; a++) {
    const randemNum = Math.floor(Math.random() * 1000);
    const randemID = Math.floor(Math.random() * 100000);
    const ran = randemNum % 10;
    createUserData(names[ran], randemID, randemNum, randemNum);
  }
}

export { createUserData, updateUserData, updateInvitee };
