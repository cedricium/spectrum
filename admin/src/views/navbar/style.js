// @flow
import styled from 'styled-components';
import Link from '../../../src/components/link';
import { hexa } from '../../components/globals';

export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 240px;
  background: ${({ theme }) => theme.bg.default};
  color: ${({ theme }) => theme.text.default};
  padding: 16px 0;
  border-right: 1px solid ${props => props.theme.bg.border};
  box-shadow: 2px 0 6px ${({ theme }) => hexa(theme.bg.reverse, 0.06)};
  z-index: 1000;
`;

export const IconLink = styled(Link)`
  display: flex;
  align-items: center;
  opacity: 0.5;
  padding: 8px 16px;

  &:hover {
    opacity: 1;
    background: ${props => props.theme.bg.wash};
  }

  &[data-active~='true'] {
    box-shadow: inset 4px 0 ${({ theme }) => theme.brand.default};
    opacity: 1;
    color: ${props => props.theme.brand.default};
    background: ${props => props.theme.bg.wash};
  }
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;

  @media (max-width: 768px) {
    font-size: 9px;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 2px;
    margin-left: 0;
  }

  @media (max-width: 360px) {
    display: none;
  }
`;
