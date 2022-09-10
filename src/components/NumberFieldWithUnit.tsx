import React, {useState} from 'react';
import styled from '@emotion/styled';

const Container = styled('div')`
  display: block;
  padding: .5rem;
`;

const NumberField = styled('input')`
  margin: 0 .5rem;
  width: 15rem;
  background-color: #fff;
  color: #000;
`;

const REGEX_NUMERIC = /[^0-9]/g;

interface Props {
    unit: string;
    value: string;
    onChange: (newValue: string) => void;
}

function NumberFieldWithUnit({unit, value, onChange}: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = e.target.value.replaceAll(REGEX_NUMERIC, '');
        onChange(newData);
        return true;
    };

    return (
        <Container>
            <NumberField onChange={handleChange} value={value}/>
            {unit}
        </Container>
    );
}

export default NumberFieldWithUnit;
