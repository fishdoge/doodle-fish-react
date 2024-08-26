import { database } from "./config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import type { User } from "./user";

type LeaderBoardData = {
  uid: string;
  bestScore: number;
};

type TokenLeaderBoardData = {
  uid: string;
  token: number;
};

export async function getBoard() {
  const leaderBoard: LeaderBoardData[] = [];

  const usersRef = collection(database, "doodlePlayer");
  const q = query(usersRef, orderBy("bestScore", "desc"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) console.log("Empty!!");

  querySnapshot.forEach((doc) => {
    const data = {
      uid: doc.id,
      bestScore: doc.data().bestScore as number,
      token: doc.data().token as number,
    };

    leaderBoard.push(data);
  });

  return leaderBoard;
}

export async function getInviteBoard() {
  const inviteLeaderBoard: { uid: string; user: User }[] = [];

  const usersRef = collection(database, "doodlePlayer");
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) console.log("Empty!!");

  querySnapshot.forEach((doc) => {
    const data = {
      uid: doc.id,
      user: doc.data() as User,
    };

    inviteLeaderBoard.push(data);
  });

  // Sort by the length of the invitee array in descending order
  inviteLeaderBoard.sort(
    (a, b) => b.user.invitee.length - a.user.invitee.length
  );

  return inviteLeaderBoard;
}

export async function getTokenRewardBoard(){
  const tokenRewardBoard: TokenLeaderBoardData[] = [];

  const usersRef = collection(database, "doodlePlayer");
  const q = query(usersRef, orderBy("token", "desc"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) console.log("Empty!!");

  querySnapshot.forEach((doc) => {
    const data = {
      uid: doc.id,
      token: doc.data().token as number,
    };

    tokenRewardBoard.push(data);
  });

  return tokenRewardBoard;
}





