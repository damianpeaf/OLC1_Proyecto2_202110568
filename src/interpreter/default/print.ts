import { Builder } from "../ast";
import { Argument, Symbols } from "../elements";

export const printSubroutine = () => Builder.element.defaultSubroutine({
    name: "print",
    type: 'method',
    parameters: [
        new Argument({
            name: "value",
            type: [
                Symbols.INT,
                Symbols.DOUBLE,
                Symbols.STRING,
                Symbols.BOOLEAN,
                Symbols.CHAR,
            ],
        })
    ],
    returnType: Symbols.VOID,
    body: [],
    object: null,
    customCall: ({ args, context }) => {
        context.console.writeln(args[0].value);
        return Symbols.VOID;
    }

});