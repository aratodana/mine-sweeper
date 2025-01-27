enum FieldStatus {
    EMPTY = 0,
    EMPTY_1= 1,
    EMPTY_2= 2,
    EMPTY_3= 3,
    EMPTY_4 = 4,
    EMPTY_5 = 5,
    EMPTY_6 = 6,
    EMPTY_7 = 7,
    EMPTY_8 = 8,
    MINE = 'x'
}

const getFieldByNumberOfMinesAround = (numberOfMinesAround: number):FieldStatus => {
    const key = Object.keys(FieldStatus).find(key => FieldStatus[key as keyof typeof FieldStatus] === numberOfMinesAround);
    return FieldStatus[key as keyof typeof FieldStatus];
}

export {FieldStatus, getFieldByNumberOfMinesAround};