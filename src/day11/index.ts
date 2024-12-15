import { Day } from "../day";

class Day11 extends Day {
    private memo = new Map<string, number>();

    constructor() {
        super(11);
    }

    private countAfter(stone: string, steps: number): number {
        if (steps === 0) return 1;

        const key = stone + "|" + steps;
        if (this.memo.has(key)) return this.memo.get(key)!;

        let result: number;

        if (stone === "0") {
            result = this.countAfter("1", steps - 1);
        } else {
            const len = stone.length;
            if (len % 2 === 0 && len > 0) {
                const half = len / 2;
                let left = stone.substring(0, half);
                let right = stone.substring(half);

                left = parseInt(left, 10).toString();
                right = parseInt(right, 10).toString();

                result = this.countAfter(left, steps - 1) + this.countAfter(right, steps - 1);
            } else {
                const multiplied = this.multiplyBy2024(stone);
                result = this.countAfter(multiplied, steps - 1);
            }
        }

        this.memo.set(key, result);
        return result;
    }

    private multiplyBy2024(numStr: string): string {
        const multiplier = 2024;
        let carry = 0;
        let resultArray: number[] = [];
        for (let i = numStr.length - 1; i >= 0; i--) {
            const digit = parseInt(numStr[i], 10);
            const product = digit * multiplier + carry;
            resultArray.push(product % 10);
            carry = Math.floor(product / 10);
        }
        while (carry > 0) {
            resultArray.push(carry % 10);
            carry = Math.floor(carry / 10);
        }
        resultArray.reverse();
        return resultArray.join('');
    }

    solveForPartOne(input: string): string {
        const line = input.trim();
        const stones = line.split(/\s+/);

        const steps = 25;

        let total = 0;
        for (const stone of stones) {
            total += this.countAfter(stone, steps);
        }

        return total.toString();
    }

    solveForPartTwo(input: string): string {
        const line = input.trim();
        const stones = line.split(/\s+/);

        const steps = 75;

        let total = 0;
        for (const stone of stones) {
            total += this.countAfter(stone, steps);
        }

        return total.toString();
    }

}

export default new Day11;