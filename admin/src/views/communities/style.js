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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
`;
