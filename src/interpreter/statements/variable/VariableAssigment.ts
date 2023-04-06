import { Statement, StatementArgs } from "..";
import { Expression } from "../expression";

type VariableAssigmentT = 'direct' | 'increment' | 'decrement' | 'indexed'

interface Reference {
    name: string;
    index?: Expression | null;
}

export type VariableAssigmentArgs = StatementArgs & {
    type: VariableAssigmentT;
    reference: Reference;
    value?: Expression | null;
}
// TODO: Array and Vector

export class VariableAssigment extends Statement {

    public type: VariableAssigmentT;
    public value: Expression | null;
    public reference: Required<Reference>;


    constructor({ reference: { name, index = null }, value = null, type, ...stmtArgs }: VariableAssigmentArgs) {
        super(stmtArgs);

        this.value = value;
        this.type = type;
        this.reference = { name, index };
    }

    public graphviz(): string {
        throw new Error("Method not implemented.");
    }
    public getGrahpvizLabel(): string {
        throw new Error("Method not implemented.");
    }
    public getGrahpvizEdges(): string {
        throw new Error("Method not implemented.");
    }
    public evaluate() {

        // Get the variables from the context

        throw new Error("Method not implemented.");
    }

}

export class VariableAssigmentType {
    public static readonly DIRECT = 'direct';
    public static readonly INCREMENT = 'increment';
    public static readonly DECREMENT = 'decrement';
    public static readonly INDEXED = 'indexed';
}