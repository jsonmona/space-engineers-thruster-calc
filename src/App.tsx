import React from 'react';
import styled from '@emotion/styled';
import FieldsView from "./components/FieldsView";
import FieldsContext from "./components/FieldsContext";

const AppBox = styled('div')`
  margin: 1rem;
`;

function App() {
    return (
        <FieldsContext>
            <AppBox>
                <FieldsView />
            </AppBox>
        </FieldsContext>
    );
}

export default App;
