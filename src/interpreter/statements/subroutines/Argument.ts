import { VariableType } from '../../elements';
import { Statement, StatementArgs } from '../Statement';


export type ArgumentArgs = StatementArgs & {
    name: string;
    type: VariableType;
};

export class Argument extends Statement {

    private name: string;
    private type: VariableType;

    constructor({ name, type, ...args }: ArgumentArgs) {
        super(args);

        this.name = name;
        this.type = type;
    }

    public graphviz(): string {
        throw new Error('Method not implemented.');
    }
    public getGrahpvizLabel(): string {
        throw new Error('Method not implemented.');
    }
    public getGrahpvizEdges(): string {
        throw new Error('Method not implemented.');
    }
    public evaluate() {
        throw new Error('Method not implemented.');
    }

}