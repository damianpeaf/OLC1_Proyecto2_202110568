import { TypeWiseValueType } from '../../elements';
import { StatementArgs } from '../Statement';
import { ObjectSubroutineCall } from '../subroutines';
import { SubroutineCall } from '../subroutines/SubroutineCall';
import { Value } from './';


export type CallType = "DIRECT" | "INCREMENT" | "DECREMENT"

export type CallArgs = StatementArgs & {
    call: SubroutineCall | ObjectSubroutineCall
}

export class Call extends Value {

    private _call: SubroutineCall | ObjectSubroutineCall;
    private _v: any;
    private _t: TypeWiseValueType;

    constructor({ call, ...args }: CallArgs) {
        super(args);

        this._call = call;
    }

    public getGrahpvizLabel(): string {
        if (this._call instanceof ObjectSubroutineCall) {
            return `Llamada a subrutina: ${this._call.objectName}.${this._call.call.name}`;
        } else {
            return `Llamada a subrutina: ${this._call.name}`;
        }
    }

    get type(): TypeWiseValueType {
        return this._t;
    }
    get value(): any {
        return this._v;
    }
    public evaluate() {
        this._call.evaluate();
        this._v = this._call.value;
        this._t = this._call.valueType;
    }

}