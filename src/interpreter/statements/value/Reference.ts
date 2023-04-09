import { Symbols, TypeWiseValueType, TypeWiseVariableType, Variable } from '../../elements';
import { StatementArgs } from '../Statement';
import { Expression } from '../expression';
import { Value } from './';


export type ReferenceT = "DIRECT" | "INCREMENT" | "DECREMENT"

export type ReferenceArgs = StatementArgs & {
    name: string;
    type: ReferenceT;
    index?: Expression | null;
}

export class Reference extends Value {

    private _name: string;
    private _type: ReferenceT;
    private _index: Expression | null;
    private _variable: Variable | null;

    constructor({ name, type, index = null, ...args }: ReferenceArgs) {
        super(args);

        this._name = name;
        this._type = type;
        this._index = index;
        this._variable = null;

    }

    get type(): TypeWiseValueType {
        return this._variable?.type ?? Symbols.NULL;
    }
    get value(): any {
        if (this._variable) {
            return this._variable.value;
        }
        return null;
    }


    public getGrahpvizLabel(): string {
        return `Referencia: ${this._name}`;
    }

    public evaluate() {
        this._variable = this.context.scopeTrace.getVariable(this._name);
        // TODO: SOPORT FOR INDEX

        if (!this._variable) {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `La variable '${this._name}' no ha sido declarada`,
                type: 'Semantico'
            })
        }
    }
}

export class ReferenceType {
    public static readonly DIRECT: ReferenceT = "DIRECT";
    public static readonly INCREMENT: ReferenceT = "INCREMENT";
    public static readonly DECREMENT: ReferenceT = "DECREMENT";
}