import {
  TonClient,
  Address,
  internal,
  WalletContractV4,
  beginCell,
  toNano,
  external,
  storeMessage,
} from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import dotenv from "dotenv";

dotenv.config();

export const client = new TonClient({
  endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC", // Replace with your preferred endpoint
  apiKey: process.env.TONCENTER_API_KEY,
});

export async function getKeyPair() {
  const fromMnemonic = process.env.MNEMONIC as string;
  return await mnemonicToPrivateKey(fromMnemonic.split(" "));
}

export async function getWallet() {
  const keyPair = await getKeyPair();

  const wallet = WalletContractV4.create({
    publicKey: keyPair.publicKey,
    workchain: 0,
  });

  return wallet;
}

export async function transferJetton(
  toAddress: string,
  amount: number,
  masterJettonAddress: string
) {
  const { hash, signedTransaction } = await signTransferTxCell(
    Address.parse(toAddress),
    amount,
    Address.parse(masterJettonAddress)
  );

  console.log(hash);
  await client.sendFile(signedTransaction);
}

async function getUserJettonWalletAddress(
  userAddress: Address,
  jettonMasterAddress: Address
) {
  const userAddressCell = beginCell().storeAddress(userAddress).endCell();

  const response = await client.runMethod(
    jettonMasterAddress,
    "get_wallet_address",
    [{ type: "slice", cell: userAddressCell }]
  );

  return response.stack.readAddress();
}

async function signTransferTxCell(
  toAddress: Address,
  amount: number,
  masterJettonAddress: Address
) {
  const wallet = await getWallet();
  const keyPair = await getKeyPair();
  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  const SENDER_JETTON_WALLET = await getUserJettonWalletAddress(
    wallet.address,
    masterJettonAddress
  );

  const messageBody = beginCell()
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

  const internalMessage = internal({
    to: SENDER_JETTON_WALLET,
    value: toNano(0.1),
    bounce: true,
    body: messageBody,
  });

  const body = wallet.createTransfer({
    seqno,
    secretKey: keyPair.secretKey,
    messages: [internalMessage],
  });

  const externalMessage = external({
    to: wallet.address,
    init: neededInit,
    body,
  });

  const externalMessageCell = beginCell()
    .store(storeMessage(externalMessage))
    .endCell();

  const signedTransaction = externalMessageCell.toBoc();
  const hash = externalMessageCell.hash().toString("hex");

  return { hash, signedTransaction };
}
