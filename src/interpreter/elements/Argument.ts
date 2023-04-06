import { TypeWiseType } from "./Symbol";

export type ArgumentArgs = {
    type: TypeWiseType
    name: string
}

export class Argument {

    public type: TypeWiseType;
    public name: string;

    constructor({ type, name }: ArgumentArgs) {
        this.type = type;
        this.name = name;
    }

}