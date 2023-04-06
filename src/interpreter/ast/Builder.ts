import { ElementBuilder } from "./ElementBuilder";
import { NodeBuilder } from "./NodeBuilder";


export class Builder {
    static node: NodeBuilder
    static element: ElementBuilder = new ElementBuilder()
}