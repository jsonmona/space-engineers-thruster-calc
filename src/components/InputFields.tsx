import React, {useState} from 'react';
import styled from '@emotion/styled';
import NumberFieldWithUnit from "./NumberFieldWithUnit";

const Row = styled('div')`
    padding: .5rem;
`;

interface Props {
    fields: Array<FieldInfo>;
    onChange?: (data: DataMap) => void;
}

interface FieldInfo {
    display_name: string;
    name: string;
    unit: string;
}


interface DataMap {
    [Key: string]: string;
}

function InputFields({fields, onChange}: Props) {
    const [values, setValues] = useState(fields.reduce((prev: DataMap, curr) => ({...prev, [curr.name]: ''}), {}));

    const handleChange = (key: string, newValue: string) => {
        setValues(x => ({...x, [key]: newValue}));
        if (onChange)
            onChange({...values, [key]: newValue});
        return true;
    };

    return (
        <div>
            {fields.map(({display_name, name, unit}) => (
                <Row key={name}>
                    {display_name}
                    <NumberFieldWithUnit unit={unit} value={values[name]} onChange={x => handleChange(name, x)} />
                </Row>
            ))}
        </div>
    );
}

export default InputFields;
