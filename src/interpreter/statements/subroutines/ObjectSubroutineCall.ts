import { SubroutineCall } from './';
import { Statement, StatementArgs } from '../Statement';
import { Object, TypeWiseValueType } from '../../elements';

export type ObjectSubroutineCallArgs = StatementArgs & {
    objectName: string;
    call: SubroutineCall;
};

export class ObjectSubroutineCall extends Statement {

    public objectName: string;
    public call: SubroutineCall;


    private _v: any;
    private _t: TypeWiseValueType;


    constructor({ objectName, call, ...stmtArgs }: ObjectSubroutineCallArgs) {
        super(stmtArgs);

        this.objectName = objectName;
        this.call = call;
    }

    public getGrahpvizLabel(): string {
        return `Llamada a subrutina: \n ${this.objectName}.${this.call.name}`;
    }

    get value(): any {
        return this._v;
    }

    get valueType(): TypeWiseValueType {
        return this._t;
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

        const object = this.context.scopeTrace.getVariable(this.objectName);

        if (!object) {
            this.context.errorTable.addError({
                message: `El objeto ${this.objectName} no existe`,
                column: this.column,
                line: this.line,
                type: 'Semantico'
            })
            return;
        }

        if (!(object instanceof Object)) {

            this.context.errorTable.addError({
                message: `La variable ${this.objectName} no es un objeto`,
                column: this.column,
                line: this.line,
                type: 'Semantico'
            })
            return;
        }

        const subroutine = object.subroutines.get(this.call.name);

        if (!subroutine) {
            this.context.errorTable.addError({
                message: `La subrutina ${this.call.name} no existe en el objeto ${this.objectName}`,
                column: this.column,
                line: this.line,
                type: 'Semantico'
            })
            return;
        }

        subroutine.call(this.call.args, this);
        this._v = subroutine.returnValue;
        this._t = subroutine.returnValueType;
    }



}