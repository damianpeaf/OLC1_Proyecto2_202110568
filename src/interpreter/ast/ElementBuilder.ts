import { DefaultSubroutine, DefaultSubroutineArgs, List, ListArgs, Primitive, PrimitiveArgs, PrimitiveType, Subroutine, SubroutineArgs, TypeWiseValueType, Vector, VectorArgs } from "../elements";
import { AST } from "./AST";
import { Builder } from "./Builder";

type BuilderArgs<Type> = Omit<Type, 'context'>;

export class ElementBuilder {

    public astRef: AST;

    constructor(astRef: AST) {
        this.astRef = astRef;
    }

    private addContext<T>(element: T) {
        return {
            ...element,
            context: this.astRef.context
        }
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

    public subroutine(args: BuilderArgs<SubroutineArgs>) {
        return new Subroutine(this.addContext(args))
    }

    public defaultSubroutine(args: BuilderArgs<DefaultSubroutineArgs>) {
        return new DefaultSubroutine(this.addContext(args))
    }

}