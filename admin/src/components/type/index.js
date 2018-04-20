// @flow
import styled from 'styled-components';

export const H1 = styled.h1`
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.text.default};
  line-height: 1.41;
`;

export const H2 = styled.h2`
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.text.default};
  line-height: 1.41;
`;

export const H3 = styled.h3`
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.text.default};
  line-height: 1.41;
`;

export const H4 = styled.h4`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.text.default};
  line-height: 1.41;
`;

export const H5 = styled.h5`
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.text.alt};
  line-height: 1.41;
`;

export const H6 = styled.h6`
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props => props.theme.text.alt};
  line-height: 1.41;
`;
