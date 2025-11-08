'use strict';

class SumSolution {
    compute(x, y) {
        if (x < 0 || y < 0) {
            throw new Error("Integer out of range");
        }

        if (x > 100 || y > 100) {
            throw new Error("Integer out of range");
        }

        return x + y;
    }
}

module.exports = SumSolution;
