import {
    TypeWiseState
} from '.';


export type TypeWiseActionType =
    {
        type: 'new-tab'
    } |
    {
        type: 'open-terminal'
    } |
    {
        type: 'close-terminal'
    }



export const typeWiseReducer = (state: TypeWiseState, action: TypeWiseActionType): TypeWiseState => {
    switch (action.type) {
        case 'new-tab':
            return {
                ...state,
            }

        case 'open-terminal':
            return {
                ...state,
                isConsoleOpen: true
            }
        case 'close-terminal':
            return {
                ...state,
                isConsoleOpen: false
            }
        default:
            return state;
    }
}