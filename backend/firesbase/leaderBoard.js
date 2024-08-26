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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoard = getBoard;
exports.getInviteBoard = getInviteBoard;
exports.getTokenRewardBoard = getTokenRewardBoard;
const config_1 = require("./config");
const firestore_1 = require("firebase/firestore");
function getBoard() {
    return __awaiter(this, void 0, void 0, function* () {
        const leaderBoard = [];
        const usersRef = (0, firestore_1.collection)(config_1.database, "doodlePlayer");
        const q = (0, firestore_1.query)(usersRef, (0, firestore_1.orderBy)("bestScore", "desc"));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        if (querySnapshot.empty)
            console.log("Empty!!");
        querySnapshot.forEach((doc) => {
            const data = {
                uid: doc.id,
                bestScore: doc.data().bestScore,
                token: doc.data().token,
            };
            leaderBoard.push(data);
        });
        return leaderBoard;
    });
}
function getInviteBoard() {
    return __awaiter(this, void 0, void 0, function* () {
        const inviteLeaderBoard = [];
        const usersRef = (0, firestore_1.collection)(config_1.database, "doodlePlayer");
        const q = (0, firestore_1.query)(usersRef);
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        if (querySnapshot.empty)
            console.log("Empty!!");
        querySnapshot.forEach((doc) => {
            const data = {
                uid: doc.id,
                user: doc.data(),
            };
            inviteLeaderBoard.push(data);
        });
        // Sort by the length of the invitee array in descending order
        inviteLeaderBoard.sort((a, b) => b.user.invitee.length - a.user.invitee.length);
        return inviteLeaderBoard;
    });
}
function getTokenRewardBoard() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenRewardBoard = [];
        const usersRef = (0, firestore_1.collection)(config_1.database, "doodlePlayer");
        const q = (0, firestore_1.query)(usersRef, (0, firestore_1.orderBy)("token", "desc"));
        const querySnapshot = yield (0, firestore_1.getDocs)(q);
        if (querySnapshot.empty)
            console.log("Empty!!");
        querySnapshot.forEach((doc) => {
            const data = {
                uid: doc.id,
                token: doc.data().token,
            };
            tokenRewardBoard.push(data);
        });
        return tokenRewardBoard;
    });
}
