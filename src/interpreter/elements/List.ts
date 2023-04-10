
import { Object, PrimitiveT, ObjectArgs, Variable, Symbols, SubroutineType, Argument, TypeWiseType, TypeWiseValueType } from ".";
import { Builder } from "../ast";
import { Expression } from "../statements/expression";
import { EvaluatedInitializerI, InitializerI } from "../statements/value";
import { CollectionI, CollectionItemsT } from './Vector';

export type ListType = "INT[[]]" | "DOUBLE[[]]" | "STRING[[]]" | "BOOLEAN[[]]" | "CHAR[[]]"

export type ListArgs = Omit<ObjectArgs, 'type'> & {
    primitive: PrimitiveT
}


export class List extends Object implements CollectionI {

    public primitive: PrimitiveT;
    public _size: number;
    public _items: CollectionItemsT[];
    public _initiated: boolean = false;

    constructor({ primitive, value = null, ...args }: ListArgs) {
        const type = primitive + '[[]]' as TypeWiseType;
        super({ type, ...args });
        this.primitive = primitive;
        this.initDefaultMethods();

        this._size = 0;
        this._items = [];

        if (value) {
            this.value = value;
        }
    }

    private add(value: Expression): void {
        if (this._initiated) {
            this._size++;
            this._items.push({
                value: value.value,
                type: value.returnType
            });
        }
    }

    private initDefaultMethods(): void {
        this.subroutines.set('add', Builder.element.defaultSubroutine({
            name: 'add',
            object: this,
            parameters: [new Argument({
                name: '1',
                type: [this.primitive]
            })],
            returnType: Symbols.VOID,
            type: SubroutineType.METHOD,
            customCall: ({ args, context }) => {
                this.add(args[0]);
            }
        }));
    }

    public set value({ primitive, reserve, values }: EvaluatedInitializerI) {

        this._initiated = true;

        if (primitive) {
            this._items = [];
            this.initDefaultMethods();
        }

        if (values) {
            this._size = values.length;
            values.forEach((value) => {
                this._items.push({
                    value: value.value,
                    type: value.type
                });
            });
        }

        this._value = {
            primitive,
            reserve,
            values
        };
    }
    public get value() {
        return {
            ...this._value,
            values: this._items
        };
    }
} ''