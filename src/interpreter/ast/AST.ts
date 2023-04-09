import { Context } from "../context";
import { printSubroutine } from "../default";
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

    get graphviz(): string | null {
        if (this._root) {
            return this._root.graphviz().replace(/[\t\n]+/g, '')
        }
        return null;
    }

    public run() {
        if (this._root) {
            this.initDefaults();
            return this._root.evalGlobalState()
        }
        return null;
    }

    private initDefaults() {
        this.context.scopeTrace.addSubroutine(printSubroutine())
    }
}