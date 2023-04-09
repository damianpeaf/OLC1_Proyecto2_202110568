import { Symbols } from '../../elements';
import { ConditionalStructure, ConditionalStructureArgs } from './ConditionalStructure';

export type ElseIfArgs = ConditionalStructureArgs & {
}

export class ElseIf extends ConditionalStructure {

    constructor({ ...args }: ElseIfArgs) {
        super(args);
    }

    public getGrahpvizLabel(): string {
        return 'Else If';
    }
    public getGrahpvizEdges(): string {
        return '';
    }
    public evaluate() {
        this.condition.evaluate();

        const conditionValue = this.condition.value;
        const conditionType = this.condition.returnType;

        if (conditionType !== Symbols.BOOLEAN) {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `La condicion del else if debe ser de tipo booleano, se encontro ${conditionType}`,
                type: 'Semantico'
            })
            return false;
        }

        if (conditionValue) {
            this.context.scopeTrace.newScope({
                reason: 'else-if'
            });

            this.statements.forEach((statement) => statement.evaluate());

            this.context.scopeTrace.endScope();

            return true;
        } else {
            return false;
        }
    }


}