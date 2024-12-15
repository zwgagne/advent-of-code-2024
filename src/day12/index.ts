import { Day } from "../day";

class Day12 extends Day {

    constructor(){
        super(12);
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');
        const rows = lines.length;
        const cols = lines[0].length;

        const grid = lines.map(line => line.split(''));

        const visited = Array.from({length: rows}, () => Array(cols).fill(false));

        const directions = [
            [1,0], [-1,0], [0,1], [0,-1]
        ];

        function bfs(startR: number, startC: number): {area: number, perimeter: number} {
            const queue: Array<[number,number]> = [[startR, startC]];
            visited[startR][startC] = true;
            const plantType = grid[startR][startC];
            let area = 0;
            let perimeter = 0;

            while (queue.length > 0) {
                const [r, c] = queue.shift()!;
                area++;

                for (const [dr, dc] of directions) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
                        perimeter++;
                    } else {
                        // Dans la grille
                        if (grid[nr][nc] !== plantType) {
                            perimeter++;
                        } else {
                            if (!visited[nr][nc]) {
                                visited[nr][nc] = true;
                                queue.push([nr,nc]);
                            }
                        }
                    }
                }
            }

            return {area, perimeter};
        }

        let totalPrice = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!visited[r][c]) {
                    const {area, perimeter} = bfs(r,c);
                    const price = area * perimeter;
                    totalPrice += price;
                }
            }
        }

        return totalPrice.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day12;