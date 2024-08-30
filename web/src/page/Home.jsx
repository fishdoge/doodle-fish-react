import { useEffect } from "react";
import {
    useTonAddress,
    useTonWallet,
    useTonConnectUI,
} from "@tonconnect/ui-react";
import { useTonConnectModal } from "@tonconnect/ui-react";
// import { TonClient } from "ton";
import { Link } from "react-router-dom";
import useStore from "../data/store"; // Update with the correct path to your Zustand store

import axios from "axios";
axios.defaults.baseURL = "https://doodle-fish-backend.vercel.app/";

import Game from "./Game";

function Home() {
    //  References to the PhaserGame component (game and scene are exposed)
    // const phaserRef = useRef();
    const userFriendlyAddress = useTonAddress();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const { open } = useTonConnectModal();
    // const rawAddress = useTonAddress(false);
    const { setUid, setInviteLink } = useStore();

    const formatAddress = (address) => {
        // Ensure the address has at least 8 characters
        if (address.length <= 8) {
            return address;
        }

        const start = address.slice(0, 4); // First four characters
        const end = address.slice(-4); // Last four characters

        return `${start}...${end}`;
    };

    const createUserAndGenerateInvite = async (walletAddress) => {
        try {
            const retrievalUser = await axios.get("/user", {
                params: {
                    address: walletAddress,
                },
            });

            if (retrievalUser.data.uid) {
                setUid(retrievalUser.data.uid);

                // Step 2: Generate Invite URL (assuming it's based on the user ID)
                const getUserInviteId = await axios.get(
                    `/user/generate-invite?id=${retrievalUser.data.uid}`,
                );

                // Assuming the invite link is in getUserInviteId.data.inviteLink
                const originalLink = getUserInviteId.data.inviteLink;

                // Replace the base URL with the new one
                const updatedLink = originalLink.replace(
                    "http://localhost:3000",
                    "https://t.me/DoodleFish_bot",
                );

                setInviteLink(updatedLink);
            } else {
                // Step 1: Create User
                const createUserResponse = await axios.post("/user", {
                    address: "0x0",
                    token: "0", // default score
                    inviterId: "", // default invite
                });

                const { uid } = createUserResponse.data;
                setUid(uid);

                // Step 2: Generate Invite URL (assuming it's based on the user ID)
                const getUserInviteId = await axios.get(
                    `/user/generate-invite?id=${uid}`,
                );

                // Assuming the invite link is in getUserInviteId.data.inviteLink
                const originalLink = getUserInviteId.data.inviteLink;

                // Replace the base URL with the new one
                const updatedLink = originalLink.replace(
                    "http://localhost:3000",
                    "https://t.me/DoodleFish_bot",
                );

                setInviteLink(updatedLink);
            }
        } catch (error) {
            console.error("Error creating user or generating invite: ", error);
        }
    };

    useEffect(() => {
        // Query the balance

        if (userFriendlyAddress) {
            createUserAndGenerateInvite(userFriendlyAddress);
        }
    }, [userFriendlyAddress]);

    async function disConnect() {
        await tonConnectUI.disconnect();
    }

    return (
        <div
            id="home"
            className="bg-[#C3F1F5] h-full flex flex-col justify-center items-center pt-5 pb-10 relative"
        >
            <div className="h-20 w-full flex justify-center">
                {wallet && (
                    <div className="w-full justify-around flex">
                        <div className="h-10 border-black border-2  bg-white rounded-3xl w-[40%] flex justify-center items-center gap-2 gochi-hand-regular">
                            <img
                                src="icons/balance.svg"
                                alt=""
                                width={30}
                                height={30}
                            />
                            <p className="w-2/3 text-2xl">{"$ 375"}</p>
                        </div>
                        <div
                            onClick={disConnect}
                            className="h-10 border-black border-2  bg-white rounded-3xl w-[40%] flex justify-center items-center gap-2 gochi-hand-regular text-xl"
                        >
                            <img
                                src="icons/tonIcon.svg"
                                alt=""
                                width={30}
                                height={30}
                            />
                            {formatAddress(userFriendlyAddress)}
                        </div>
                    </div>
                )}

                {wallet == null && (
                    <div className="h-16 w-[60%] border-black border-2 border-b-8 bg-white rounded-md  flex justify-center items-center gap-2">
                        <img
                            src="icons/tonIcon.svg"
                            alt=""
                            width={30}
                            height={30}
                        />
                        <button
                            onClick={open}
                            className="gochi-hand-regular text-xl"
                        >
                            {" "}
                            Ton Connect
                        </button>
                    </div>
                )}
            </div>

            {wallet == null ? (
                <div className="flex flex-col justify-center items-center h-[80%] relative">
                    <img
                        src="assets/star.svg"
                        className="absolute top-6 -left-20"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <img
                        src="assets/wave.svg"
                        className="absolute top-10 -right-32"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <img
                        src="assets/wave.svg"
                        className="absolute top-24 left-0  rotate-180"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <img
                        src="assets/wave.svg"
                        className="absolute bottom-36 -left-32"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <img
                        src="assets/wave.svg"
                        className="absolute bottom-28 -right-5"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <img
                        src="assets/star2.svg"
                        className="absolute bottom-24 -left-10"
                        alt=""
                        width={40}
                        height={40}
                    />
                    <img
                        src="assets/bubble.svg"
                        className="absolute top-28 -right-10"
                        alt=""
                        width={25}
                        height={25}
                    />
                    <img
                        src="assets/bubble.svg"
                        className="absolute bottom-44 -left-20"
                        alt=""
                        width={25}
                        height={25}
                    />
                    <img
                        src="assets/bubble.svg"
                        className="absolute bottom-20 -right-20"
                        alt=""
                        width={25}
                        height={25}
                    />

                    <div className="flex flex-col justify-center items-center josefin-sans-regular text-4xl">
                        <div className="flex flex-col justify-center items-center gap-5">
                            <img
                                src="assets/fish.svg"
                                alt=""
                                width={100}
                                height={20}
                            />
                            <div className="flex flex-col justify-center items-center text-2xl">
                                <p>Doodle Fish</p>
                                {/* <p></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Game />
            )}

            {wallet == null ? (
                <div className="flex-grow w-full flex justify-center items-center gap-2 relative">
                    <img
                        src="assets/star.svg"
                        className="absolute bottom-4 right-[7.5rem] rotate-[30deg]"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <img
                        src="assets/seaweed1.svg"
                        className="absolute -bottom-10 left-5"
                        alt=""
                        width={120}
                        height={120}
                    />
                    <img
                        src="assets/seaweed2.svg"
                        className="absolute -bottom-10 left-32"
                        alt=""
                        width={90}
                        height={90}
                    />
                    <img
                        src="assets/seaweed3.svg"
                        className="absolute -bottom-10 right-0"
                        alt=""
                        width={120}
                        height={120}
                    />
                </div>
            ) : (
                <div className="h-auto w-full flex flex-col justify-center items-center gap-1 relative">
                    <p className="gochi-hand-regular">Doodles Fish Lab ©</p>
                    <div className="w-full flex justify-center items-center gap-8">
                        <Link to="/">
                            <div className="h-10 w-10 border-black border-2 border-b-8 bg-white rounded-lg flex justify-center items-center gap-2">
                                <img
                                    src="assets/share.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </Link>

                        <Link to="/ranking">
                            <div className="h-10 w-10 border-black border-2 border-b-8 bg-white rounded-lg flex justify-center items-center gap-2">
                                <img
                                    src="assets/rank.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </Link>
                        <Link to="/invite">
                            <div className="h-10 w-10 border-black border-2 border-b-8 bg-white rounded-lg flex justify-center items-center gap-2">
                                <img
                                    src="assets/email.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </Link>
                        <Link to="/invite">
                            <div className="h-10 w-10 border-black border-2 border-b-8 bg-white rounded-lg flex justify-center items-center gap-2">
                                <img
                                    src="assets/account.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </Link>
                    </div>

                    <img
                        src="assets/seaweed2-1.svg"
                        className="absolute -bottom-10 left-5"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <img
                        src="assets/seaweed2-2.svg"
                        className="absolute -bottom-10 right-0"
                        alt=""
                        width={50}
                        height={50}
                    />
                </div>
            )}
        </div>
    );
}

export default Home;

