
import { Object, PrimitiveT, ObjectArgs, Variable, Symbols, SubroutineType, Argument, TypeWiseType, TypeWiseValueType } from ".";
import { Builder } from "../ast";
import { Expression } from "../statements/expression";
import { InitializerI } from "../statements/value";
import { CollectionI } from './Vector';

export type ListType = "INT[[]]" | "DOUBLE[[]]" | "STRING[[]]" | "BOOLEAN[[]]" | "CHAR[[]]"

export type ListArgs = Omit<ObjectArgs, 'type'> & {
    primitive: PrimitiveT
}

type ListItems = Expression | null

export class List extends Object implements CollectionI {

    public primitive: PrimitiveT;
    public _size: number;
    public _items: (Expression | null)[];
    public _initiated: boolean = false;

    constructor({ primitive, ...args }: ListArgs) {
        const type = primitive + '[[]]' as TypeWiseType;
        super({ type, ...args });
        this.primitive = primitive;
        this.initDefaultMethods();

        this._size = 0;
        this._items = [];
    }

    private add(value: Expression): void {
        if (this._initiated) {
            this._size++;
            this._items.push(value);
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

    public set value({ primitive, reserve, values }: InitializerI) {

        this._initiated = true;

        if (primitive) {
            this._items = [];
            this.initDefaultMethods();
        }

        this._value = {
            primitive,
            reserve,
            values
        };
    }
    public get value() {
        return this._value;
    }
    // TODO: Implement _items structure for List
}