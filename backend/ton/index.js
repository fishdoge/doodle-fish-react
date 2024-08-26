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
exports.client = void 0;
exports.getKeyPair = getKeyPair;
exports.getWallet = getWallet;
exports.transferJetton = transferJetton;
const ton_1 = require("@ton/ton");
const crypto_1 = require("@ton/crypto");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = new ton_1.TonClient({
    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC", // Replace with your preferred endpoint
    apiKey: process.env.TONCENTER_API_KEY,
});
function getKeyPair() {
    return __awaiter(this, void 0, void 0, function* () {
        const fromMnemonic = process.env.MNEMONIC;
        return yield (0, crypto_1.mnemonicToPrivateKey)(fromMnemonic.split(" "));
    });
}
function getWallet() {
    return __awaiter(this, void 0, void 0, function* () {
        const keyPair = yield getKeyPair();
        const wallet = ton_1.WalletContractV4.create({
            publicKey: keyPair.publicKey,
            workchain: 0,
        });
        return wallet;
    });
}
function transferJetton(toAddress, amount, masterJettonAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hash, signedTransaction } = yield signTransferTxCell(ton_1.Address.parse(toAddress), amount, ton_1.Address.parse(masterJettonAddress));
        console.log(hash);
        yield exports.client.sendFile(signedTransaction);
    });
}
function getUserJettonWalletAddress(userAddress, jettonMasterAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAddressCell = (0, ton_1.beginCell)().storeAddress(userAddress).endCell();
        const response = yield exports.client.runMethod(jettonMasterAddress, "get_wallet_address", [{ type: "slice", cell: userAddressCell }]);
        return response.stack.readAddress();
    });
}
function signTransferTxCell(toAddress, amount, masterJettonAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = yield getWallet();
        const keyPair = yield getKeyPair();
        const walletContract = exports.client.open(wallet);
        const seqno = yield walletContract.getSeqno();
        const SENDER_JETTON_WALLET = yield getUserJettonWalletAddress(wallet.address, masterJettonAddress);
        const messageBody = (0, ton_1.beginCell)()
            .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
            .storeUint(0, 64) // query id
            .storeCoins(amount) // jetton amount, amount * 10^9
            .storeAddress(toAddress)
            .storeAddress(toAddress) // response destination
            .storeBit(0) // no custom payload
            .storeCoins(0) // forward amount - if > 0, will send notification message
            .storeBit(0) // we store forwardPayload as a reference, set 1 and uncomment next line for have a comment
            // .storeRef(forwardPayload)
            .endCell();
        let neededInit = null;
        const internalMessage = (0, ton_1.internal)({
            to: SENDER_JETTON_WALLET,
            value: (0, ton_1.toNano)(0.1),
            bounce: true,
            body: messageBody,
        });
        const body = wallet.createTransfer({
            seqno,
            secretKey: keyPair.secretKey,
            messages: [internalMessage],
        });
        const externalMessage = (0, ton_1.external)({
            to: wallet.address,
            init: neededInit,
            body,
        });
        const externalMessageCell = (0, ton_1.beginCell)()
            .store((0, ton_1.storeMessage)(externalMessage))
            .endCell();
        const signedTransaction = externalMessageCell.toBoc();
        const hash = externalMessageCell.hash().toString("hex");
        return { hash, signedTransaction };
    });
}
