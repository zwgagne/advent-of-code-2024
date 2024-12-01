import { Day } from "../day";

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const leftList: number[] = [];
        const rightList: number[] = [];

        const lines = input.trim().split('\n');
        for (let line of lines) {
            if (line.trim() === '') continue;

            const parts = line.trim().split(/\s+/);
            if (parts.length >= 2) {
                const leftNum = parseInt(parts[0], 10);
                const rightNum = parseInt(parts[1], 10);

                leftList.push(leftNum);
                rightList.push(rightNum);
            }
        }

        leftList.sort((a, b) => a - b);
        rightList.sort((a, b) => a - b);

        let totalDistance = 0;
        for (let i = 0; i < leftList.length; i++) {
            totalDistance += Math.abs(leftList[i] - rightList[i]);
        }

        return totalDistance.toString();
    }

    solveForPartTwo(input: string): string {
        const leftList: number[] = [];
        const rightList: number[] = [];

        const lines = input.trim().split('\n');
        for (let line of lines) {
            if (line.trim() === '') continue;

            const parts = line.trim().split(/\s+/);
            if (parts.length >= 2) {
                const leftNum = parseInt(parts[0], 10);
                const rightNum = parseInt(parts[1], 10);

                leftList.push(leftNum);
                rightList.push(rightNum);
            }
        }

        const rightFreqMap: Map<number, number> = new Map();

        for (let num of rightList) {
            rightFreqMap.set(num, (rightFreqMap.get(num) || 0) + 1);
        }

        let similarityScore = 0;
        for (let num of leftList) {
            const countInRight = rightFreqMap.get(num) || 0;
            similarityScore += num * countInRight;
        }

        return similarityScore.toString();
    }
}

export default new Day1;