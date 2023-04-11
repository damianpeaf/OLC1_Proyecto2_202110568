import { Builder } from "../ast";
import { Argument, Symbols } from "../elements";

export const toStringSubroutine = () => Builder.element.defaultSubroutine({
    name: "tostring",
    type: 'function',
    parameters: [
        new Argument({
            name: "1",
            type: [
                Symbols.INT,
                Symbols.DOUBLE,
                Symbols.BOOLEAN,
                Symbols.STRING,
            ],
        })
    ],
    returnType: Symbols.STRING,
    customCall: ({ args, context }) => {
        const { returnType, value } = args[0];

        if (returnType === Symbols.INT || returnType === Symbols.DOUBLE || returnType === Symbols.BOOLEAN) {
            return value.toString();
        } else if (returnType === Symbols.STRING) {
            return value;
        }
    }
});