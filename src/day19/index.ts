import { Day } from "../day";

class Day19 extends Day {

    constructor(){
        super(19);
    }

    private canFormDesign(design: string, patternSet:Set<string>): boolean {
        const dp = Array(design.length+1).fill(false);
        dp[0]=true;
        for (let i=1; i<=design.length; i++) {
            for (let j=0; j<i; j++) {
                if (dp[j] && patternSet.has(design.substring(j,i))) {
                    dp[i]=true;
                    break;
                }
            }
        }
        return dp[design.length];
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');

        const firstLine = lines[0].trim();
        const patterns = firstLine.split(',').map(p=>p.trim());
        const patternSet = new Set(patterns);

        let i=1;
        while (i<lines.length && lines[i].trim()==='') i++;
        const designs = lines.slice(i).map(l=>l.trim()).filter(l=>l.length>0);

        let count=0;
        for (const design of designs) {
            if (this.canFormDesign(design, patternSet)) {
                count++;
            }
        }

        return count.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day19;