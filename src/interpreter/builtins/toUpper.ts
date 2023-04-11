import { Builder } from "../ast";
import { Argument, Symbols } from "../elements";

export const toUpperSubroutine = () => Builder.element.defaultSubroutine({
    name: "toupper",
    type: 'function',
    parameters: [
        new Argument({
            name: "1",
            type: [
                Symbols.STRING,
            ],
        })
    ],
    returnType: Symbols.STRING,
    customCall: ({ args, context }) => {
        return args[0].value.toUpperCase();
    }
});