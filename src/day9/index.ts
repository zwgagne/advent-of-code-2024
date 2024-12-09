import { Day } from "../day";

class Day9 extends Day {

    constructor() {
        super(9);
    }

    private parseDisk(input: string): string[] {
        const line = input.trim();
        const blocks: string[] = [];
        let readingFile = true;
        let fileId = 0;

        for (let i = 0; i < line.length; i++) {
            const length = parseInt(line[i], 10);
            if (readingFile) {
                for (let b = 0; b < length; b++) {
                    blocks.push(fileId.toString());
                }
                fileId++;
            } else {
                for (let b = 0; b < length; b++) {
                    blocks.push('.');
                }
            }
            readingFile = !readingFile;
        }

        return blocks;
    }

    private compactDiskByBlocks(blocks: string[]) {
        while (this.hasGap(blocks)) {
            const gapIndex = this.leftmostGapIndex(blocks);
            const rightmostFileIndex = this.rightmostFileBlockIndex(blocks);

            const fileBlock = blocks[rightmostFileIndex];
            blocks[rightmostFileIndex] = '.';
            blocks[gapIndex] = fileBlock;
        }
    }

    private hasGap(blocks: string[]): boolean {
        let seenFile = false;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i] !== '.') {
                seenFile = true;
            } else {
                if (seenFile && this.isFileToRight(blocks, i)) {
                    return true;
                }
            }
        }
        return false;
    }

    private isFileToRight(blocks: string[], startIndex: number): boolean {
        for (let i = startIndex + 1; i < blocks.length; i++) {
            if (blocks[i] !== '.') return true;
        }
        return false;
    }

    private leftmostGapIndex(blocks: string[]): number {
        let seenFile = false;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i] !== '.') {
                seenFile = true;
            } else {
                if (seenFile && this.isFileToRight(blocks, i)) {
                    return i;
                }
            }
        }
        return -1;
    }

    private rightmostFileBlockIndex(blocks: string[]): number {
        for (let i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i] !== '.') return i;
        }
        return -1;
    }

    private identifyFiles(blocks: string[]): {id: number, start: number, end: number, length: number}[] {
        const files = [];
        let currentId: number | null = null;
        let start = -1;
        for (let i = 0; i < blocks.length; i++) {
            const ch = blocks[i];
            if (ch === '.') {
                if (currentId !== null) {
                    files.push({id: currentId, start, end: i - 1, length: i - start});
                    currentId = null;
                }
            } else {
                const id = parseInt(ch, 10);
                if (currentId === null) {
                    currentId = id;
                    start = i;
                } else if (id !== currentId) {
                    files.push({id: currentId, start, end: i - 1, length: i - start});
                    currentId = id;
                    start = i;
                }
            }
        }
        if (currentId !== null) {
            files.push({id: currentId, start, end: blocks.length - 1, length: blocks.length - start});
        }

        return files;
    }

    private moveFileIfPossible(blocks: string[], file: {id: number, start: number, end: number, length: number}) {
        const requiredLength = file.length;
        const fileStart = file.start;

        let runStart = -1;
        for (let i = 0; i < fileStart; i++) {
            if (blocks[i] === '.') {
                if (runStart === -1) runStart = i;
            } else {
                if (runStart !== -1) {
                    const runLength = i - runStart;
                    if (runLength >= requiredLength) {
                        this.placeFile(blocks, file, runStart, requiredLength);
                        return;
                    }
                    runStart = -1;
                }
            }
        }

        if (runStart !== -1) {
            const runLength = fileStart - runStart;
            if (runLength >= requiredLength) {
                this.placeFile(blocks, file, runStart, requiredLength);
                return;
            }
        }
    }

    private placeFile(blocks: string[], file: {id: number, start: number, end: number, length: number}, runStart: number, requiredLength: number) {
        const fileIdChar = file.id.toString();

        for (let i = 0; i < requiredLength; i++) {
            blocks[runStart + i] = fileIdChar;
        }

        for (let i = file.start; i <= file.end; i++) {
            blocks[i] = '.';
        }

        file.start = runStart;
        file.end = runStart + requiredLength - 1;
    }

    solveForPartOne(input: string): string {
        const blocks = this.parseDisk(input);

        this.compactDiskByBlocks(blocks);

        let checksum = 0;
        for (let pos = 0; pos < blocks.length; pos++) {
            const ch = blocks[pos];
            if (ch !== '.') {
                const id = parseInt(ch, 10);
                checksum += pos * id;
            }
        }

        return checksum.toString();
    }

    solveForPartTwo(input: string): string {
        const blocks = this.parseDisk(input);

        const files = this.identifyFiles(blocks);

        files.sort((a, b) => b.id - a.id);

        for (const file of files) {
            this.moveFileIfPossible(blocks, file);
        }

        let checksum = 0;
        for (let pos = 0; pos < blocks.length; pos++) {
            const ch = blocks[pos];
            if (ch !== '.') {
                const id = parseInt(ch, 10);
                checksum += pos * id;
            }
        }

        return checksum.toString();
    }
}

export default new Day9();