import { FC, ReactNode, useReducer } from 'react';
import { TypeWiseContext, typeWiseReducer } from './';

export interface TypeWiseState {
    isConsoleOpen: boolean;
}

interface TypeWiseProviderProps {
    children: ReactNode
}
const TypeWise_INITIAL_STATE: TypeWiseState = {
    isConsoleOpen: false
}

export const TypeWiseProvider: FC<TypeWiseProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(typeWiseReducer, TypeWise_INITIAL_STATE)

    return (
        < TypeWiseContext.Provider value={{
            ...state,
            dispatch
        }}>
            {children}
        </ TypeWiseContext.Provider>
    )
}