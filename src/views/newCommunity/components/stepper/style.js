// @flow
// $FlowFixMe
import styled from 'styled-components';
import { zIndex } from '../../../../components/globals';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 32px;
`;

export const Line = styled.span`
  position: absolute;
  height: 1px;
  background: ${props => props.theme.bg.border};
  top: 50%;
  left: 24px;
  right: 24px;
  transform: translateY(-50%);
  z-index: ${zIndex.base};
`;

export const Step = styled.div`
  width: 32px;
  height: 32px;
  font-size: 16px;
  color: ${props =>
    props.active ? props.theme.brand.default : props.theme.text.alt};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 2px solid
    ${props =>
      props.active ? props.theme.brand.default : props.theme.bg.border};
  font-weight: 700;
  background: ${props =>
    props.active ? props.theme.bg.default : props.theme.bg.wash};
  z-index: ${zIndex.base + 1};
  position: relative;
`;
