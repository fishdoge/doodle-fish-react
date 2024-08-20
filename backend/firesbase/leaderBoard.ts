import { database } from "./config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

type LeaderBoardData = {
  uid: string;
  bestScore: number;
};

export async function testBoard() {
  const leaderBoard: LeaderBoardData[] = [];

  const usersRef = collection(database, "doodlePlayer");
  const q = query(usersRef, orderBy("bestScore"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = {
      uid: doc.id,
      bestScore: doc.data().bestScore as number,
    };

    leaderBoard.push(data);
    //console.log(doc.id, " => ", doc.data().bestScore);
  });

  const newdata = [];

  for (let a = leaderBoard.length - 1; a > 0; a--) {
    newdata.push(leaderBoard[a]);
  }
  return newdata;
}
