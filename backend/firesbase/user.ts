import { database } from "./config";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export type User = {
  address: string;
  token: number;
  bestScore: number;
  invitee: number[];
};

async function createUserData(
  userTonAddress: string,
  score: number,
  token: number
) {
  const isExist = await isUserExist({ address: userTonAddress });
  if (isExist) throw new Error("User is already existed");

  const userData = {
    address: userTonAddress,
    bestScore: score,
    token: token,
    invitee: [],
  };

  const ref = await addDoc(collection(database, "doodlePlayer"), userData);
  return { uid: ref.id, data: userData };
}

async function updateUserData(id: string, score: number, token: number) {
  const { uid } = await getUser(id);

  try {
    const docRef = doc(database, "doodlePlayer", uid);
    await updateDoc(docRef, {
      bestScore: score,
      token: token,
    });

    return await getUser(id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

async function updateInvitee(id: string, newInvitee: number) {
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

async function getUserByAddress(address: string) {
  const isExist = await isUserExist({ address });

  if (isExist) {
    const usersRef = collection(database, "doodlePlayer");
    const q = query(usersRef, where("address", "==", address));
    const querySnapshot = await getDocs(q);
    const docSnap = querySnapshot.docs[0];
    return { user: docSnap.data() as User, uid: docSnap.id };
  } else {
    throw new Error("User not found!");
  }
}

type UserUnique = {
  id?: string;
  address?: string;
};

async function isUserExist(input: UserUnique) {
  const { id, address } = input;

  if (id) {
    const docRef = doc(database, "doodlePlayer", id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  } else if (address) {
    const usersRef = collection(database, "doodlePlayer");
    const q = query(usersRef, where("address", "==", address));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } else {
    throw new Error("Id or address is undefined or incorrectly");
  }
}

async function getUser(id: string) {
  const isExist = await isUserExist({ id });

  if (isExist) {
    const docRef = doc(database, "doodlePlayer", id);
    const docSnap = await getDoc(docRef);
    return { user: docSnap.data() as User, uid: docSnap.id };
  } else {
    throw new Error("User not found!");
  }
}

export {
  createUserData,
  updateUserData,
  updateInvitee,
  getUser,
  getUserByAddress,
  isUserExist,
};
