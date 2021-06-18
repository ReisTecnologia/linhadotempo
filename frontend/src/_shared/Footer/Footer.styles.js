import styled from 'styled-components'
import { colors } from '../colors'

export const Wrapper = styled.div`
  background-color: ${colors.brown};
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
`

export const ButtonWrapper = styled.div`
  background-color: ${colors.white};
  margin: 0.5rem;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`