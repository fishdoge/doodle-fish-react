import express from "express";
import {
  createUserData,
  updateUserData,
  updateInvitee,
  getUser,
  getUserByAddress,
} from "./firesbase/user";
import { getBoard, getInviteBoard, getTokenRewardBoard } from "./firesbase/leaderBoard";
import cors from "cors";
import { getWallet, transferJetton, client } from "./ton/index";
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Address } from "@ton/core";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
    },
  },
  apis: ["./index.ts"],
};
const swaggerSpec = swaggerJSDoc(options);


app.get("/", async (req, res) => {
    return res.send("API start");
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               token:
 *                 type: string
 *               inviterId:
 *                 type: string
 *                 nullable: true
 *                 description: Optional. The ID of the user who invited the new user.
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                     token:
 *                       type: number
 *                     bestScore:
 *                       type: number
 *                     invitee:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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
/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update user data
 *     tags:
 *       - User
 *     description: Update the best score and token for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user to update.
 *               bestScore:
 *                 type: number
 *                 description: The new best score of the user.
 *               token:
 *                 type: number
 *                 description: The new token count of the user.
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                     token:
 *                       type: number
 *                     bestScore:
 *                       type: number
 *                     invitee:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

app.put("/user", async (req, res) => {
  const { id, bestScore, token } = req.body;

  const user = await updateUserData(id, bestScore, token);
  return res.send(user);
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a user by ID or address
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: The ID of the user
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         required: false
 *         description: The address of the user
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                     token:
 *                       type: number
 *                     bestScore:
 *                       type: number
 *                     invitee:
 *                       type: array
 *                       items:
 *                         type: number
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get("/user", async (req, res) => {
  const { id, address } = req.query;

  try {
    if (id) {
      const user = await getUser(id as string);
      return res.json(user);
    } else if (address) {
      const user = await getUserByAddress(address as string);
      return res.json(user);
    } else {
      return res.status(400).json({ message: "id or address is incorrect" });
    }
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
});

/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Retrieve the leaderboard
 *     tags:
 *       - Leaderboard
 *     responses:
 *       200:
 *         description: Successfully retrieved leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                   bestScore:
 *                     type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get("/leaderboard", async (req, res) => {
  const leaderBoard = await getBoard();

  res.send(leaderBoard);
});

app.get("/tokenleaderboard", async (req, res) => {
  const leaderBoard = await getTokenRewardBoard();

  res.send(leaderBoard);
});

/**
 * @swagger
 * /invite-leaderboard:
 *   get:
 *     summary: Retrieve the invite leaderboard
 *     tags:
 *       - Leaderboard
 *     responses:
 *       200:
 *         description: Successfully retrieved invite leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                       token:
 *                         type: number
 *                       bestScore:
 *                         type: number
 *                       invitee:
 *                         type: array
 *                         items:
 *                           type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get("/invite-leaderboard", async (req, res) => {
  const inviteLeaderBoard = await getInviteBoard();

  res.send(inviteLeaderBoard);
});

/**
 * @swagger
 * /user/withdraw:
 *   post:
 *     summary: Withdraw tokens for a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user ID
 *     responses:
 *       200:
 *         description: Tokens successfully withdrawn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fromAddress:
 *                   type: string
 *                 toAddress:
 *                   type: string
 *                 amount:
 *                   type: number
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Token is 0 or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to transfer Jetton
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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

/**
 * @swagger
 * /user/generate-invite:
 *   get:
 *     summary: Generate an invite link for a user
 *     tags:
 *       - User
 *     description: Generates an invite link for a user based on their ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully generated invite link
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inviteLink:
 *                   type: string
 *       400:
 *         description: Bad request, missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.get("/user/generate-invite", async (req, res) => {
  const { id } = req.query; // Get user ID from request body
  const inviteLink = `${process.env.HOST}?start=${id}`; // Generate invite link for Telegram

  res.json({ inviteLink }); // Send the invite link as a response
});

/**
 * @swagger
 * /user/balance:
 *   get:
 *     summary: Get user balance
 *     tags:
 *       - User
 *     description: Retrieves the balance of a user based on their TON address.
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         description: The TON address of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved user balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 units:
 *                   type: string
 *       400:
 *         description: Bad request, missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

app.get("/user/balance", async (req, res) => {
  try {
    const { address } = req.query;

    // Validate the address
    if (!Address.isFriendly(address as string)) {
      return res.status(400).json({ error: "Invalid TON address" });
    }

    // Query the balance
    const balance = await client.getBalance(Address.parse(address as string));

    // Convert balance from nanotons to TON
    const balanceInTon = balance.toString();

    res.json({
      address: address,
      balance: balanceInTon,
      units: "TON",
    });
  } catch (error) {
    console.error("Error querying balance:", error);
    res.status(500).json({ error: "Failed to query balance" });
  }
});

app.use("/api-docs", serve, setup(swaggerSpec));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
