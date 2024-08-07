import { database } from './config.js'
import { collection, query, orderBy, getDocs } from "firebase/firestore";


async function testBoard(){

    const leaderBoardInfo = [];

    const usersRef = collection(database, 'doodlePlayer');
    const q = query(usersRef, orderBy('bestScore'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data  = { 
        uid:doc.id,
        bestScore:doc.data().bestScore 
      };

      leaderBoardInfo.push(data)
      //console.log(doc.id, " => ", doc.data().bestScore);
    });

    const newdata = []

    for(let a = leaderBoardInfo.length-1; a>0; a--){
      newdata.push(leaderBoardInfo[a])
    }

    console.log(newdata);
    

    return newdata;
}

export { testBoard }