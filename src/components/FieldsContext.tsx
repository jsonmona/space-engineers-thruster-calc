import React, {createContext, useState} from 'react';
import Fields from "../logics/Fields";

export const FieldsContextObject = createContext<[Fields, React.Dispatch<React.SetStateAction<Fields>>]>([new Fields(), ()=>{}]);

interface FieldsContextProps {
    children: any;
}

function FieldsContext({children}: FieldsContextProps) {
    const [fields, setFields] = useState(new Fields());

    return (
        <FieldsContextObject.Provider value={[fields, setFields]}>
            {children}
        </FieldsContextObject.Provider>
    );
}

export default FieldsContext;
