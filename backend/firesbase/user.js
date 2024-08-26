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
exports.createUserData = createUserData;
exports.updateUserData = updateUserData;
exports.updateInvitee = updateInvitee;
exports.getUser = getUser;
exports.getUserByAddress = getUserByAddress;
exports.isUserExist = isUserExist;
const config_1 = require("./config");
const firestore_1 = require("firebase/firestore");
function createUserData(userTonAddress, score, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield isUserExist({ address: userTonAddress });
        if (isExist)
            throw new Error("User is already existed");
        const userData = {
            address: userTonAddress,
            bestScore: score,
            token: token,
            invitee: [],
        };
        const ref = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(config_1.database, "doodlePlayer"), userData);
        return { uid: ref.id, data: userData };
    });
}
function updateUserData(id, score, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid } = yield getUser(id);
        try {
            const docRef = (0, firestore_1.doc)(config_1.database, "doodlePlayer", uid);
            yield (0, firestore_1.updateDoc)(docRef, {
                bestScore: score,
                token: token,
            });
            return yield getUser(id);
        }
        catch (error) {
            console.error("Error updating document: ", error);
        }
    });
}
function updateInvitee(id, newInvitee) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, user } = yield getUser(id);
        const docRef = (0, firestore_1.doc)(config_1.database, "doodlePlayer", uid);
        let updatedInviteeArray = [];
        if (user.invitee && Array.isArray(user.invitee)) {
            updatedInviteeArray = [...user.invitee, newInvitee];
        }
        else {
            updatedInviteeArray = [newInvitee];
        }
        yield (0, firestore_1.updateDoc)(docRef, {
            invitee: updatedInviteeArray,
        });
    });
}
function getUserByAddress(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield isUserExist({ address });
        if (isExist) {
            const usersRef = (0, firestore_1.collection)(config_1.database, "doodlePlayer");
            const q = (0, firestore_1.query)(usersRef, (0, firestore_1.where)("address", "==", address));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            const docSnap = querySnapshot.docs[0];
            return { user: docSnap.data(), uid: docSnap.id };
        }
        else {
            throw new Error("User not found!");
        }
    });
}
function isUserExist(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, address } = input;
        if (id) {
            const docRef = (0, firestore_1.doc)(config_1.database, "doodlePlayer", id);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            return docSnap.exists();
        }
        else if (address) {
            const usersRef = (0, firestore_1.collection)(config_1.database, "doodlePlayer");
            const q = (0, firestore_1.query)(usersRef, (0, firestore_1.where)("address", "==", address));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            return !querySnapshot.empty;
        }
        else {
            throw new Error("Id or address is undefined or incorrectly");
        }
    });
}
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield isUserExist({ id });
        if (isExist) {
            const docRef = (0, firestore_1.doc)(config_1.database, "doodlePlayer", id);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            return { user: docSnap.data(), uid: docSnap.id };
        }
        else {
            throw new Error("User not found!");
        }
    });
}
