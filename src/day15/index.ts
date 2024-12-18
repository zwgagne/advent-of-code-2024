import { Day } from "../day";

class Day15 extends Day {

    constructor(){
        super(15);
    }

    solveForPartOne(input: string): string {
        const lines = input.split('\n');

        let blankLineIndex = lines.indexOf('');
        if (blankLineIndex === -1) {
            blankLineIndex = lines.findIndex(l => l.trim() === '');
        }

        const mapLines = (blankLineIndex>=0 ? lines.slice(0, blankLineIndex) : lines).map(l=>l);
        const moveLines = (blankLineIndex>=0 && blankLineIndex<lines.length-1)? lines.slice(blankLineIndex+1):[];

        let moves = moveLines.join('');
        moves = moves.replace(/\r/g, '');

        const height = mapLines.length;
        const width = mapLines[0].length;

        let grid = mapLines.map(l=>l.split(''));

        let robotX=0, robotY=0;
        for (let r=0; r<height; r++) {
            for (let c=0; c<width; c++) {
                if (grid[r][c] === '@') {
                    robotY = r; robotX = c;
                    break;
                }
            }
        }

        const dirMap: {[k:string]:[number,number]} = {
            '^':[0,-1],
            'v':[0,1],
            '<':[-1,0],
            '>':[1,0]
        };

        for (const move of moves) {
            const d = dirMap[move];
            if (!d) continue;
            const [dx,dy] = d;
            const nx = robotX + dx;
            const ny = robotY + dy;

            if (grid[ny][nx] === '#') {
                continue;
            }

            if (grid[ny][nx] === 'O') {
                let chain: Array<[number,number]> = [];
                let cx=nx, cy=ny;
                while (grid[cy][cx] === 'O') {
                    chain.push([cx,cy]);
                    cx += dx; cy += dy;
                }
                if (grid[cy][cx] === '#' || grid[cy][cx] === '@') {
                    continue;
                }
                if (grid[cy][cx] === 'O') {
                    chain = [];
                    cx=nx; cy=ny;
                    while (true) {
                        if (grid[cy][cx]==='O') {
                            chain.push([cx,cy]);
                            cx+=dx; cy+=dy;
                        } else {
                            break;
                        }
                    }
                    if (grid[cy][cx] === '#' || grid[cy][cx] === '@') {
                        continue;
                    }
                }

                if (grid[cy][cx] === '.') {

                    grid[cy][cx] = 'O';
                    for (let i=chain.length-1; i>0; i--) {
                        const [x2,y2]=chain[i];
                        const [x1,y1]=chain[i-1];
                        grid[y2][x2]='O';
                        grid[y1][x1]='.';
                    }
                    for (const [xbox,ybox] of chain) {
                        grid[ybox][xbox]='.';
                    }
                    let px= cx, py=cy;
                    for (let i=chain.length-1; i>=0; i--) {
                        grid[py][px]='O';
                        px -= dx; py -= dy;
                    }

                    grid[robotY][robotX]='.';
                    robotX=nx; robotY=ny;
                    grid[robotY][robotX]='@';
                }

            } else if (grid[ny][nx] === '.') {
                grid[robotY][robotX]='.';
                robotX=nx; robotY=ny;
                grid[robotY][robotX]='@';
            } else {
            }
        }

        let sum=0;
        for (let r=0; r<height; r++) {
            for (let c=0; c<width; c++) {
                if (grid[r][c] === 'O') {
                    sum += 100*r + c;
                }
            }
        }

        return sum.toString();
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day15;