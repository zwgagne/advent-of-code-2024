import { Day } from "../day";

class Day5 extends Day {
    private orderingRules: Array<{ first: number, second: number }> = [];
    private updates: number[][] = [];
    private correctlyOrderedUpdates: number[][] = [];
    private incorrectlyOrderedUpdates: number[][] = [];

    constructor(){
        super(5);
    }

    private parseInput(input: string): void {
        if (this.orderingRules.length > 0 && this.updates.length > 0) {
            return;
        }

        const sections = input.trim().split('\n\n');

        this.orderingRules = [];
        const rulesLines = sections[0].trim().split('\n');
        for (const line of rulesLines) {
            const [firstStr, secondStr] = line.trim().split('|');
            if (firstStr && secondStr) {
                const first = parseInt(firstStr, 10);
                const second = parseInt(secondStr, 10);
                this.orderingRules.push({ first, second });
            }
        }


        this.updates = [];
        const updatesLines = sections[1].trim().split('\n');
        for (const line of updatesLines) {
            const pages = line.trim().split(',').map(numStr => parseInt(numStr.trim(), 10));
            if (pages.length > 0) {
                this.updates.push(pages);
            }
        }

        this.correctlyOrderedUpdates = [];
        this.incorrectlyOrderedUpdates = [];

        for (const update of this.updates) {
            if (this.isUpdateCorrect(update)) {
                this.correctlyOrderedUpdates.push(update);
            } else {
                this.incorrectlyOrderedUpdates.push(update);
            }
        }
    }

    private isUpdateCorrect(update: number[]): boolean {
        const pagePositions = new Map<number, number>();
        for (let i = 0; i < update.length; i++) {
            pagePositions.set(update[i], i);
        }

        for (const rule of this.orderingRules) {
            const posFirst = pagePositions.get(rule.first);
            const posSecond = pagePositions.get(rule.second);

            if (posFirst !== undefined && posSecond !== undefined) {
                if (posFirst >= posSecond) {
                    return false;
                }
            }
        }

        return true;
    }

    private correctUpdateOrder(update: number[]): number[] | null {
        const pagesInUpdate = new Set<number>(update);
        const graph = new Map<number, number[]>();
        const visited = new Map<number, boolean>();
        const onPath = new Map<number, boolean>();
        const result: number[] = [];

        for (const page of pagesInUpdate) {
            graph.set(page, []);
        }
        for (const rule of this.orderingRules) {
            if (pagesInUpdate.has(rule.first) && pagesInUpdate.has(rule.second)) {
                graph.get(rule.first)!.push(rule.second);
            }
        }

        const dfs = (node: number): boolean => {
            if (onPath.get(node)) return false;
            if (visited.get(node)) return true;

            visited.set(node, true);
            onPath.set(node, true);

            for (const neighbor of graph.get(node)!) {
                if (!dfs(neighbor)) return false;
            }

            onPath.set(node, false);
            result.push(node);
            return true;
        };

        for (const page of pagesInUpdate) {
            if (!visited.get(page)) {
                if (!dfs(page)) {
                    return null;
                }
            }
        }

        return result.reverse();
    }

    solveForPartOne(input: string): string {
        this.parseInput(input);

        let totalMiddlePagesSum = 0;

        for (const update of this.correctlyOrderedUpdates) {
            const middleIndex = Math.floor(update.length / 2);
            const middlePage = update[middleIndex];
            totalMiddlePagesSum += middlePage;
        }

        return totalMiddlePagesSum.toString();
    }

    solveForPartTwo(input: string): string {
        this.parseInput(input);

        let totalMiddlePagesSum = 0;

        for (const update of this.incorrectlyOrderedUpdates) {
            const correctedUpdate = this.correctUpdateOrder(update);

            if (correctedUpdate) {
                const middleIndex = Math.floor(correctedUpdate.length / 2);
                const middlePage = correctedUpdate[middleIndex];
                totalMiddlePagesSum += middlePage;
            }
        }

        return totalMiddlePagesSum.toString();
    }
}

export default new Day5();