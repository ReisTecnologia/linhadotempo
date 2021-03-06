import styled from 'styled-components'
import { colors } from '../../../../_shared/colors'

export const TitleWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  justify-content: center;
  padding: 0.75rem 0 0.75rem 0rem;
  color: ${colors.lightGrey};
  font-weight: bold;
  text
  /* &:before {
    border-top: 1px solid ${colors.lightGrey};
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: -8%;
    right: 0%;
    bottom: 0;
    width: 116%;
    z-index: -1;
  } */
  span {
    background: ${colors.white};
    padding: 0 0.25rem;
  }
  font-size: 0.85em;
  color: ${colors.grey};
`
