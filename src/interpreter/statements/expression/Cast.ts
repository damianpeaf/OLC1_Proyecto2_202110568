import { PrimitiveT } from "../../elements";
import { StatementArgs } from "../Statement";
import { Value } from "../value";
import { Expression } from "./Expression";

export type CastArgs = StatementArgs & {
    value: Expression;
    type: PrimitiveT;
}

export class Cast extends Value {

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
        return `Cast: ${this.type}`;
    }
    public getGrahpvizEdges(): string {
        return `
            ${this.linkStatement(this.value)}
        `
    }
    public evaluate() {
        throw new Error("Method not implemented.");
    }

}