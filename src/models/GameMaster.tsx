import { CellType } from "../utils/CellType"
import { COLS, MAX_NUM, ROWS } from "../utils/Conf"
import Cell from "./Cell"
import Field from "./Field"

export default class GameMaster {
    static createFillField(): Field {
        const init =
            [1, 1, 2, 2,
                1, 1, 2, 2,
                3, 3, 4, 4,
                3, 3, 4, 4]
        const map = GameMaster.shuffleMap(init)
        const Cells: Cell[] = []
        for (let i = 0; i < COLS * ROWS; i++) {
            Cells.push(new Cell(i, map[i] as CellType))
        }
        return new Field(Cells)
    }
    static shuffleMap(map: number[]): number[] {
        let newMap = [...map]
        for (let i = 0; i < 10; i++) {
            if (i % 2 === 0) {
                const index = Math.floor(Math.random() * ROWS)
                newMap = this.shiftHorizon(newMap, index, 1)
            } else {
                const index = Math.floor(Math.random() * COLS)
                newMap = this.shiftVertical(newMap, index, 1)
            }
        }
        return newMap
    }
    static shiftHorizon(map: number[], index: number, inc: number): number[] {
        const newMap = [...map]
        for (let i = 0; i < map.length; i++) {
            const y = Math.floor(i / COLS)
            const x = i % COLS
            if (y !== index) continue
            const x2 = (x + inc) % COLS
            const index2 = y * COLS + x2
            newMap[i] = map[index2]
        }
        return newMap
    }
    static shiftVertical(map: number[], index: number, inc: number): number[] {
        const newMap = [...map]
        for (let i = 0; i < map.length; i++) {
            const y = Math.floor(i / COLS)
            const x = i % COLS
            if (x !== index) continue
            const y2 = (y + inc) % ROWS
            const index2 = y2 * COLS + x
            newMap[i] = map[index2]
        }
        return newMap
    }
    static incrementField(field: Field, index: number): Field {
        const cells = field.Cells.map((cell, i) => {
            if (i === index && cell.CellType < MAX_NUM) {
                return new Cell(i, cell.CellType + 1 as CellType)
            } else if (i === index) {
                return new Cell(i, 1 as CellType)
            }
            return new Cell(i, cell.CellType)
        })
        return new Field(cells)
    }
}