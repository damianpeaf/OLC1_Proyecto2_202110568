import { AnalyzerParser } from "./analyzer/analyzer";
import { AST, Builder, NodeBuilder, Root } from "./ast";


export class Runtime {

    public run(input: string) {
        try {
            const ast = new AST();
            Builder.node = new NodeBuilder(ast);
            const parser = new AnalyzerParser();
            const root = parser.parse(input) as Root;
            ast.root = root;

            // TODO: run ast
            console.log(ast)

            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

}