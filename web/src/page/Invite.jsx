import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { useState } from "react";
import useStore from "../data/store"; // Update with the correct path to your Zustand store

function Invite() {
    // const [copied, setCopied] = useState(false);
    const { inviteLink } = useStore();

    // const [text, _setText] = useState(
    //     "Https://t.me/doodlesfish_bot?star=er_38u47843",
    // );
    const [copied, setCopied] = useState(false);

    return (
        <div
            id="invite"
            className="bg-[#C3F1F5] h-full flex flex-col justify-center items-center"
        >
            <div className=" gochi-hand-regular text-3xl pb-2">Invite</div>
            <div className="h-[77%] flex flex-col justify-start relative pt-2 gap-5">
                <div className="w-full h-40 flex flex-col justify-center items-center border border-black rounded-md bg-[#9DE7EF] gap-5 gochi-hand-regular">
                    <div className="w-[20%] flex justify-center items-center ">
                        {inviteLink}
                    </div>
                    <div className="h-12 w-[60%] border-black border-2 border-b-8 bg-white rounded-md  flex justify-center items-center gap-2 cursor-pointer">
                        <CopyToClipboard
                            text={inviteLink}
                            onCopy={() => setCopied(true)}
                        >
                            <div className="copy gochi-hand-regular text-xl">
                                Copy Link
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className="h-80 w-full bg-white rounded-md border border-black flex flex-col justify-center items-center gap-5 gochi-hand-regular">
                    <div className="flex justify-between w-full px-5  text-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#F2EEEE] rounded-full"></div>
                            <div className=" text-lg">8d3Zd83......2870d83</div>
                        </div>
                        <div>no.4</div>
                    </div>
                    <div className="flex justify-between w-full px-5  text-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#F2EEEE] rounded-full"></div>
                            <div className=" text-lg">8d3Zd83......2870d83</div>
                        </div>
                        <div>no.4</div>
                    </div>
                    <div className="flex justify-between w-full px-5  text-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#F2EEEE] rounded-full"></div>
                            <div className=" text-lg">8d3Zd83......2870d83</div>
                        </div>
                        <div>no.4</div>
                    </div>
                    <div className="flex justify-between w-full px-5  text-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#F2EEEE] rounded-full"></div>
                            <div className=" text-lg">8d3Zd83......2870d83</div>
                        </div>
                        <div>no.4</div>
                    </div>
                    <div className="flex justify-between w-full px-5  text-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#F2EEEE] rounded-full"></div>
                            <div className=" text-lg">8d3Zd83......2870d83</div>
                        </div>
                        <div>no.4</div>
                    </div>
                    <div className="flex justify-between w-full px-5  text-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#F2EEEE] rounded-full"></div>
                            <div className=" text-lg">8d3Zd83......2870d83</div>
                        </div>
                        <div>no.4</div>
                    </div>
                </div>
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

export default Invite;

