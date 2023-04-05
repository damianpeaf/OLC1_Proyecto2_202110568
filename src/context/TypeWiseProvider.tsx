import { FC, ReactNode, useReducer } from 'react';
import { TypeWiseContext, typeWiseReducer } from './';

export interface DocumentFile {
    id: number;
    name: string;
    content: string;
}

export const initialDocument: DocumentFile = {
    id: 0,
    name: 'Untitled',
    content: ''
}

export interface TypeWiseState {
    isConsoleOpen: boolean;
    documents: DocumentFile[];
    currentDocument: DocumentFile;
    isRenameModalOpen: boolean;
    terminalContent: string;
}

interface TypeWiseProviderProps {
    children: ReactNode
}
const TypeWise_INITIAL_STATE: TypeWiseState = {
    isConsoleOpen: false,
    documents: [initialDocument],
    currentDocument: initialDocument,
    isRenameModalOpen: false,
    terminalContent: ''
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