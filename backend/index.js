import express from "express";
import {
  createUserData,
  updateUserData,
  updateInvitee,
} from "./firesbase/userInit.js";
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

  const [userAddress, userId, userScore, userToken, inviterId] = [
    user_info.address, // ton address
    user_info.id, //? id
    user_info.bestScore,
    user_info.token, // token amount
    user_info.inviterId,
  ];

  const userData = await createUserData(
    userAddress,
    userId,
    userScore,
    userToken
  );

  if (inviterId) await updateInvitee(inviterId, userId);

  res.json(userData);
});

app.post("/update", async (req, res) => {
  const [id, bsetscore, token] = [
    req.body.id,
    req.body.bestScore,
    req.body.token,
  ];

  await updateUserData(id, bsetscore, token);
  res.send("data updat finish");
});

app.get("/finduser", async (req, res) => {
  const user_id = req.body.id;
  const user = await viweUserInfoByid(user_id);

  res.json(user);
});

app.get("/leaderboard", async (req, res) => {
  const leaderBoard = await testBoard();

  res.send(leaderBoard);
});

app.post("/withdraw", async (req, res) => {
  try {
    const user_id = req.body.id;

    const { user } = await viweUserInfoByid(user_id);
    const toAddress = user.address;
    const amount = user.token.toString();

    await transferJetton(toAddress, amount, process.env.JETTON_MASTER_ADDRESS);
    const wallet = await getWallet();

    await updateUserData(user_id, user.bestScore, 0);

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

app.get("/generate-invite", async (req, res) => {
  const { id } = req.body; // Get user ID from request body
  const inviteLink = `${process.env.HOST}?start=${id}`; // Generate invite link for Telegram

  res.json({ inviteLink }); // Send the invite link as a response
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
