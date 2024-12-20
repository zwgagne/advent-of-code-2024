import { Day } from "../day";

interface Point {
    x: number;
    y: number;
}

class Day20 extends Day {

    constructor() {
        super(20);
    }

    private computeCheats(input: string, partTwo: boolean): string {
        const grid = input.split('\n').map(line => line.split(''));
        const rows = grid.length;
        const cols = grid[0].length;

        let start: Point | null = null;
        let end: Point | null = null;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === 'S') {
                    start = { x: i, y: j };
                }
                if (grid[i][j] === 'E') {
                    end = { x: i, y: j };
                }
            }
        }

        if (!start || !end) {
            return "0";
        }

        const distFromStart = this.bfs(grid, start);
        const distToEnd = this.bfs(grid, end);

        const baseDist = distFromStart[end.x][end.y];
        if (baseDist === Infinity) {
            return "0";
        }

        const trackCells: Point[] = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this.isTrack(grid[i][j])) {
                    trackCells.push({ x: i, y: j });
                }
            }
        }

        const directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ];

        let countCheats = 0;

        for (const c of trackCells) {
            if (distFromStart[c.x][c.y] === Infinity) continue;
            for (const d of this.getTwoStepPositions(grid, c, directions)) {
                if (distToEnd[d.x][d.y] === Infinity) continue;
                const timeWithCheat = distFromStart[c.x][c.y] + 2 + distToEnd[d.x][d.y];
                const saving = baseDist - timeWithCheat;
                if (saving >= 100) {
                    countCheats++;
                }
            }
        }

        return String(countCheats);
    }

    private isTrack(cell: string): boolean {
        return cell === '.' || cell === 'S' || cell === 'E';
    }

    private bfs(grid: string[][], start: Point): number[][] {
        const rows = grid.length;
        const cols = grid[0].length;
        const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
        dist[start.x][start.y] = 0;
        const queue: Point[] = [start];
        const directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ];

        while (queue.length > 0) {
            const { x, y } = queue.shift()!;
            const currentDist = dist[x][y];
            for (const dir of directions) {
                const nx = x + dir.x;
                const ny = y + dir.y;
                if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) continue;
                if (!this.isTrack(grid[nx][ny])) continue;
                if (dist[nx][ny] > currentDist + 1) {
                    dist[nx][ny] = currentDist + 1;
                    queue.push({ x: nx, y: ny });
                }
            }
        }

        return dist;
    }

    private getTwoStepPositions(grid: string[][], c: Point, directions: {x:number, y:number}[]): Point[] {
        const rows = grid.length;
        const cols = grid[0].length;
        const results = new Set<string>();

        for (const d1 of directions) {
            const x1 = c.x + d1.x;
            const y1 = c.y + d1.y;
            if (x1 < 0 || x1 >= rows || y1 < 0 || y1 >= cols) continue;

            for (const d2 of directions) {
                const x2 = x1 + d2.x;
                const y2 = y1 + d2.y;
                if (x2 < 0 || x2 >= rows || y2 < 0 || y2 >= cols) continue;
                if (this.isTrack(grid[x2][y2])) {
                    results.add(`${x2},${y2}`);
                }
            }
            if (this.isTrack(grid[x1][y1])) {
                results.add(`${x1},${y1}`);
            }
        }

        return Array.from(results).map(str => {
            const [x, y] = str.split(',').map(Number);
            return { x, y };
        });
    }

    solveForPartOne(input: string): string {
        return this.computeCheats(input, false);
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day20;