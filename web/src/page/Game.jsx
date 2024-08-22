import { useRef } from "react";
import { PhaserGame } from "../game/PhaserGame";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonAddress } from '@tonconnect/ui-react';

function Game() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const userFriendlyAddress = useTonAddress();

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        console.log(scene);
    };


    return (

            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
    );
}

export default Game;

