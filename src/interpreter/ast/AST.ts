import { Context } from "../context";
import { Root } from "./";

export class AST {

    public context: Context

    constructor() {
        this.context = new Context();
    }

    set root(root: Root) {
        this.root = root;
    }

    // TODO : Evaluate the AST

}