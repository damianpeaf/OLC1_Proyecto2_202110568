
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';

export const Editor = () => {

    const [value, setValue] = useState('')

    return (
        <MonacoEditor
            defaultValue=""
            value={value}
            theme="vs-dark"
            onChange={(v) => setValue(v || '')}
            options={{
                fontSize: "20px",
            }}
        />
    )
}
