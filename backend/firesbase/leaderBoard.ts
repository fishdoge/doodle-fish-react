import { database } from "./config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

type LeaderBoardData = {
  uid: string;
  bestScore: number;
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
    };

    console.log(data);

    leaderBoard.push(data);
  });

  return leaderBoard;
}
