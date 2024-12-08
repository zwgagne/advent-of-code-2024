import { Day } from "../day";

class Day8 extends Day {

    constructor(){
        super(8);
    }

    solveForPartOne(input: string): string {
        const lines = input.trim().split('\n');
        const rows = lines.length;
        const cols = lines[0].length;

        const grid = lines.map(line => line.split(''));

        const freqMap: Map<string, Array<[number, number]>> = new Map();

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const ch = grid[r][c];
                if (ch !== '.') {
                    if (!freqMap.has(ch)) {
                        freqMap.set(ch, []);
                    }
                    freqMap.get(ch)!.push([r, c]);
                }
            }
        }

        const antinodes = new Set<string>();

        for (const [freq, antennas] of freqMap.entries()) {
            const n = antennas.length;
            for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                    const [r1, c1] = antennas[i];
                    const [r2, c2] = antennas[j];

                    const A1: [number, number] = [2 * r1 - r2, 2 * c1 - c2];
                    const A2: [number, number] = [2 * r2 - r1, 2 * c2 - c1];

                    if (A1[0] >= 0 && A1[0] < rows && A1[1] >= 0 && A1[1] < cols) {
                        antinodes.add(`${A1[0]},${A1[1]}`);
                    }

                    if (A2[0] >= 0 && A2[0] < rows && A2[1] >= 0 && A2[1] < cols) {
                        antinodes.add(`${A2[0]},${A2[1]}`);
                    }
                }
            }
        }

        return antinodes.size.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day8;