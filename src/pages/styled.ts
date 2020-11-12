import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import { Button } from '@material-ui/core';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 1rem;
`;

export const StyledEditIcon = styled(CreateIcon)`
  cursor: pointer;
  color: grey;
`;

export const StyledButton = styled(Button)`
  && {
    margin-bottom: 1rem;
  }
`;
