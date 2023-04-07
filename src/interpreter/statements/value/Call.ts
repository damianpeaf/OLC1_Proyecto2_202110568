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

    constructor({ call, ...args }: CallArgs) {
        super(args);

        this._call = call;
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