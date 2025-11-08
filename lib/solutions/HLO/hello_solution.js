'use strict';

class HelloSolution {
    hello(friendName) {
        if (friendName === null || friendName === undefined) {
            throw new Error("Invalid input");
        }

        if (typeof friendName !== 'string') {
            throw new Error("Invalid input");
        }

        return `Hello, ${friendName}!`;
    }
}

module.exports = HelloSolution;

