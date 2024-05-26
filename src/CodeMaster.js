import { Code } from './Code.js';

// This class has two methods:
//      - generateSecretCode, which requires *length* (number of pegs in a code) and *colours* (number of colours options to choose from) to randomly create a Code array, named secretCode
//      - checkCode, which compares an input given by the player (userCode) with the secretCode and returns testResult, an array of integers of the same length as userCode and secretCode:
//              0 for when the colour is not in the secretCode;
//              1 for when the colour is in the secretCode and is in the same position;
//              2 for when the colour is in the secretCode, but in a different position.

export class CodeMaster {
    generateSecretCode(length, colours) {
        let secretCode = new Code(length);
        for (let i = 0; i < length; i++) {
            secretCode[i] = Math.floor(Math.random()*colours);
        }
        return secretCode;
    }

    checkCode(userCode, secretCode) {
        const n = userCode.length;
        let testResult = new Array(n);

        for (let i = 0; i < n; i++) {
            if (secretCode.includes(userCode[i])) {
                if (userCode[i] === secretCode[i]) {
                    testResult[i] = 1;
                } else {
                    testResult[i] = 2;
                }
            } else {
                testResult[i] = 0;
            }
        }

        return testResult;
    }

}