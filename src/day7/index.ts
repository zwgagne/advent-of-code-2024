import { Day } from "../day";

class Day7 extends Day {

    constructor(){
        super(7);
    }

    private canProduceTestValue(target: number, nums: number[]): boolean {
        if (nums.length === 1) {
            return nums[0] === target;
        }

        const n = nums.length;
        const maxCombinations = 1 << (n - 1);

        for (let mask = 0; mask < maxCombinations; mask++) {

            let result = nums[0];
            for (let i = 0; i < n - 1; i++) {
                const op = (mask & (1 << i)) !== 0 ? '*' : '+';
                if (op === '+') {
                    result = result + nums[i + 1];
                } else {
                    result = result * nums[i + 1];
                }
            }

            if (result === target) {
                return true;
            }
        }

        return false;
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');

        let totalSum = 0;

        for (const line of lines) {
            const [testValStr, numsStr] = line.split(':').map(s => s.trim());
            const testVal = parseInt(testValStr, 10);

            if (!numsStr) {
                continue;
            }

            const nums = numsStr.split(/\s+/).map(s => parseInt(s, 10));

            if (this.canProduceTestValue(testVal, nums)) {
                totalSum += testVal;
            }
        }

        return totalSum.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day7;