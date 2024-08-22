import { useRef } from "react";
import { PhaserGame } from "../game/PhaserGame";

function Game() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        console.log(scene);
    };

    return <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />;
}

export default Game;
