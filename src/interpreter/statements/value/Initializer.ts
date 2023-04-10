import { Symbols, TypeWiseValueType } from "../../elements";
import { StatementArgs } from "../Statement";
import { Expression } from "../expression";
import { Value } from "./";

export type InitializerT = 'list' | 'vector'

export interface InitializerI {
    values?: Expression[] | null;
    primitive?: TypeWiseValueType;
    reserve?: Expression | null
}

export interface EvaluatedInitializerI {
    values?: {
        value: any;
        type: TypeWiseValueType;
    }[] | null;
    primitive?: TypeWiseValueType;
    reserve?: Expression | null
}

export type InitializerArgs = StatementArgs & {
    initializer: InitializerI
    objectType: InitializerT
};

export class Initializer extends Value {


    public objectType: InitializerT;
    public initializer: Required<InitializerI>;
    private _type: TypeWiseValueType;

    constructor({
        objectType,
        initializer: { values = null, primitive = null, reserve = null },
        ...args
    }: InitializerArgs) {
        super(args);
        this.objectType = objectType;
        this.initializer = {
            values,
            primitive,
            reserve
        };


    }

    public getGrahpvizLabel(): string {
        return `Inicializador: \n ${this.type}`;
    }

    public getGrahpvizEdges(): string {
        return '';
    }

    public evaluate() {

        const { reserve, primitive, values } = this.initializer

        if (this.objectType === InitializerType.VECTOR) {

            if (this.initializer.values) {
                // Check if all values are the same type

                if (this.initializer.values.length === 0) {
                    this.context.errorTable.addError({
                        column: this.column,
                        line: this.line,
                        message: `Se debe inicializar el vector con al menos un valor`,
                        type: 'Semantico'
                    });
                    this._type = null;
                    return;
                }

                this.initializer.values.forEach((value) => {
                    value.evaluate();
                });

                const type = this.initializer.values[0].returnType;

                const same = this.initializer.values.every((value) => {
                    return value.returnType === type;
                });

                if (!same) {
                    this.context.errorTable.addError({
                        column: this.column,
                        line: this.line,
                        message: `Los valores del inicializador del vector deben ser del mismo tipo`,
                        type: 'Semantico'
                    });
                    this._type = null;
                    return;
                }

                this._type = type + '[]' as TypeWiseValueType;
            }

            if (reserve) {

                reserve.evaluate();

                if (reserve.returnType === Symbols.DOUBLE && reserve.value % 1 !== 0) {
                    this.context.errorTable.addError({
                        message: `El valor ${reserve.value} no puede ser un valor decimal para reservar un vector`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                if (!(reserve.returnType === Symbols.INT || reserve.returnType === Symbols.DOUBLE)) {
                    this.context.errorTable.addError({
                        message: `El valor ${reserve.value} de tipo ${reserve.returnType} no puede ser un indice`,
                        line: this.line,
                        column: this.column,
                        type: 'Semantico'
                    });
                    return;
                }

                this._type = this.initializer.primitive + '[]' as TypeWiseValueType;
            }
        }

        if (this.objectType === InitializerType.LIST) {
            this._type = this.initializer.primitive + '[[]]' as TypeWiseValueType;
        }


    }

    get type(): TypeWiseValueType {
        return this._type;
    }
    get value(): EvaluatedInitializerI {
        return {
            primitive: this.initializer.primitive,
            reserve: this.initializer.reserve,
            values: this.initializer.values?.map((value) => {
                return {
                    value: value.value,
                    type: value.returnType
                }
            })
        }
    }
}


export class InitializerType {
    public static readonly VECTOR: InitializerT = 'vector';
    public static readonly LIST: InitializerT = 'list';
}