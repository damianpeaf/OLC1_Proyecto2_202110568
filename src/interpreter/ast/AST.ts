import { Context } from "../context";
import { Root } from "./";

export class AST {

    public context: Context
    private _root: Root | null

    constructor() {
        this.context = new Context();
        this._root = null;
    }

    set root(root: Root) {
        this._root = root;
    }

    get root(): Root {
        return this._root as Root;
    }

    // TODO : Evaluate the AST

}