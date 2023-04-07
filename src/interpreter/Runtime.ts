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
            Builder.node = new NodeBuilder(this.ast);
            const parser = new AnalyzerParser();
            const root = parser.parse(input) as Root;
            console.log(root)
            this.ast.root = root;

            // TODO: run ast
            console.log(this.ast.graphviz)

            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

}