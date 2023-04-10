import { List, Symbols, TypeWiseValueType, Variable, Vector } from '../../elements';
import { StatementArgs } from '../Statement';
import { Expression } from '../expression';
import { Value } from './';
import { typeWiseReducer } from '../../../context/typewise-reducer';
import { Scope } from '../../context/scope-trace';

export type ReferenceT = "DIRECT" | "INCREMENT" | "DECREMENT" | "INDEXED";

export type ReferenceArgs = StatementArgs & {
    name: string;
    type: ReferenceT;
    index?: Expression | null;
    indexType?: 'vector' | 'list' | null;
}

export class Reference extends Value {

    private _name: string;
    private _type: ReferenceT;
    private _index: Expression | null;
    private _indexType: 'vector' | 'list' | null;

    private _v: any;
    private _t: TypeWiseValueType;
    private sourceScope: Scope | null;

    constructor({ name, type, index = null, indexType = null, ...args }: ReferenceArgs) {
        super(args);

        this._name = name;
        this._type = type;
        this._index = index;

        this._v = null;
        this._t = Symbols.NULL;
        this._indexType = indexType;
        this.sourceScope = null;
    }

    get type(): TypeWiseValueType {
        return this._t;
    }
    get value(): any {
        return this._v;
    }

    public getGrahpvizLabel(): string {
        return `Referencia: ${this._name}`;
    }

    public evaluate() {
        let variable: Variable | null = null;

        if (this.sourceScope) {
            variable = this.sourceScope.getVariable(this._name);
        } else {
            variable = this.context.scopeTrace.getVariable(this._name);
            this.sourceScope = this.context.scopeTrace.currentScope;
        }

        if (!variable) {
            this.context.errorTable.addError({
                column: this.column,
                line: this.line,
                message: `La variable '${this._name}' no ha sido declarada`,
                type: 'Semantico'
            })
            return;
        }

        switch (this._type) {

            case ReferenceType.DIRECT:
                this._v = variable.value;
                this._t = variable.type;
                break;

            case ReferenceType.INCREMENT:

                if (variable.type === Symbols.INT || variable.type === Symbols.DOUBLE) {
                    this._v = variable.value + 1;
                    this._t = variable.type;
                    variable.value = this._v;
                } else {
                    this.context.errorTable.addError({
                        column: this.column,
                        line: this.line,
                        message: `La variable '${this._name}' no es de tipo numerico`,
                        type: 'Semantico'
                    })
                }
                break;

            case ReferenceType.DECREMENT:
                if (variable.type === Symbols.INT || variable.type === Symbols.DOUBLE) {

                    this._v = variable.value - 1;
                    this._t = variable.type;
                    variable.value = this._v;
                }
                else {
                    this.context.errorTable.addError({
                        column: this.column,
                        line: this.line,
                        message: `La variable '${this._name}' no es de tipo numerico`,
                        type: 'Semantico'
                    })
                }
                break;

            case ReferenceType.INDEXED:

                if (!(variable instanceof List || variable instanceof Vector)) {
                    this.context.errorTable.addError({
                        message: `La variable ${name} no es de tipo lista o vector`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (variable instanceof List) {
                    if (this._indexType !== 'list') {
                        this.context.errorTable.addError({
                            message: `La variable ${name} es de tipo lista y no vector`,
                            line: this.line,
                            column: this.column,
                            type: 'Semantico'
                        });
                        return;
                    }
                }

                if (variable instanceof Vector) {
                    if (this._indexType !== 'vector') {
                        this.context.errorTable.addError({
                            message: `La variable ${name} es de tipo vector y no lista`,
                            line: this.line,
                            column: this.column,
                            type: 'Semantico'
                        });
                        return;
                    }
                }

                if (!this._index) {
                    throw new Error('Index is null');
                }

                this._index.evaluate();
                const indexReturnType = this._index.returnType;

                if (indexReturnType === Symbols.DOUBLE && this._index.value % 1 !== 0) {
                    this.context.errorTable.addError({
                        message: `El valor ${this._index.value} no puede ser un indice`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (!(indexReturnType === Symbols.INT || indexReturnType === Symbols.DOUBLE)) {
                    this.context.errorTable.addError({
                        message: `El valor ${this._index.value} de tipo ${indexReturnType} no puede ser un indice`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (!variable._initiated) {
                    this.context.errorTable.addError({
                        message: `La variable ${variable.name} no ha sido inicializada`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (this._index.value < 0 || this._index.value >= variable._items.length) {
                    this.context.errorTable.addError({
                        message: `El indice ${this._index.value} esta fuera de rango`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                const resultant = variable._items[this._index.value];

                if (resultant) {
                    resultant.evaluate();
                    this._v = resultant.value;
                    this._t = resultant.returnType;
                } else {
                    this.context.errorTable.addError({
                        message: `El valor solicitado en la posicion ${this._index.value} no ha sido inicializado`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                break;
        }
    }
}

export class ReferenceType {
    public static readonly DIRECT: ReferenceT = "DIRECT";
    public static readonly INCREMENT: ReferenceT = "INCREMENT";
    public static readonly DECREMENT: ReferenceT = "DECREMENT";
    public static readonly INDEXED: ReferenceT = "INDEXED";
}