import { Day } from "../day";

class Day2 extends Day {

    constructor(){
        super(2);
    }

    private isReportSafe(report: number[]): boolean {
        if (report.length < 2) {
            return false;
        }

        const firstDiff = report[1] - report[0];

        let isIncreasing: boolean | null = null;

        if (firstDiff > 0) {
            isIncreasing = true;
        } else if (firstDiff < 0) {
            isIncreasing = false;
        } else {
            return false;
        }

        for (let i = 1; i < report.length; i++) {
            const diff = report[i] - report[i - 1];
            const absDiff = Math.abs(diff);

            if (absDiff < 1 || absDiff > 3) {
                return false;
            }

            if (isIncreasing && diff <= 0) {
                return false;
            } else if (!isIncreasing && diff >= 0) {
                return false;
            }
        }
        return true;
    }

    solveForPartOne(input: string): string {
        const reports: number[][] = input.trim().split('\n').map(line => {
            return line.trim().split(/\s+/).map(numStr => parseInt(numStr, 10));
        });

        let safeReportCount = 0;

        for (let report of reports) {
            if (this.isReportSafe(report)) {
                safeReportCount++;
            }
        }

        return safeReportCount.toString();
    }

    solveForPartTwo(input: string): string {
        const reports: number[][] = input.trim().split('\n').map(line => {
            return line.trim().split(/\s+/).map(numStr => parseInt(numStr, 10));
        });

        let safeReportCount = 0;

        for (let report of reports) {
            if (this.isReportSafe(report)) {
                safeReportCount++;
            } else {
                let foundSafeByRemovingOne = false;
                for (let i = 0; i < report.length; i++) {
                    const reportWithoutLevel = report.slice(0, i).concat(report.slice(i + 1));
                    if (this.isReportSafe(reportWithoutLevel)) {
                        foundSafeByRemovingOne = true;
                        break;
                    }
                }
                if (foundSafeByRemovingOne) {
                    safeReportCount++;
                }
            }
        }

        return safeReportCount.toString();
    }

}

export default new Day2;