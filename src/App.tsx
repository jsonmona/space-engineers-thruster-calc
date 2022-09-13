import React from 'react';
import styled from '@emotion/styled';
import FieldsView from "./components/FieldsView";
import FieldsContext from "./components/FieldsContext";
import bg from './bg.jpg';

const AppBox = styled('div')`
  padding: 1rem;
  background: no-repeat bottom right/50% url(${bg});
  height: 100vh;
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
