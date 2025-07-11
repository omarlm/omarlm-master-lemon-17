export class SlotMachine {
    constructor() {
        this.coin = 0;
    }

    play() {
        this.coin++;

        const reel1 = Math.random() >= 0.5;
        const reel2 = Math.random() >= 0.5;
        const reel3 = Math.random() >= 0.5;

        if (reel1 && reel2 && reel3) {
            console.log(`Congratulations!!!. You won ${this.coin} coins!!`);
        } else {
            console.log("Good luck next time!!");
        }
    }
}