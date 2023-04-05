import { FC, ReactNode, useReducer, useEffect } from 'react';
import { TypeWiseActionType, TypeWiseContext, typeWiseReducer } from './';

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
    isAstModalOpen: boolean;
    graphviz: string | null;
}

interface TypeWiseProviderProps {
    children: ReactNode
}
const TypeWise_INITIAL_STATE: TypeWiseState =
    localStorage.getItem('state')
        ? JSON.parse(localStorage.getItem('state')!)
        : {
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

    const saveState = () => {
        localStorage.setItem('state', JSON.stringify(state))
    }

    useEffect(() => {
        saveState()
    }, [state])

    return (
        < TypeWiseContext.Provider value={{
            ...state,
            dispatch,
            saveState
        }}>
            {children}
        </ TypeWiseContext.Provider>
    )
}