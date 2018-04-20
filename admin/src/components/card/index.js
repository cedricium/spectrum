// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { hexa, Tooltip } from '../globals';
import { H6, H1 } from '../type';

export const Card = styled.div`
  padding: ${props => (props.noPadding ? '0' : '16px')};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.bg.border};
  background: ${props => props.theme.bg.default};
  box-shadow: 0 2px 6px ${props => hexa(props.theme.bg.reverse, 0.06)};
`;

export const Divider = styled.div`
  margin: 0 -16px;
  width: calc(100% + 32px);
  height: 1px;
  background: ${props => props.theme.bg.border};
`;

export const Spacer = styled.div`
  width: 100%;
  height: ${props => props.height}px;
`;

export const CardSectionTitle = styled(H6)`
  padding: 24px 16px 6px;
  background: ${props => hexa(props.theme.bg.wash, 0.9)};
  margin: 0 -16px;
  width: calc(100% + 32px);
  border-top: 1px solid ${props => props.theme.bg.border};
  border-bottom: 1px solid ${props => props.theme.bg.border};

  & + ${Divider} {
    border-top: 0;
  }
`;

export const CardList = styled.ul`
  list-style-type: none;
  margin: 0 -16px;
  padding: 0;
  width: calc(100% + 32px);
`;

export const CardListItem = styled.li`
  padding: 8px 16px;
  border-bottom: 1px solid ${props => props.theme.bg.wash};
  display: grid;
  grid-template-columns: ${props =>
    props.noPercent ? `1fr auto` : `1fr auto 68px`};
  grid-column-gap: 8px;
  align-items: center;

  &:last-of-type {
    border-bottom: 0;
  }
`;

export const Percent = styled.span`
  padding: 2px 12px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Tooltip} ${props =>
    props.percent > 0
      ? css`
           {
            color: ${props => props.theme.success.default};
            background: ${props => hexa(props.theme.success.default, 0.1)};
          }
        `
      : props.percent === 0
        ? css`
             {
              color: ${props => props.theme.text.alt};
              background: ${props => props.theme.bg.wash};
            }
          `
        : css`
             {
              color: ${props => props.theme.warn.default};
              background: ${props => hexa(props.theme.warn.default, 0.1)};
            }
          `};
`;

export const CardListItemLabel = styled.div`
  display: flex;
  flex: 1 0 auto;
  font-size: 14px;
`;

export const CardListItemCount = styled.div`
  font-size: 13px;
  color: ${props => props.theme.text.alt};
  font-weight: 500;
  text-align: right;
`;

export const CardTitle = ({ title }: { title: string }) => (
  <React.Fragment>
    <H1>{title}</H1>

    <Spacer height={16} />
  </React.Fragment>
);

export const TabBarContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin: 0 -16px;
  width: calc(100% + 32px);
`;

const tabList = css`
  margin: 0;
  list-style-type: none;
  border-bottom: 1px solid ${props => props.theme.bg.border};
  display: flex;
  width: 100%;
  padding: 0 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

const pillList = css`
  margin: 0;
  list-style-type: none;
  display: flex;
  width: 100%;
  padding: 4px 16px;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export const TabBarList = styled.ul`
  ${props => (props.type === 'tabs' ? tabList : pillList)};
`;

const pill = css`
  margin: 6px 8px 6px 0;
  padding: 2px 16px;
  border-radius: 20px;
  background: ${props =>
    props.active ? props.theme.bg.wash : props.theme.bg.default};
  box-shadow: ${props =>
    props.active ? `0 0 0 1px ${props.theme.bg.border}` : 'none'};
  font-size: 12px;
  text-transform: uppercase;

  &:hover {
    background: ${props =>
      props.active ? props.theme.bg.wash : hexa(props.theme.bg.border, 0.2)};
  }
`;

const tab = css`
  position: relative;
  top: 1px;
  border-bottom: 1px solid
    ${props =>
      props.active ? props.theme.text.default : props.theme.bg.border};
  padding: 8px 16px;
  flex: 0 0 auto;
`;

export const TabBarListItem = styled.li`
  cursor: pointer;
  display: flex;
  align-item: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: ${props =>
    props.active ? props.theme.text.default : props.theme.text.alt};
  ${props => (props.type === 'tabs' ? tab : pill)};
`;
