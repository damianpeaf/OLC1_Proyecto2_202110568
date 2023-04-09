import { Symbols, TypeWiseValueType } from '../../elements';
import { UnaryExpression } from './UnaryExpression';

export class UnaryNegation extends UnaryExpression {

    private _t: TypeWiseValueType
    private _v: any

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
            ${n}NEG [label="!]
            ${n} -> ${n}NEG

            ${this.linkStatement(this.operand)}
            `
    }
    public evaluate() {
        this.operand.evaluate();

        const v = this.operand.value;
        const t = this.operand.returnType;

        if (t === Symbols.BOOLEAN) {
            this._v = !v;
            this._t = Symbols.BOOLEAN;
        } else {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `No se puede aplicar el operador ! a un valor de tipo ${t}`,
                type: 'Semantico'
            })
            this._t = Symbols.NULL;
            this._v = null;
        }

    }

}