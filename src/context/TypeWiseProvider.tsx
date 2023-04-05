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
    content: `
    
// Este es un comentario de una línea

/*
Este es un comentario
Multilínea
Para este lenguaje
*/

// Declaración de variables
int a=0;
INt A=0;

If(i==1){
int a=15;
Print("soy el numero "+a);
}

    `
}

export interface TypeWiseState {
    isConsoleOpen: boolean;
    documents: DocumentFile[];
    currentDocument: DocumentFile;
    isRenameModalOpen: boolean;
    terminalContent: string;
    isAstModalOpen: boolean;
    graphviz: string | null;
}

interface TypeWiseProviderProps {
    children: ReactNode
}
const TypeWise_INITIAL_STATE: TypeWiseState = {
    isConsoleOpen: false,
    documents: [initialDocument],
    currentDocument: initialDocument,
    isRenameModalOpen: false,
    terminalContent: '',
    isAstModalOpen: false,
    graphviz: null
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