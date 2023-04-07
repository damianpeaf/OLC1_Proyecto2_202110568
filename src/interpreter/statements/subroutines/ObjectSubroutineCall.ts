import { SubroutineCall } from './';
import { Statement, StatementArgs } from '../Statement';

export type ObjectSubroutineCallArgs = StatementArgs & {
    objectName: string;
    call: SubroutineCall;
};

export class ObjectSubroutineCall extends Statement {

    public objectName: string;
    public call: SubroutineCall;

    constructor({ objectName, call, ...stmtArgs }: ObjectSubroutineCallArgs) {
        super(stmtArgs);

        this.objectName = objectName;
        this.call = call;
    }

    public getGrahpvizLabel(): string {
        return `Llamada a subrutina: \n ${this.objectName}.${this.call.name}`;
    }
    public getGrahpvizEdges(): string {
        const n = this.getGraphvizNode();
        return `
            ${n}Call [label="Llamada"]
            ${n} -> ${n}Call
            ${this.linkStatementsCustom([this.call], n + 'Call')}
        `
    }
    public evaluate() {
        throw new Error('Method not implemented.');
    }



}