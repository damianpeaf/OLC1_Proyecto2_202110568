import { Statement, StatementArgs } from "..";
import { Expression } from "../expression";

type VariableAssigmentT = 'direct' | 'increment' | 'decrement'

export type VariableAssigmentArgs = StatementArgs & {
    type: VariableAssigmentT;
    name: string;
    value?: Expression | null;
}
// TODO: Array and Vector

export class VariableAssigment extends Statement {

    private type: VariableAssigmentT;
    private name: string;
    private value: Expression | null;

    constructor({ name, value = null, type, ...stmtArgs }: VariableAssigmentArgs) {
        super(stmtArgs);

        this.name = name;
        this.value = value;
        this.type = type;
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
}