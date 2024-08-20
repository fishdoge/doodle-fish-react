import { database } from "./config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

type User = {
  address: string;
  id: number;
  token: number;
  bestScore: number;
  invitee: number[];
};

async function createUserData(
  userTonAddress: string,
  userId: number,
  score: number,
  token: number
) {
  const userData = {
    address: userTonAddress,
    id: userId,
    bestScore: score,
    token: token,
    invitee: [],
  };

  await addDoc(collection(database, "doodlePlayer"), userData);
  return userData;
}

async function updateUserData(id: number, score: number, token: number) {
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

async function updateInvitee(id: number, newInvitee: number) {
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

async function getUser(id: number) {
  const q = query(collection(database, "doodlePlayer"), where("id", "==", id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]; // Get the first document
    return { user: doc.data() as User, uid: doc.id };
  } else {
    throw new Error("User not found!");
  }
}

export { createUserData, updateUserData, updateInvitee, getUser };
