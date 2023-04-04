import { Expression, ExpressionArgs, ExpressionReturnType } from "./Expression";


export type TernaryExpressionArgs = ExpressionArgs & {
    condition: Expression;
    trueExpression: Expression;
    falseExpression: Expression;
}

export class TernaryExpression extends Expression {

    public condition: Expression;
    public trueExpression: Expression;
    public falseExpression: Expression;

    constructor({ condition, trueExpression, falseExpression, ...args }: TernaryExpressionArgs) {
        super(args);
        this.condition = condition;
        this.trueExpression = trueExpression;
        this.falseExpression = falseExpression;
    }

    get returnType(): ExpressionReturnType {
        throw new Error("Method not implemented.");
    }
    get value(): any {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }

}