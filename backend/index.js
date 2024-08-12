import express from "express";
import { createUserData, updateUserData } from "./firesbase/userInit.js";
import { viweUserInfoByid } from "./firesbase/getUid.js";
import { testBoard } from "./firesbase/leaderBoard.js";
import cors from "cors";
import { getWallet, transferJetton } from "./ton/index.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/createuser", async (req, res) => {
  const user_info = req.body;

  const [userAddress, userId, userScore, userToken] = [
    user_info.address,
    user_info.id,
    user_info.bestScore,
    user_info.token,
  ];

  console.log(userAddress, userId, userScore, userToken);

  await createUserData(userAddress, userId, userScore, userToken);

  res.send(`Create info success!`);
});

app.post("/update", async (req, res) => {
  const [id, bsetscore, token] = [
    req.body.id,
    req.body.bestScore,
    req.body.token,
  ];

  console.log(id, bsetscore, token);
  await updateUserData(id, bsetscore, token);

  res.send("data updat finish");
});

app.post("/finduser", async (req, res) => {
  const user_id = req.body.id;
  const userUid = await viweUserInfoByid(user_id);

  res.send(userUid);
});

app.get("/leaderboard", async (req, res) => {
  const leaderBoard = await testBoard();

  res.send(leaderBoard);
});

app.post("/transfer-jetton", async (req, res) => {
  try {
    const { toAddress, amount } = req.body;

    await transferJetton(toAddress, amount, process.env.JETTON_MASTER_ADDRESS);
    const wallet = await getWallet();

    res.json({
      fromAddress: wallet.address.toString(),
      toAddress: toAddress,
      amount: amount,
    });
  } catch (error) {
    console.error("Error transferring Jetton:", error);
    res.status(500).json({ error: "Failed to transfer Jetton" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
