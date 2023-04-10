import { Subroutine, Symbols } from '../../elements';
import { Statement, StatementArgs } from '../Statement';
import { Expression } from '../expression';


export type ReturnArgs = StatementArgs & {
    value?: Expression | null;
};

export class Return extends Statement {

    public value: Expression | null;

    constructor({ value = null, ...args }: ReturnArgs) {
        super(args);
        this.value = value;
    }

    public getGrahpvizLabel(): string {
        return `Return`;
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode();

        return this.value ? `
            ${n}Value[label="value"];
            ${n} -> ${n}Value;

            ${this.linkStatementCustom(this.value, n + "Value")}
        ` : "";
    }
    public evaluate() {
        if (this.value) {
            this.value.evaluate();
        }

        let item = this.context.callStack.pop();

        while (item && !(item instanceof Subroutine)) {
            item = this.context.callStack.pop(); // remove all non-subroutines from call stack
        }

        if (item) {
            item.return = true;
            item.returnValue = this.value ? this.value.value : Symbols.VOID;
            item.returnValueType = this.value ? this.value.returnType : Symbols.VOID;
        } else {
            this.context.errorTable.addError({
                message: `No se puede retornar fuera de una subrutina`,
                column: this.column,
                line: this.line,
                type: 'Semantico'
            })
        }

    }

}