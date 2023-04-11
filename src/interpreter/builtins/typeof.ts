import { Builder } from "../ast";
import { Argument, Symbols, allTypes, isListType, isVectorType } from "../elements";

export const typeofSubroutine = () => Builder.element.defaultSubroutine({
    name: "typeof",
    type: 'function',
    parameters: [
        new Argument({
            name: "1",
            type: [
                ...allTypes
            ],
        })
    ],
    returnType: Symbols.STRING,
    customCall: ({ args, context }) => {
        const type = args[0].returnType;

        if (isVectorType(type)) {
            return "vector";
        } else if (isListType(type)) {
            return "lista";
        } else {
            return (type || '').toLowerCase();
        }
    }
});