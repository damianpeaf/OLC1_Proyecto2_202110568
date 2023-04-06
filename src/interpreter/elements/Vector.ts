import { Object, PrimitiveT, ObjectArgs, Subroutine, PrimitiveType } from ".";

export type VectorType = "INT[]" | "DOUBLE[]" | "STRING[]" | "BOOLEAN[]" | "CHAR[]"

export type VectorArgs = ObjectArgs & {
    primitive: PrimitiveT
}

export class Vector extends Object {

    public primitive: PrimitiveT;

    constructor({ primitive, ...args }: Omit<VectorArgs, 'type'>) {
        const type = primitive + '[]'
        super({ type, ...args });
        this.primitive = primitive;
    }

    // TODO: Implement data structure for vector
}