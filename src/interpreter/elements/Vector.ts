import { Object, PrimitiveT, ObjectArgs, Subroutine, PrimitiveType, TypeWiseValueType } from ".";

export type VectorType = "INT[]" | "DOUBLE[]" | "STRING[]" | "BOOLEAN[]" | "CHAR[]"

export type VectorArgs = Omit<ObjectArgs, 'type'> & {
    primitive: PrimitiveT
}

export class Vector extends Object {

    public primitive: PrimitiveT;

    constructor({ primitive, ...args }: VectorArgs) {
        const type = primitive + '[]' as TypeWiseValueType;
        super({ type, ...args });
        this.primitive = primitive;
    }

    // TODO: Implement data structure for vector
}