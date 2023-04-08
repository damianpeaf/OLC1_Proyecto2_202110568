import { Symbols, TypeWiseValueType } from "../../elements";
import { Expression, ExpressionArgs } from "./Expression";


export type TernaryExpressionArgs = ExpressionArgs & {
    condition: Expression;
    trueExpression: Expression;
    falseExpression: Expression;
}

export class TernaryExpression extends Expression {

    public condition: Expression;
    public trueExpression: Expression;
    public falseExpression: Expression;

    private _v: any
    private _t: TypeWiseValueType

    constructor({ condition, trueExpression, falseExpression, ...args }: TernaryExpressionArgs) {
        super(args);
        this.condition = condition;
        this.trueExpression = trueExpression;
        this.falseExpression = falseExpression;
    }

    get returnType(): TypeWiseValueType {
        return this._t
    }
    get value(): any {
        return this._v
    }
    public getGrahpvizLabel(): string {
        return 'Operador ternario'
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode()
        return `
        ${this.linkStatement(this.condition)}

        ${n}QUESTION [label="?"]
        ${n} -> ${n}QUESTION

        ${this.linkStatement(this.trueExpression)}

        ${n}COLON[label=":"]
        ${n} -> ${n}COLON

        ${this.linkStatement(this.falseExpression)}

        `
    }
    public evaluate() {
        this.condition.evaluate()

        const v = this.condition.value
        const t = this.condition.returnType

        if (t === Symbols.BOOLEAN) {
            if (v) {
                this.trueExpression.evaluate()
                this._v = this.trueExpression.value
                this._t = this.trueExpression.returnType
            } else {
                this.falseExpression.evaluate()
                this._v = this.falseExpression.value
                this._t = this.falseExpression.returnType
            }
        } else {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `No se puede aplicar el operador ternario a un valor de tipo ${t}`,
                type: 'Semantico'
            })
            this._t = Symbols.NULL
            this._v = null
        }
    }

}