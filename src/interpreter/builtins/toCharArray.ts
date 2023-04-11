import { Builder } from "../ast";
import { Argument, Symbols } from "../elements";
import { EvaluatedInitializerI } from "../statements/value";

export const toCharArraySubroutine = () => Builder.element.defaultSubroutine({
    name: "tochararray",
    type: 'function',
    parameters: [
        new Argument({
            name: "1",
            type: [
                Symbols.STRING
            ],
        })
    ],
    returnType: Symbols.CHAR_LIST,
    customCall: ({ args, context }) => {
        const { value } = args[0];

        const initializer: EvaluatedInitializerI = {
            primitive: Symbols.CHAR,
            values: value.split('').map((char: string) => ({
                value: char,
                type: Symbols.CHAR
            })),
        }

        return initializer
    }
});