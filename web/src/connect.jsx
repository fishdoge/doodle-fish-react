import { TonConnectButton } from "@tonconnect/ui-react";

const Connect = () => {
    return (
        <div>
            <div className="text-3xl font-bold underline text-red">Connect</div>
            <TonConnectButton className="bg-yellow-500" style={{ width: 200, height: 50, borderRadius: 0, border: "1px solid #000", borderBottom: "1px solid #000", backgroundColor: "yellow" }} />
        </div>
    );
};

export default Connect;

