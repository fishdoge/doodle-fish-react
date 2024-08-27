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

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, label: "Points", content: <div>Content for Tab 1</div> },
        { id: 1, label: "Token", content: <div>Content for Tab 2</div> },
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
                <div className="flex justify-center text-md">
                    <div className="flex justify-between bg-white/20 rounded-xl py-1 px-1 w-60">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                className={`tab-button px-4 py-1 w-[7.5rem] ${activeTab === index ? "bg-white rounded-xl text-black" : ""}`}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

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

                {activeTab === 0 && (
                    <>
                        <img
                            src="assets/pointLayout.svg"
                            alt=""
                            width={250}
                            height={250}
                        />

                        {rank.length > 0 && (
                            <>
                                <div className="absolute top-[6.6rem] left-12 p-2 w-40 h-8">
                                    <div className="w-full flex flex-col justify-center items-center gap-1">
                                        <div className="text-[0.5rem]">
                                            {formatAddress(rank[0].uid)}
                                        </div>
                                        <div className="text-[0.5rem] flex justify-start">
                                            {rank[0].token} Token
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[9.5rem] -left-5 p-2 w-40 h-8">
                                    <div className="w-full flex flex-col justify-center items-center gap-1">
                                        <div className="text-[0.5rem]">
                                            {rank.length > 1 &&
                                                formatAddress(rank[1].uid)}
                                        </div>
                                        <div className="text-[0.5rem] flex justify-start">
                                            {rank.length > 1 && rank[1].token}{" "}
                                            Token
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[10.8rem] -right-7 p-2 w-40 h-10">
                                    <div className="w-full flex flex-col justify-start items-center gap-1">
                                        <div className="text-[0.5rem]">
                                            {rank.length > 2 &&
                                                formatAddress(rank[2].uid)}
                                        </div>
                                        <div className="text-[0.5rem] flex justify-start">
                                            {rank.length > 2 && rank[2].token}{" "}
                                            Token
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {rank.length > 0 && (
                            <>
                                <div className="absolute top-[16.8rem] left-20 p-2 w-40 h-14 ruda-regular">
                                    <div className="w-full flex flex-col justify-center items-center gap-2">
                                        <div className="text-xs font-bold w-full flex justify-start">
                                            {rank.length > 3 &&
                                                formatAddress(rank[3].uid)}
                                        </div>
                                        <div className="text-xs w-full flex justify-between">
                                            <div className="flex gap-1 items-center">
                                                <img
                                                    src="icons/balance.svg"
                                                    className=""
                                                    alt=""
                                                    width={15}
                                                    height={15}
                                                />
                                                <div>
                                                    {rank.length > 3 &&
                                                        rank[3].token}{" "}
                                                    Token
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[20.5rem] left-20 p-2 w-40 h-14 ruda-regular">
                                    <div className="w-full flex flex-col justify-center items-center gap-2">
                                        <div className="text-xs font-bold w-full flex justify-start">
                                            {rank.length > 4 &&
                                                formatAddress(rank[4].uid)}
                                        </div>
                                        <div className="text-xs w-full flex justify-between">
                                            <div className="flex gap-1 items-center">
                                                <img
                                                    src="icons/balance.svg"
                                                    className=""
                                                    alt=""
                                                    width={15}
                                                    height={15}
                                                />
                                                <div>
                                                    {rank.length > 4 &&
                                                        rank[4].token}{" "}
                                                    Token
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[24.2rem] left-20 p-2 w-40 h-14 ruda-regular">
                                    <div className="w-full flex flex-col justify-center items-center gap-2">
                                        <div className="text-xs font-bold w-full flex justify-start">
                                            {rank.length > 5 &&
                                                formatAddress(rank[5].uid)}
                                        </div>
                                        <div className="text-xs w-full flex justify-between">
                                            <div className="flex gap-1 items-center">
                                                <img
                                                    src="icons/balance.svg"
                                                    className=""
                                                    alt=""
                                                    width={15}
                                                    height={15}
                                                />
                                                <div>
                                                    {rank.length > 5 &&
                                                        rank[5].token}{" "}
                                                    Token
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}

                {activeTab === 1 && (
                    <>
                        <img
                            src="assets/rankLayout.svg"
                            alt=""
                            width={250}
                            height={250}
                        />

                        {rank.length > 0 && (
                            <>
                                <div className="absolute top-[6.6rem] left-12 p-2 w-40 h-8">
                                    <div className="w-full flex flex-col justify-center items-center gap-1">
                                        <div className="text-[0.5rem]">
                                            {formatAddress(rank[0].uid)}
                                        </div>
                                        <div className="text-[0.5rem] flex justify-start">
                                            {rank[0].bestScore} points
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[9.5rem] -left-5 p-2 w-40 h-8">
                                    <div className="w-full flex flex-col justify-center items-center gap-1">
                                        <div className="text-[0.5rem]">
                                            {rank.length > 1 &&
                                                formatAddress(rank[1].uid)}
                                        </div>
                                        <div className="text-[0.5rem] flex justify-start">
                                            {rank.length > 1 &&
                                                rank[1].bestScore}{" "}
                                            points
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[10.8rem] -right-7 p-2 w-40 h-10">
                                    <div className="w-full flex flex-col justify-start items-center gap-1">
                                        <div className="text-[0.5rem]">
                                            {rank.length > 2 &&
                                                formatAddress(rank[2].uid)}
                                        </div>
                                        <div className="text-[0.5rem] flex justify-start">
                                            {rank.length > 2 &&
                                                rank[2].bestScore}{" "}
                                            points
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {rank.length > 0 && (
                            <>
                                <div className="absolute top-[17rem] left-20 p-2 w-40 h-14 ruda-regular">
                                    <div className="w-full flex flex-col justify-center items-center gap-2">
                                        <div className="text-xs font-bold w-full flex justify-start">
                                            {rank.length > 3 &&
                                                formatAddress(rank[3].uid)}
                                        </div>
                                        <div className="text-xs w-full flex justify-between">
                                            <div>
                                                {rank.length > 3 &&
                                                    rank[3].bestScore}{" "}
                                                points
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <img
                                                    src="assets/point.svg"
                                                    className=""
                                                    alt=""
                                                    width={15}
                                                    height={15}
                                                />
                                                <div>
                                                    {rank.length > 3 &&
                                                        rank[3].token}{" "}
                                                    Token
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[21rem] left-20 p-2 w-40 h-14 ruda-regular">
                                    <div className="w-full flex flex-col justify-center items-center gap-2">
                                        <div className="text-xs font-bold w-full flex justify-start">
                                            {rank.length > 4 &&
                                                formatAddress(rank[4].uid)}
                                        </div>
                                        <div className="text-xs w-full flex justify-between">
                                            <div>
                                                {rank.length > 4 &&
                                                    rank[4].bestScore}{" "}
                                                points
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <img
                                                    src="assets/point.svg"
                                                    className=""
                                                    alt=""
                                                    width={15}
                                                    height={15}
                                                />
                                                <div>
                                                    {rank.length > 4 &&
                                                        rank[4].token}{" "}
                                                    Token
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[24.5rem] left-20 p-2 w-40 h-14 ruda-regular">
                                    <div className="w-full flex flex-col justify-center items-center gap-2">
                                        <div className="text-xs font-bold w-full flex justify-start">
                                            {rank.length > 5 &&
                                                formatAddress(rank[5].uid)}
                                        </div>
                                        <div className="text-xs w-full flex justify-between">
                                            <div>
                                                {rank.length > 5 &&
                                                    rank[5].bestScore}{" "}
                                                points
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <img
                                                    src="assets/point.svg"
                                                    className=""
                                                    alt=""
                                                    width={15}
                                                    height={15}
                                                />
                                                <div>
                                                    {rank.length > 5 &&
                                                        rank[5].token}{" "}
                                                    Token
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-[28rem] left-20 p-2 w-40 h-14 ruda-regular">
                                    {rank.length > 6 && (
                                        <div className="w-full flex flex-col justify-center items-center gap-2">
                                            <div className="text-xs font-bold w-full flex justify-start">
                                                {rank.length > 6 &&
                                                    formatAddress(rank[6].uid)}
                                            </div>
                                            <div className="text-xs w-full flex justify-between">
                                                <div>
                                                    {rank.length > 6 &&
                                                        rank[6].bestScore}{" "}
                                                    points
                                                </div>
                                                <div className="flex gap-1 items-center">
                                                    <img
                                                        src="assets/point.svg"
                                                        className=""
                                                        alt=""
                                                        width={15}
                                                        height={15}
                                                    />
                                                    <div>
                                                        {rank.length > 6 &&
                                                            rank[6].token}{" "}
                                                        Token
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center gap-1">
                <p className="gochi-hand-regular">Doodle Fish Lab ©</p>
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
                    src="assets/seaweed4-1.svg"
                    className="absolute bottom-0 left-0"
                    alt=""
                    width={50}
                    height={50}
                />
                <img
                    src="assets/seaweed4-2.svg"
                    className="absolute bottom-0 right-0"
                    alt=""
                    width={50}
                    height={50}
                />
            </div>
        </div>
    );
}

export default Rank;

