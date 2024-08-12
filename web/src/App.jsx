import { useRef } from "react";
import { PhaserGame } from "./game/PhaserGame";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonAddress } from '@tonconnect/ui-react';

function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const userFriendlyAddress = useTonAddress();

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        console.log(scene);
    };


    return (
        <div id="app">
            <div className="w-full ">
                <div className="w-[400px] h-[90px] content-center bg-gray-200  justify-center items-center w-[512px] mx-auto">
                    <div className="mt-2 ml-[60%]">
                    <TonConnectButton />
                    <p>Address: {userFriendlyAddress}</p>
                    </div>
                </div>
                <div className="mt-0">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
                </div>
               
            </div>
           
        </div>
    );
}

export default App;

