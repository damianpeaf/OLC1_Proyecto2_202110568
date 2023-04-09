import { Statement, StatementArgs } from "../Statement";
import { TypeWiseValueType } from '../../elements/Symbol';

export type ExpressionArgs = StatementArgs

export abstract class Expression extends Statement {

    constructor({ ...args }: ExpressionArgs) {
        super(args);
    }

    // Note: I should use a tranfer object here. -_-
    abstract get returnType(): TypeWiseValueType;
    abstract get value(): any;

    public validateType(type: TypeWiseValueType) {
        if (this.returnType !== type) {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `El tipo de dato ${this.returnType} no es asignable con el tipo ${type}`,
                type: 'Semantico'
            })
            return false
        }
        return true
    }
}
