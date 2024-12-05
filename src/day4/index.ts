import { Day } from "../day";

class Day4 extends Day {

    constructor(){
        super(4);
    }

    private checkWord(grid: string[][], row: number, col: number, dx: number, dy: number, word: string): boolean {
        const numRows = grid.length;
        const numCols = grid[0].length;
        const wordLength = word.length;

        for (let i = 0; i < wordLength; i++) {
            const newRow = row + i * dx;
            const newCol = col + i * dy;

            if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
                return false;
            }

            if (grid[newRow][newCol] !== word[i]) {
                return false;
            }
        }

        return true;
    }

    solveForPartOne(input: string): string {
        const grid: string[][] = input.trim().split('\n').map(line => line.trim().split(''));
        const numRows = grid.length;
        const numCols = grid[0].length;

        const word = "XMAS";

        const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: -1 },
            { dx: -1, dy: 1 },
            { dx: 1, dy: -1 },
            { dx: 1, dy: 1 }
        ];

        let totalOccurrences = 0;

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                for (let dir of directions) {
                    if (this.checkWord(grid, row, col, dir.dx, dir.dy, word)) {
                        totalOccurrences++;
                    }
                }
            }
        }

        return totalOccurrences.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day4;