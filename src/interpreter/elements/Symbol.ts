import { PrimitiveT, VectorType, ListType } from "."


export type VoidType = undefined

export type NullType = null

export type TypeWiseType = PrimitiveT | VectorType | ListType // ? | string for generic objects

export type TypeWiseVariableType = TypeWiseType | NullType

export type TypeWiseValueType = TypeWiseType | NullType | VoidType
export class Symbols {
    static NULL: NullType = null
    static VOID: VoidType = undefined
    static INT: PrimitiveT = "INT"
    static DOUBLE: PrimitiveT = "DOUBLE"
    static STRING: PrimitiveT = "STRING"
    static BOOLEAN: PrimitiveT = "BOOLEAN"
    static CHAR: PrimitiveT = "CHAR"
    static INT_VECTOR: VectorType = "INT[]"
    static DOUBLE_VECTOR: VectorType = "DOUBLE[]"
    static STRING_VECTOR: VectorType = "STRING[]"
    static BOOLEAN_VECTOR: VectorType = "BOOLEAN[]"
    static CHAR_VECTOR: VectorType = "CHAR[]"
    static INT_LIST: ListType = "INT[[]]"
    static DOUBLE_LIST: ListType = "DOUBLE[[]]"
    static STRING_LIST: ListType = "STRING[[]]"
    static BOOLEAN_LIST: ListType = "BOOLEAN[[]]"
    static CHAR_LIST: ListType = "CHAR[[]]"
}

export function isPrimitiveType(type: TypeWiseValueType): type is PrimitiveT {
    return type == Symbols.INT || type == Symbols.DOUBLE || type == Symbols.STRING || type == Symbols.BOOLEAN || type == Symbols.CHAR
}

export function isVectorType(type: TypeWiseValueType): type is VectorType {
    return type == Symbols.INT_VECTOR || type == Symbols.DOUBLE_VECTOR || type == Symbols.STRING_VECTOR || type == Symbols.BOOLEAN_VECTOR || type == Symbols.CHAR_VECTOR
}

export function isListType(type: TypeWiseValueType): type is ListType {
    return type == Symbols.INT_LIST || type == Symbols.DOUBLE_LIST || type == Symbols.STRING_LIST || type == Symbols.BOOLEAN_LIST || type == Symbols.CHAR_LIST
}

export function getPrimitiveType(type: TypeWiseValueType): PrimitiveT {
    if (isPrimitiveType(type)) {
        return type
    } else if (isVectorType(type)) {
        return type.slice(0, -2) as PrimitiveT
    } else if (isListType(type)) {
        return type.slice(0, -4) as PrimitiveT
    } else {
        throw new Error(`Not handled type: ${type}`)
    }
}

export function primitiveAsCollection(type: PrimitiveT, collecion: 'list' | 'vector'): VectorType | ListType {
    if (collecion == 'list') {
        return `${type}[[]]` as ListType
    } else {
        return `${type}[]` as VectorType
    }
}

export const vectorTypes = [Symbols.INT_VECTOR, Symbols.DOUBLE_VECTOR, Symbols.STRING_VECTOR, Symbols.BOOLEAN_VECTOR, Symbols.CHAR_VECTOR]
export const listTypes = [Symbols.INT_LIST, Symbols.DOUBLE_LIST, Symbols.STRING_LIST, Symbols.BOOLEAN_LIST, Symbols.CHAR_LIST]
export const primitiveTypes = [Symbols.INT, Symbols.DOUBLE, Symbols.STRING, Symbols.BOOLEAN, Symbols.CHAR]

export const allTypes = [...vectorTypes, ...listTypes, ...primitiveTypes]