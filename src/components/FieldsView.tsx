import React, {useContext} from 'react';
import styled from '@emotion/styled';
import NumberFieldWithUnit from "./NumberFieldWithUnit";
import {FieldsContextObject} from "./FieldsContext";
import {field_descriptions, field_names} from "../logics/FieldDescription";
import UnitValue from "../logics/UnitValue";

const Box = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

const Row = styled('div')`
  padding: .5rem;
  width: 30rem;
  min-width: 25rem;
`;

function FieldsView() {
    const [fields, setFields] = useContext(FieldsContextObject);

    const handleNumberChange = (key: string, newValue: string) => {
        const value = Number.parseFloat(newValue) || 0;
        setFields(prev => prev.update(fields => { fields[key] = value; }));
        return true;
    }

    const handleUnitChange = (key: string, newValue: string) => {
        const value = Number.parseFloat(newValue) || 0;
        const desc = field_descriptions[key];
        setFields(prev => prev.update(fields => { fields[key] = new UnitValue(value, desc.preferred_prefix!, desc.unit!); }));
        return true;
    }

    const mapper = (key: string, readonly: boolean) => {
        const desc = field_descriptions[key];
        if (typeof desc === 'undefined')
            throw new Error(`Unable to find key ${key} from field_descriptions`);
        const field = fields[key] as number | UnitValue;
        if (typeof field === 'undefined')
            throw new Error(`Unable to find key ${key} from fields`);

        if (desc.readonly !== readonly)
            return null;

        if (typeof field === 'number')
            return (
                <Row key={key}>
                    {desc.display_name}
                    <NumberFieldWithUnit unit={''} value={fields[key]} onChange={x => handleNumberChange(key, x)} readonly={desc.readonly} />
                </Row>
            );
        else
            return (
                <Row key={key}>
                    {desc.display_name}
                    <NumberFieldWithUnit unit={desc.preferred_prefix + desc.unit!} value={fields[key].getValueWithPrefix(desc.preferred_prefix!)} onChange={x => handleUnitChange(key, x)} readonly={desc.readonly} />
                </Row>
            );
    }

    return (
        <>
            <Box>
                {field_names.map(key => mapper(key, false))}
            </Box>
            <Box>
                {field_names.map(key => mapper(key, true))}
            </Box>
        </>
    );
}

export default FieldsView;
