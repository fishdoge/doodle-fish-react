"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./firesbase/user");
const leaderBoard_1 = require("./firesbase/leaderBoard");
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./ton/index");
const swagger_ui_express_1 = require("swagger-ui-express");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const core_1 = require("@ton/core");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send("API start");
}));
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
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, token, inviterId } = req.body;
    try {
        if (inviterId)
            yield (0, user_1.getUser)(inviterId);
        const user = yield (0, user_1.createUserData)(address, 0, token);
        if (inviterId)
            yield (0, user_1.updateInvitee)(user.uid, inviterId);
        return res.json(user);
    }
    catch (error) {
        return res.status(404).json({ message: `${error}` });
    }
}));
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
app.put("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, bestScore, token } = req.body;
    const user = yield (0, user_1.updateUserData)(id, bestScore, token);
    return res.send(user);
}));
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
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, address } = req.query;
    try {
        if (id) {
            const user = yield (0, user_1.getUser)(id);
            return res.json(user);
        }
        else if (address) {
            const user = yield (0, user_1.getUserByAddress)(address);
            return res.json(user);
        }
        else {
            return res.status(400).json({ message: "id or address is incorrect" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `${error}` });
    }
}));
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
app.get("/leaderboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaderBoard = yield (0, leaderBoard_1.getBoard)();
    res.send(leaderBoard);
}));
app.get("/tokenleaderboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leaderBoard = yield (0, leaderBoard_1.getTokenRewardBoard)();
    res.send(leaderBoard);
}));
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
app.get("/invite-leaderboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inviteLeaderBoard = yield (0, leaderBoard_1.getInviteBoard)();
    res.send(inviteLeaderBoard);
}));
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
app.post("/user/withdraw", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: uid } = req.body;
        const { user } = yield (0, user_1.getUser)(uid);
        const toAddress = user.address;
        const amount = user.token;
        if (amount === 0)
            return res.status(404).json({ message: "Token is 0" });
        yield (0, index_1.transferJetton)(toAddress, amount, process.env.JETTON_MASTER_ADDRESS);
        const wallet = yield (0, index_1.getWallet)();
        yield (0, user_1.updateUserData)(uid, user.bestScore, 0);
        res.json({
            fromAddress: wallet.address.toString(),
            toAddress: toAddress,
            amount: amount,
        });
    }
    catch (error) {
        console.error("Error transferring Jetton:", error);
        res.status(500).json({ error: "Failed to transfer Jetton" });
    }
}));
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
app.get("/user/generate-invite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query; // Get user ID from request body
    const inviteLink = `${process.env.HOST}?start=${id}`; // Generate invite link for Telegram
    res.json({ inviteLink }); // Send the invite link as a response
}));
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
app.get("/user/balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address } = req.query;
        // Validate the address
        if (!core_1.Address.isFriendly(address)) {
            return res.status(400).json({ error: "Invalid TON address" });
        }
        // Query the balance
        const balance = yield index_1.client.getBalance(core_1.Address.parse(address));
        // Convert balance from nanotons to TON
        const balanceInTon = balance.toString();
        res.json({
            address: address,
            balance: balanceInTon,
            units: "TON",
        });
    }
    catch (error) {
        console.error("Error querying balance:", error);
        res.status(500).json({ error: "Failed to query balance" });
    }
}));
app.use("/api-docs", swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swaggerSpec));
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
