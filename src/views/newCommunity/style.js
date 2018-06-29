// @flow
import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  padding: 32px;
`;

export const Actions = styled.div`
  width: calc(100% + 16px);
  margin-left: -8px;
  margin-right: -8px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${props => props.theme.bg.border};
  padding: 20px 20px 12px;
`;

export const Title = styled.h1`
  font-weight: 700;
  color: ${props => props.theme.text.default};
  font-size: 32px;
  letter-spacing: -0.1px;
`;

export const Description = styled.h3`
  font-size: 20px;
  font-weight: 400;
  color: ${props => props.theme.text.secondary};
  line-height: 1.4;
  margin-top: 16px;
  max-width: 640px;
`;

export const Divider = styled.div`
  border-bottom: 2px solid ${props => props.theme.bg.border};
  width: 100%;
  display: block;
  padding-top: 24px;
  margin-bottom: 24px;
`;

export const ContentContainer = styled.div`
  padding: 0 24px 24px;
`;

export const FormContainer = styled.div`
  background: ${props => props.theme.bg.default};
  border: 1px solid ${props => props.theme.bg.border};
  padding: 8px;
  border-radius: 8px;
  margin-top: 32px;
`;

export const Form = styled.form`
  display: block;
  flex-direction: column;
  align-self: stretch;
  flex: 1 0 100%;
  max-width: 100%;
  margin: 16px;
`;
