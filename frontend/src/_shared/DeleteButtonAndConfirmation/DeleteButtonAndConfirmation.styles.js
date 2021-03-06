import styled from 'styled-components'
import { colors } from '../colors'
export const ConfirmButton = styled.div`
  display: flex;
  height: 2rem;
  padding: 0.75rem;
  align-items: center;
  color: ${colors.white};
  background-color: ${colors.brown};
  border-radius: 5px;
  margin: 0 1.25rem 0.25rem 0;
  cursor: pointer;
  &:hover {
    background-color: ${colors.wine};
  }

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`
export const ConfirmationWrapper = styled.div`
  border-radius: 5px;
  border: 1px solid ${colors.brown};
  margin: 0 1.25rem 0 1.25rem;
  padding: 0.5rem;
`

export const ConfirmButtonsWrapper = styled.div`
  margin: 0.5rem 0 0 0;
  display: flex;
  justify-content: space-evenly;
`
export const DeleteButtonWrapper = styled.div`
  width: 100%;
  border-top: ${({ showBorder }) =>
    showBorder && `1px solid ${colors.lightGrey}`};
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
`
