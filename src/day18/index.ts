import { Day } from "../day";

class Day18 extends Day {

    constructor(){
        super(18);
    }

    private canReachEnd(corrupted:boolean[][]): boolean {
        const size = 71;
        if (corrupted[0][0] || corrupted[70][70]) return false;

        const dist = Array.from({length:size},()=>Array(size).fill(Infinity));
        dist[0][0]=0;
        const queue: [number,number][] = [[0,0]];
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

        while(queue.length>0) {
            const [r,c]=queue.shift()!;
            const d = dist[r][c];
            if (r===70 && c===70) {
                return true;
            }
            for (const [dr,dc] of dirs) {
                const nr=r+dr,nc=c+dc;
                if (nr<0||nr>=size||nc<0||nc>=size) continue;
                if (corrupted[nr][nc]) continue;
                if (dist[nr][nc]>d+1) {
                    dist[nr][nc]=d+1;
                    queue.push([nr,nc]);
                }
            }
        }
        return false;
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');
        const N = 1024;
        const size = 71;
        const corrupted = Array.from({length:size}, ()=>Array(size).fill(false));

        for (let i=0; i<N; i++) {
            const line = lines[i].trim();
            const [Xstr, Ystr] = line.split(',');
            const X = parseInt(Xstr,10);
            const Y = parseInt(Ystr,10);
            corrupted[Y][X] = true;
        }

        if (corrupted[0][0] || corrupted[70][70]) {
            return "No path";
        }

        const dist = Array.from({length:size},()=>Array(size).fill(Infinity));
        dist[0][0]=0;
        const queue: [number,number][] = [[0,0]];

        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

        while(queue.length>0) {
            const [r,c]=queue.shift()!;
            const d = dist[r][c];
            if (r===70 && c===70) {
                return d.toString();
            }
            for (const [dr,dc] of dirs) {
                const nr=r+dr,nc=c+dc;
                if (nr<0||nr>=size||nc<0||nc>=size) continue;
                if (corrupted[nr][nc]) continue;
                if (dist[nr][nc]>d+1) {
                    dist[nr][nc]=d+1;
                    queue.push([nr,nc]);
                }
            }
        }

        return "No path";
    }

    solveForPartTwo(input: string): string {
        const lines = input.trim().split('\n');
        const size = 71;
        const corrupted = Array.from({length:size}, ()=>Array(size).fill(false));

        let i=0;
        for (; i<lines.length; i++) {
            const line = lines[i].trim();
            const [Xstr, Ystr] = line.split(',');
            const X = parseInt(Xstr,10);
            const Y = parseInt(Ystr,10);
            corrupted[Y][X] = true;

            if (!this.canReachEnd(corrupted)) {
                return `${X},${Y}`;
            }
        }

        return "No break";
    }
}

export default new Day18;