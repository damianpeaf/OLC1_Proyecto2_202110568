import { createContext } from 'react';
import { TypeWiseActionType, TypeWiseState } from '.';

interface ContextProps extends TypeWiseState {
    dispatch: React.Dispatch<TypeWiseActionType>,
    saveState: () => void
}

export const TypeWiseContext = createContext({} as ContextProps);