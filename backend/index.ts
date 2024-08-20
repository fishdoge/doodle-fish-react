import express from "express";
import {
  createUserData,
  updateUserData,
  updateInvitee,
  getUser,
  getUserByAddress,
} from "./firesbase/user";
import { testBoard } from "./firesbase/leaderBoard";
import cors from "cors";
import { getWallet, transferJetton } from "./ton/index";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/user", async (req, res) => {
  const { address, token, inviterId } = req.body;

  try {
    if (inviterId) await getUser(inviterId);

    const user = await createUserData(address, 0, token);
    if (inviterId) await updateInvitee(user.uid, inviterId);

    return res.json(user);
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
});

app.put("/user", async (req, res) => {
  const { id, bestScore, token } = req.body;

  const user = await updateUserData(id, bestScore, token);
  return res.send(user);
});

app.get("/user", async (req, res) => {
  const { id, address } = req.body;

  try {
    if (id) {
      const user = await getUser(id);
      return res.json(user);
    } else if (address) {
      const user = await getUserByAddress(address);
      return res.json(user);
    } else {
      return res.status(400).json({ message: "id or address is incorrect" });
    }
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
});

app.get("/leaderboard", async (req, res) => {
  const leaderBoard = await testBoard();

  res.send(leaderBoard);
});

app.post("/user/withdraw", async (req, res) => {
  try {
    const { id: uid } = req.body;

    const { user } = await getUser(uid);
    const toAddress = user.address;
    const amount = user.token;

    if (amount === 0) return res.status(404).json({ message: "Token is 0" });

    await transferJetton(
      toAddress,
      amount,
      process.env.JETTON_MASTER_ADDRESS as string
    );
    const wallet = await getWallet();
    await updateUserData(uid, user.bestScore, 0);

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

app.get("/user/generate-invite", async (req, res) => {
  const { id } = req.body; // Get user ID from request body
  const inviteLink = `${process.env.HOST}?start=${id}`; // Generate invite link for Telegram

  res.json({ inviteLink }); // Send the invite link as a response
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
