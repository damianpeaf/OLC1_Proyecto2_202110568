import { TypeWiseValueType } from "../../elements";
import { Value } from "../value";
import { Expression, ExpressionArgs } from "./Expression";

export type TerminalExpressionArgs = ExpressionArgs & {
    value: Value
}

export class TerminalExpression extends Expression {

    private _value: Value;

    constructor({ value, ...args }: TerminalExpressionArgs) {
        super(args);
        this._value = value;
    }

    get returnType(): TypeWiseValueType {
        return this._value.type;
    }
    get value(): any {
        return this._value.value;
    }
    public graphviz(): string {
        return `
            ${this.getGrahpvizNodeDefinition()}
            ${this.getGrahpvizEdges()}
        `
    }

    public getGraphvizNode(): string {
        return this._value.getGraphvizNode()
    }

    public getGrahpvizLabel(): string {
        return this._value.getGrahpvizLabel()
    }
    public getGrahpvizEdges(): string {
        return this._value.getGrahpvizEdges()
    }
    public evaluate() {
        this._value.evaluate();
    }


}