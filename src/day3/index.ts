import { Day } from "../day";

class Day3 extends Day {

    constructor(){
        super(3);
    }

    solveForPartOne(input: string): string {
        const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

        let totalSum = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(input)) !== null) {
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);

            totalSum += x * y;
        }

        return totalSum.toString();
    }

    solveForPartTwo(input: string): string {
        let mulEnabled = true;
        let totalSum = 0;

        const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/y;
        const doRegex = /do\(\)/y;
        const dontRegex = /don't\(\)/y;

        let position = 0;
        const length = input.length;

        while (position < length) {
            mulRegex.lastIndex = position;
            doRegex.lastIndex = position;
            dontRegex.lastIndex = position;

            let match: RegExpExecArray | null;

            if ((match = mulRegex.exec(input)) !== null) {
                if (mulEnabled) {
                    const x = parseInt(match[1], 10);
                    const y = parseInt(match[2], 10);
                    totalSum += x * y;
                }
                position = mulRegex.lastIndex;
            } else if ((match = doRegex.exec(input)) !== null) {
                mulEnabled = true;
                position = doRegex.lastIndex;
            } else if ((match = dontRegex.exec(input)) !== null) {
                mulEnabled = false;
                position = dontRegex.lastIndex;
            } else {
                position++;
            }
        }

        return totalSum.toString();
    }
}

export default new Day3;