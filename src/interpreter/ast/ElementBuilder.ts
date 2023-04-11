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

    public primitive(args: BuilderArgs<PrimitiveArgs>) {
        return new Primitive(this.addContext(args))
    }

    public vector(args: BuilderArgs<VectorArgs>) {
        return new Vector(this.addContext(args))
    }

    public list(args: BuilderArgs<ListArgs>) {
        return new List(this.addContext(args))
    }

    public subroutine(args: BuilderArgs<SubroutineArgs>) {
        return new Subroutine(this.addContext(args))
    }

    public defaultSubroutine(args: BuilderArgs<Omit<DefaultSubroutineArgs, 'line' | 'column'>>) {
        return new DefaultSubroutine({
            ...this.addContext(args),
            line: 0,
            column: 0
        })
    }

}