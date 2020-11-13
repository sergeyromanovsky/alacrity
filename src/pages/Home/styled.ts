import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import { Button, Checkbox } from '@material-ui/core';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 1rem;
`;

export const StyledEditIcon = styled(CreateIcon)`
  cursor: pointer;
  color: grey;
`;

export const StyledCheckbox = styled(Checkbox)`
  && {
    cursor: pointer;
    padding: 0;
  }
`;

export const StyledButton = styled(Button)`
  && {
    margin-bottom: 1rem;
  }
`;
