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

export { createUserData, updateUserData, updateInvitee };
