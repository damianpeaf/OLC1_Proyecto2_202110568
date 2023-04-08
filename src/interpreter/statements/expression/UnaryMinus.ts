import { Symbols, TypeWiseValueType } from '../../elements';
import { UnaryExpression } from './UnaryExpression';

export class UnaryMinus extends UnaryExpression {

    private _v: any
    private _t: TypeWiseValueType

    get returnType(): TypeWiseValueType {
        return this._t
    }
    get value(): any {
        return this._v
    }
    public getGrahpvizLabel(): string {
        return 'Negación Unaria'
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode()
        return `
            ${n}MINUS [label="-"]
            ${this.linkStatementCustom(this.operand, n + 'MINUS')}
        `
    }
    public evaluate() {
        this.operand.evaluate()

        const v = this.operand.value
        const t = this.operand.returnType

        // Just works for INT and DOUBLE

        if (t === Symbols.INT || t === Symbols.DOUBLE) {
            this._v = -v
            this._t = t
        } else {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `No se puede aplicar el operador - a un valor de tipo ${t}`,
                type: 'Semantico'
            })
            this._t = Symbols.NULL
            this._v = null

        }
    }

}