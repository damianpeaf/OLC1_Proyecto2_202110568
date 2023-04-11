import { Symbols } from '../../elements';
import { Structure } from '../Structure';
import { ConditionalStructure, ConditionalStructureArgs, ElseIf, Else } from './';

export type ifArgs = ConditionalStructureArgs & {
    chain: Structure[];
}

type chainT = ElseIf | Else;

export class If extends ConditionalStructure {

    private chain: chainT[];

    constructor({ chain, ...args }: ifArgs) {
        super(args);
        this.chain = chain;
    }

    public getGrahpvizLabel(): string {
        return 'If';
    }
    public getGrahpvizEdges(): string {

        const n = this.getGraphvizNode()

        return `
            ${this.chain.length > 0
                ? `
                    ${n}A [label="Cadena de anidamiento"];
                    ${n} -> ${n}A;
                    ${this.linkStatementsCustom(this.chain, n + 'A')}
                `
                : ''
            }

        `
    }
    public evaluate() {
        this.condition.evaluate();

        const conditionValue = this.condition.value;
        const conditionType = this.condition.returnType;

        if (conditionType !== Symbols.BOOLEAN) {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `La condicion del if debe ser de tipo booleano, se encontro ${conditionType}`,
                type: 'Semantico'
            })
            return;
        }

        if (conditionValue) {
            this.context.scopeTrace.newScope({
                reason: 'if',
            });

            this.statements.forEach((statement) => statement.evaluate());

            this.context.scopeTrace.endScope();
        } else {
            // Run the chain
            for (let i = 0; i < this.chain.length; i++) {
                const statement = this.chain[i];
                if (statement.evaluate()) {
                    break;
                }
            }
        }
    }

}