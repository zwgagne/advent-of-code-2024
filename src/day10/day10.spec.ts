import day10 from './index';

describe('On Day 10', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day10.solveForPartOne('hello')).toBe('hello');
    })
});