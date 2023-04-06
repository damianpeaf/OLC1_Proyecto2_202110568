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