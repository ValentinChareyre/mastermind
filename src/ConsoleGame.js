// This class handles game logic. The length (number of colour pegs in a code), colours (number of colours that can be chosen) and attempts (total number of attempts a player can have) define the game difficulty.
// It has 6 methods:
//  - startGame(), which starts the game, calls the secret code generation and start the loop
//  - requestInput(), which gets inputs from the player to form the userCode
//  - incretmentAttempt(), which simply increments the property currentAttempt (initiated at 0)
//  - trackAttempt(), to make sure the player does not have more attempts than the total allowed
//  - checkCondition(), to check whether the player won or not
//  - endGame(), which interrupts the game if the player find the secretCode before their last attempt
 
 export class ConsoleGame {
    constructor(length, colours, attempts) {
        this.length = length;
        this.colours = colours;
        this.attempts = attempts;
        this.codeMaster = new CodeMaster();
        this.currentAttempt = 0;
    }

    startGame() {
        console.log("The game has started.");
        let secretCode = this.codeMaster.generateSecretCode(this.length, this.colours);
        
        this.incrementAttempt();

        while (this.trackAttempt()) {
            let userCode = this.requestInput();
            this.checkCondition(userCode,secretCode);
            this.incrementAttempt();
        }
        
    }

    requestInput() {
        let userCode = new Code(this.length);

        const maxOption = this.colours - 1;

        for(let i = 0; i < this.length; i++) {
            userCode[i] = parseInt(prompt(`Choose a colour (a number between 0 and ${maxOption}):`));
        }
        console.log(`Your code is: ${userCode}. Attempt ${this.currentAttempt} of ${this.attempts}.`);
        return userCode;
    }

    incrementAttempt () {
        this.currentAttempt++;
    }

    trackAttempt() {
        return this.currentAttempt <= this.attempts;
    }
    
    checkCondition(userCode, secretCode) {
        
        testResult = this.codeMaster.checkCode(userCode, secretCode);
        const isOne = (currentValue) => currentValue === 1;
        if (testResult.every(isOne)) {
            console.log("You won!");
            this.endGame();
        } else {
            if (this.currentAttempt === this.attempts) {
                console.log(`The result is ${testResult}. You lost. The secret code was ${secretCode}.`);
            } else {
                console.log(`The result is ${testResult}. Try again.`);
            }
        }
    }

    endGame() {
        this.currentAttempt = this.attempts + 1;
    }
}