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

            parser.parseError = (error, hash) => {
                Builder.ast.context.errorTable.addError({
                    message: `Se esperaba los tokens: ${hash.expected.join(', ')} pero se encontro: ${hash.text}`,
                    line: hash.loc.last_line,
                    column: hash.loc.last_column,
                    type: 'Sintactico'
                })

                throw Error(error)
            }

            const root = parser.parse(input) as Root;
            if (this.ast.context.errorTable.errors.length > 0) {
                return false
            }

            this.ast.root = root;
            // console.log(this.ast.graphviz)
            this.ast.run();

            console.log(this.ast.context.scopeTrace.globalScope)

            return true
        } catch (error) {
            return false
        }
    }

}