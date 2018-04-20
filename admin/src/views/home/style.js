// @flow
import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
`;
