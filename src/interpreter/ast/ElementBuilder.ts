import { List, ListArgs, Primitive, PrimitiveArgs, Vector, VectorArgs } from "../elements";


export class ElementBuilder {

    constructor() {
    }

    public primitive(args: PrimitiveArgs) {
        return new Primitive(args)
    }

    public vector(args: VectorArgs) {
        return new Vector(args)
    }

    public list(args: ListArgs) {
        return new List(args)
    }
}