import styled from 'styled-components'
import { colors } from '../../../../_shared/colors'

export const MonthWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  z-index: 1;
  padding: 0.5rem 1rem 0.5rem 3rem;
  visibility: ${({ isDisplayEntryMonth }) =>
    isDisplayEntryMonth ? 'hidden' : 'visible'};
  &:before {
    border-top: 1px solid ${colors.lightGrey};
    content: '';
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 0%;
    right: 0%;
    bottom: 0;
    width: 100%;
    z-index: -1;
  }
  span {
    background: ${colors.white};
    padding: 0 0.25rem;
  }
  font-size: 0.85em;
  color: ${colors.brown};
`

export const MonthEntriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const MonthAndEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const EntryWithoutDayWrapper = styled.div``

export const EntryNameWrapper = styled.div`
  flex: 1;
`
export const YearWrapper = styled.div`
  flex: 0.4;
`

export const MonthSpanWrapper = styled.div`
  flex-direction: row-reverse;
  align-self: flex-end;
  flex: ${({ hasYear }) => (hasYear ? 0.78 : 0.38)};
`
export const DateText = styled.span`
  background: ${colors.white};
  padding-right: 0.25rem;
  color: ${colors.grey};
`

export const DateInnerWrapper = styled.div`
  background: ${colors.white};
  max-width: ${({ hasYear }) => (!hasYear ? 'auto' : '4.5rem')};
`
