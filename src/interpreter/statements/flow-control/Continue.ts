import { Statement, StatementArgs } from '../Statement';
import { DoWhile, For, While } from '../loop';


export type ContinueArgs = StatementArgs;

export class Continue extends Statement {


    constructor(args: ContinueArgs) {
        super(args);
    }

    public getGrahpvizLabel(): string {
        return "Continue";
    }
    public getGrahpvizEdges(): string {
        return "";
    }
    public evaluate() {
        const item = this.context.callStack.peek();

        if (item && (item instanceof While || item instanceof For || item instanceof DoWhile)) {
            item.continue = true;
        } else {
            this.context.errorTable.addError({
                type: 'Semantico',
                message: "Unicamente es posible utilizar la sentencia 'continue' en estructuras ciclicas como: 'while', 'for' o 'do-while'.",
                line: this.line,
                column: this.column
            })

        }
    }

}