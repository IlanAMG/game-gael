export const removeWithIndex = (arr, index) => {
    return arr.filter((_, i) => i !== index)
}

export const getMin = (positions, xOrY) => {
    let min = 999;
    positions.map(pos => {
        if (pos[xOrY] < min) {
            min = pos[xOrY]
        }
    })
    return min
}
export const getMax = (positions, xOrY) => {
    let max = 0;
    positions.map(pos => {
        if (pos[xOrY] > max) {
            max = pos[xOrY]
        }
    })
    return max
}

export const getForm = (copyMap, minX, maxX, minY, maxY) => {
    const newMap = copyMap.map((row, y) => {
        return row.map((box, x) => {
            if ((y < minY || y > maxY) || (x < minX || x > maxX)) {
                return 3
            } else {
                return box
            }
        })
    })   
    const form = (newMap.map((row) => row.filter(el => el !== 3))).filter(row => row.length !== 0)
    const objectForm = {}

    form.map((row,i) => objectForm[i] = row)

    return objectForm
}