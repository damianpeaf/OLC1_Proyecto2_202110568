
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';

export const Editor = () => {

    const [value, setValue] = useState('')

    console.log(value)
    return (
        <MonacoEditor
            height="100vh"
            defaultValue=""
            value={value}
            theme="vs-dark"
            onChange={(v) => setValue(v || '')}
        />
    )
}
