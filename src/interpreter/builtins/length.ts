import { Builder } from "../ast";
import { Argument, Symbols, isListType, isVectorType, listTypes, vectorTypes } from "../elements";

export const lengthSubroutine = () => Builder.element.defaultSubroutine({
    name: "length",
    type: 'function',
    parameters: [
        new Argument({
            name: "1",
            type: [
                ...vectorTypes,
                ...listTypes,
                Symbols.STRING,
            ],
        })
    ],
    returnType: Symbols.INT,
    customCall: ({ args, context }) => {

        const exp = args[0];

        if (isVectorType(exp.returnType) || isListType(exp.returnType)) {
            return exp.value.values.length;
        } else {
            return exp.value.length;
        }
    }
});