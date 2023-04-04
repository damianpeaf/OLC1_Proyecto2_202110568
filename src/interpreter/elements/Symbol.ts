export type SymbolType = "RETURN" | "BREAK" | "CONTINUE" | "NULL" | "VOID"

export type NullType = "NULL"

export type VoidType = "VOID"

export class Symbols {
    static RETURN: SymbolType = "RETURN"
    static BREAK: SymbolType = "BREAK"
    static CONTINUE: SymbolType = "CONTINUE"
    static NULL: NullType = "NULL"
    static VOID: VoidType = "VOID"
}