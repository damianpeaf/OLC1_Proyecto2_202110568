import { TypeWiseValueType } from '../../elements';
import { Statement, StatementArgs } from '../Statement';


export type ArgumentArgs = StatementArgs & {
    name: string;
    type: TypeWiseValueType[];
};

export class Argument extends Statement {

    public name: string;
    public type: TypeWiseValueType[];

    constructor({ name, type, ...args }: ArgumentArgs) {
        super(args);

        this.name = name;
        this.type = type;
    }

    public getGrahpvizLabel(): string {
        return `Argumento`;
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode();
        return `
            ${n}NAME [label="Nombre: ${this.name}"];
            ${n} -> ${n}NAME;

            ${n}TYPE [label="Tipo: ${this.type}"];
            ${n} -> ${n}TYPE;
        `
    }
    public evaluate() {

    }

}