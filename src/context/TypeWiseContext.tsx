import { createContext } from 'react';
import { TypeWiseActionType, TypeWiseState } from '.';

interface ContextProps extends TypeWiseState {
    dispatch: React.Dispatch<TypeWiseActionType>
}

export const TypeWiseContext = createContext({} as ContextProps);