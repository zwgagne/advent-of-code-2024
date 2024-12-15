import { Day } from "../day";

class Day14 extends Day {

    constructor(){
        super(14);
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');

        const width = 101;
        const height = 103;

        type Robot = {x:number,y:number,vx:number,vy:number};
        const robots: Robot[] = [];

        for (const line of lines) {
            const match = line.match(/p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/);
            if(!match) continue;
            const x = parseInt(match[1],10);
            const y = parseInt(match[2],10);
            const vx = parseInt(match[3],10);
            const vy = parseInt(match[4],10);
            robots.push({x,y,vx,vy});
        }

        const T = 100;

        let q1=0, q2=0, q3=0, q4=0;

        for (const r of robots) {
            let finalX = r.x + r.vx*T;
            let finalY = r.y + r.vy*T;

            finalX = ((finalX % width) + width) % width;
            finalY = ((finalY % height) + height) % height;

            if (finalX === 50 || finalY === 51) {
                continue;
            }
            if (finalX < 50 && finalY < 51) q1++;
            else if (finalX > 50 && finalY < 51) q2++;
            else if (finalX < 50 && finalY > 51) q3++;
            else if (finalX > 50 && finalY > 51) q4++;
        }

        const safetyFactor = q1 * q2 * q3 * q4;
        return safetyFactor.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day14;