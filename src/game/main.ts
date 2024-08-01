import gameConfig from "./config";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const StartGame = (parent: string) => {
    return new Phaser.Game(gameConfig);
};

export default StartGame;

