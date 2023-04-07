import { AST } from "./AST";
import { ElementBuilder } from "./ElementBuilder";
import { NodeBuilder } from "./NodeBuilder";


export class Builder {

    constructor(ast: AST) {
        Builder.element = new ElementBuilder(ast)
        Builder.node = new NodeBuilder(ast)
    }

    static node: NodeBuilder
    static element: ElementBuilder
}