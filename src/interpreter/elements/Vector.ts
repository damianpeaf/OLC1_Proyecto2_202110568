import { Object, PrimitiveT, ObjectArgs, Subroutine, PrimitiveType, TypeWiseValueType } from ".";
import { Expression } from "../statements/expression";
import { EvaluatedInitializerI, InitializerI } from "../statements/value";

export type VectorType = "INT[]" | "DOUBLE[]" | "STRING[]" | "BOOLEAN[]" | "CHAR[]"

export type CollectionItemsT = { value: any, type: TypeWiseValueType } | null
export interface CollectionI {
    _size: number;
    _items: CollectionItemsT[];
    _initiated: boolean;
}

export type VectorArgs = Omit<ObjectArgs, 'type'> & {
    primitive: PrimitiveT
}


export class Vector extends Object implements CollectionI {

    public primitive: PrimitiveT;

    public _size: number = 0;
    public _items: CollectionItemsT[] = [];
    public _initiated: boolean = false;

    constructor({ primitive, value = null, ...args }: VectorArgs) {
        const type = primitive + '[]' as TypeWiseValueType;
        super({ type, ...args });
        this.primitive = primitive;

        if (value) {
            this.value = value;
        }
    }

    set value({ primitive, reserve, values }: EvaluatedInitializerI) {

        this._initiated = true;

        if (values) {
            this._size = values.length;
            values.forEach((value) => {
                this._items.push({
                    value: value.value,
                    type: value.type
                });
            });
        } else if (reserve) {
            reserve.evaluate();
            this._size = reserve.value;

            for (let i = 0; i < this._size; i++) {
                this._items.push(null);
            }
        }

        this._value = {
            primitive,
            reserve,
            values
        };
    }

    get value() {
        return {
            ...this._value,
            values: this._items
        };
    }

}