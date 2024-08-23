import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

function Rank() {
    const [rank, setRank] = useState([]);

    const formatAddress = (address) => {
        // Ensure the address has at least 8 characters
        if (address.length <= 8) {
            return address;
        }

        const start = address.slice(0, 4); // First four characters
        const end = address.slice(-4); // Last four characters

        return `${start}...${end}`;
    };

    const formatEightAddress = (address) => {
        // Ensure the address has at least 8 characters
        if (address.length <= 20) {
            return address;
        }

        const start = address.slice(0, 8); // First four characters
        const end = address.slice(-8); // Last four characters

        return `${start}...${end}`;
    };

    useEffect(() => {
        async function fetchRank() {
            const getUserRanking = await axios.get(`/leaderboard`);

            console.log(getUserRanking.data);

            setRank(getUserRanking.data);
        }

        fetchRank();
    }, []);

    const positions = [
        { top: "4.6rem", left: "16", width: "40", height: "8" },
        { top: "8rem", left: "-4", width: "40", height: "8" },
        { top: "9.3rem", right: "-5", width: "40", height: "10" },
        {
            top: "16.5rem",
            left: "24",
            width: "40",
            height: "14",
            extraClass: "ruda-regular",
        },
        {
            top: "20.8rem",
            left: "24",
            width: "40",
            height: "14",
            extraClass: "ruda-regular",
        },
        { top: "24.8rem", left: "24", width: "40", height: "14" },
        { top: "28.8rem", left: "24", width: "40", height: "14" },
    ];

    return (
        <div
            id="rank"
            className="bg-[#C3F1F5] h-full flex flex-col justify-center items-center"
        >
            <div className=" gochi-hand-regular text-3xl pb-2">
                Learderbroad
            </div>
            <div className="h-[77%] flex flex-col justify-start relative pt-2">
                <img
                    src="assets/bubble.svg"
                    className="absolute top-28 -left-5"
                    alt=""
                    width={25}
                    height={25}
                />
                <img
                    src="assets/bubble.svg"
                    className="absolute -top-4 right-2"
                    alt=""
                    width={25}
                    height={25}
                />
                <img
                    src="assets/wave2.svg"
                    className="absolute top-10 left-2"
                    alt=""
                    width={40}
                    height={40}
                />
                <img
                    src="assets/wave2.svg"
                    className="absolute -top-2 -right-12"
                    alt=""
                    width={40}
                    height={40}
                />
                {/* <div className="absolute top-7 left-10 rounded-full bg-[#FFFFFF] p-2 w-14 h-14"></div>
                <div className="absolute -top-5 right-[7rem] rounded-full bg-[#FFFFFF] p-2 w-14 h-14"></div>
                <div className="absolute top-12 right-7 rounded-full bg-[#FFFFFF] p-2 w-14 h-14"></div> */}
                {/* <img
                    src="assets/king.svg"
                    className="absolute -top-12 right-[8rem]"
                    alt=""
                    width={25}
                    height={25}
                /> */}

                <img
                    src="assets/rankLayout.svg"
                    alt=""
                    width={280}
                    height={280}
                />

                {rank.length > 0 && (
                    <>
                        <div className="absolute top-[4.6rem] left-16 p-2 w-40 h-8">
                            <div className="w-full flex flex-col justify-center items-center gap-1">
                                <div className="text-[0.5rem]">
                                    {formatAddress(rank[0].uid)}
                                </div>
                                <div className="text-[0.5rem] flex justify-start">
                                    {rank[0].bestScore} points
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[8rem] -left-4 p-2 w-40 h-8">
                            <div className="w-full flex flex-col justify-center items-center gap-1">
                                <div className="text-[0.5rem]">
                                    {formatAddress(rank[1].uid)}
                                </div>
                                <div className="text-[0.5rem] flex justify-start">
                                    {rank[1].bestScore} points
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[9.3rem] -right-5 p-2 w-40 h-10">
                            <div className="w-full flex flex-col justify-start items-center gap-1">
                                <div className="text-[0.5rem]">
                                    {formatAddress(rank[2].uid)}
                                </div>
                                <div className="text-[0.5rem] flex justify-start">
                                    {rank[2].bestScore} points
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {rank.length > 0 && (
                    <>
                        <div className="absolute top-[16.5rem] left-24 p-2 w-40 h-14 ruda-regular">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <div className="text-xs font-bold w-full flex justify-start">
                                    {formatAddress(rank[3].uid)}
                                </div>
                                <div className="text-xs w-full flex justify-between">
                                    <div>{rank[3].bestScore} points</div>
                                    <div className="flex gap-1 items-center">
                                        <img
                                            src="assets/point.svg"
                                            className=""
                                            alt=""
                                            width={15}
                                            height={15}
                                        />
                                        <div>{rank[3].bestScore} points</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[20.8rem] left-24 p-2 w-40 h-14 ruda-regular">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <div className="text-xs font-bold w-full flex justify-start">
                                    {formatAddress(rank[4].uid)}
                                </div>
                                <div className="text-xs w-full flex justify-between">
                                    <div>{rank[4].bestScore} points</div>
                                    <div className="flex gap-1 items-center">
                                        <img
                                            src="assets/point.svg"
                                            className=""
                                            alt=""
                                            width={15}
                                            height={15}
                                        />
                                        <div>{rank[4].bestScore} points</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="absolute top-[24.8rem] left-24 p-2 w-40 h-14">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <div className="text-xs font-bold w-full flex justify-start">
                                    {formatAddress(rank[5].uid)}
                                </div>
                                <div className="text-xs w-full flex justify-between">
                                    <div>{rank[5].bestScore} points</div>
                                    <div className="flex gap-1 items-center">
                                        <img
                                            src="assets/point.svg"
                                            className=""
                                            alt=""
                                            width={15}
                                            height={15}
                                        />
                                        <div>{rank[5].bestScore} points</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[28.8rem] left-24 p-2 w-40 h-14">
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <div className="text-xs font-bold w-full flex justify-start">
                                    {formatAddress(rank[6]?.uid)}
                                </div>
                                <div className="text-xs w-full flex justify-between">
                                    <div>{rank[6]?.bestScore} points</div>
                                    <div className="flex gap-1 items-center">
                                        <img
                                            src="assets/point.svg"
                                            className=""
                                            alt=""
                                            width={15}
                                            height={15}
                                        />
                                        <div>{rank[6]?.bestScore} points</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </>
                )}
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center gap-1 relative">
                <p className="gochi-hand-regular">Doodles Fish Lab ©</p>
                <div className="w-full flex justify-center items-center gap-8">
                    <div className="h-10 w-10 border-black border-2 border-b-8 bg-white rounded-lg flex justify-center items-center gap-2">
                        <img
                            src="assets/share.svg"
                            alt=""
                            width={20}
                            height={20}
                        />
                    </div>

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
                    src="assets/seaweed4-1.svg"
                    className="absolute -bottom-10 left-5"
                    alt=""
                    width={50}
                    height={50}
                />
                <img
                    src="assets/seaweed4-2.svg"
                    className="absolute -bottom-10 right-0"
                    alt=""
                    width={50}
                    height={50}
                />
            </div>
        </div>
    );
}

export default Rank;

