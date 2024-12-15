import { Day } from "../day";

class Day13 extends Day {

    constructor(){
        super(13);
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');
        const machines: {xA:number, yA:number, xB:number, yB:number, xP:number, yP:number}[] = [];

        let i=0;
        while (i < lines.length) {
            if (lines[i].startsWith("Button A:")) {
                let lineA = lines[i];
                let lineB = lines[i+1];
                let lineP = lines[i+2];

                let matchA = lineA.match(/X\+(\d+), Y\+(\d+)/);
                if (!matchA) throw new Error("Format unexpected A");
                const xA = parseInt(matchA[1],10);
                const yA = parseInt(matchA[2],10);

                let matchB = lineB.match(/X\+(\d+), Y\+(\d+)/);
                if (!matchB) throw new Error("Format unexpected B");
                const xB = parseInt(matchB[1],10);
                const yB = parseInt(matchB[2],10);

                let matchP = lineP.match(/X=(\d+), Y=(\d+)/);
                if (!matchP) throw new Error("Format unexpected Prize");
                const xP = parseInt(matchP[1],10);
                const yP = parseInt(matchP[2],10);

                machines.push({xA,yA,xB,yB,xP,yP});

                i += 3;
                if (i<lines.length && lines[i].trim()==="") i++;
            } else {
                i++;
            }
        }

        let totalCost=0;
        let count=0;

        for (const m of machines) {
            let bestCost = Infinity;
            for (let A=0; A<=100; A++) {
                for (let B=0; B<=100; B++) {
                    const X = A*m.xA + B*m.xB;
                    const Y = A*m.yA + B*m.yB;
                    if (X === m.xP && Y === m.yP) {
                        const cost = 3*A + B;
                        if (cost<bestCost) bestCost=cost;
                    }
                }
            }
            if (bestCost<Infinity) {
                count++;
                totalCost += bestCost;
            }
        }

        return totalCost.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day13;