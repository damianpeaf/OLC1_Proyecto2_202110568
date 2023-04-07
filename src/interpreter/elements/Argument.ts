import { TypeWiseValueType } from "./Symbol";

export type ArgumentArgs = {
    type: TypeWiseValueType[]
    name: string
}

export class Argument {

    public type: TypeWiseValueType[];
    public name: string;

    constructor({ type, name }: ArgumentArgs) {
        this.type = type;
        this.name = name;
    }

}