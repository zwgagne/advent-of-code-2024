import { Day } from "../day";

class Day10 extends Day {

    constructor(){
        super(10);
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');
        const rows = lines.length;
        const cols = lines[0].length;

        const grid: number[][] = lines.map(line => line.split('').map(ch => parseInt(ch, 10)));

        const ninePositions: Array<[number, number]> = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 9) {
                    ninePositions.push([r, c]);
                }
            }
        }

        const reachableNines: Array<Array<Set<number>>> = [];
        for (let r = 0; r < rows; r++) {
            const rowSets: Array<Set<number>> = [];
            for (let c = 0; c < cols; c++) {
                rowSets.push(new Set<number>());
            }
            reachableNines.push(rowSets);
        }

        ninePositions.forEach((pos, id) => {
            const [r, c] = pos;
            reachableNines[r][c].add(id);
        });

        const directions = [[1,0],[-1,0],[0,1],[0,-1]];

        for (let h = 8; h >= 0; h--) {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (grid[r][c] === h) {
                        let unionSet = reachableNines[r][c];
                        directions.forEach(([dr, dc]) => {
                            const nr = r+dr, nc = c+dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                                if (grid[nr][nc] === h+1) {
                                    for (let id of reachableNines[nr][nc]) {
                                        unionSet.add(id);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }

        let totalScore = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 0) {
                    totalScore += reachableNines[r][c].size;
                }
            }
        }

        return totalScore.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day10;