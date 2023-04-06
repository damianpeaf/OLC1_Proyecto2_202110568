import { PrimitiveT } from "../../elements";
import { Expression, ExpressionArgs } from "./Expression";

export type CastArgs = ExpressionArgs & {
    value: Expression;
    type: PrimitiveT;
}

export class Cast extends Expression {

    public value: Expression;
    public type: PrimitiveT;

    constructor({ value, type, ...args }: CastArgs) {
        super(args);
        this.value = value;
        this.type = type;
    }

    get returnType(): any {
        throw new Error("Method not implemented.");
    }
    public getGrahpvizLabel(): string {
        throw new Error("Method not implemented.");
    }
    public getGrahpvizEdges(): string {
        throw new Error("Method not implemented.");
    }
    public evaluate() {
        throw new Error("Method not implemented.");
    }

}