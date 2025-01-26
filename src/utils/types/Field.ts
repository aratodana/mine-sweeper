enum Field {
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

const getFieldByNumberOfMinesAround = (numberOfMinesAround: number):Field => {
    const key = Object.keys(Field).find(key => Field[key as keyof typeof Field] === numberOfMinesAround);
    return Field[key as keyof typeof Field];
}

export {Field, getFieldByNumberOfMinesAround};