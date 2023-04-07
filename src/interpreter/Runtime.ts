import { AnalyzerParser } from "./analyzer/analyzer";
import { AST, Builder, NodeBuilder, Root } from "./ast";
export class Runtime {

    public ast: AST | null

    constructor() {
        this.ast = null
    }

    public run(input: string) {
        this.ast = new AST();

        try {
            const builder = new Builder(this.ast);
            const parser = new AnalyzerParser();
            const root = parser.parse(input) as Root;
            this.ast.root = root;

            // TODO: run ast
            // console.log(this.ast.graphviz)
            this.ast.evalGlobalState();

            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

}