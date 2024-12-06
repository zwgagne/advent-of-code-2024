import { Day } from "../day";

class Day6 extends Day {

    constructor(){
        super(6);
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');
        const grid = lines.map(line => line.split(''));

        const rows = grid.length;
        const cols = grid[0].length;

        let startRow = 0, startCol = 0;
        let directionIndex = 0;
        let foundGuard = false;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const ch = grid[r][c];
                if (ch === '^' || ch === 'v' || ch === '<' || ch === '>') {
                    startRow = r;
                    startCol = c;
                    foundGuard = true;
                    if (ch === '^') {
                        directionIndex = 0;
                    } else if (ch === '>') {
                        directionIndex = 1;
                    } else if (ch === 'v') {
                        directionIndex = 2;
                    } else if (ch === '<') {
                        directionIndex = 3;
                    }
                    grid[r][c] = '.';
                    break;
                }
            }
            if (foundGuard) break;
        }

        const directions = [
            { dr: -1, dc: 0 },
            { dr: 0, dc: 1 },
            { dr: 1, dc: 0 },
            { dr: 0, dc: -1 }
        ];

        let r = startRow;
        let c = startCol;

        const visited = new Set<string>();
        visited.add(`${r},${c}`);

        while (true) {
            const { dr, dc } = directions[directionIndex];
            const nr = r + dr;
            const nc = c + dc;

            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                break;
            }

            if (grid[nr][nc] === '#') {
                directionIndex = (directionIndex + 1) % 4;
            } else {
                r = nr;
                c = nc;
                visited.add(`${r},${c}`);
            }
        }

        return visited.size.toString();
    }


    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day6;