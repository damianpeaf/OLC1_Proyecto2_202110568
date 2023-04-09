import { Statement, StatementArgs } from '../Statement';
import { Case, Default } from '../conditional';
import { DoWhile, For, While } from '../loop';


export type BreakArgs = StatementArgs;

export class Break extends Statement {

    constructor(args: BreakArgs) {
        super(args);
    }

    public getGrahpvizLabel(): string {
        return "Break";
    }
    public getGrahpvizEdges(): string {
        return "";
    }
    public evaluate() {
        const item = this.context.callStack.peek();

        if (item && (item instanceof Case || item instanceof Default || item instanceof While || item instanceof For || item instanceof DoWhile)) {

            item.break = true;
            this.context.callStack.pop();

        } else {
            this.context.errorTable.addError({
                type: 'Semantico',
                message: "Unicamente es posible utilizar la sentencia 'break' dentro de un 'case', 'default', 'while', 'for' o 'do-while'.",
                line: this.line,
                column: this.column
            })

        }
    }

}