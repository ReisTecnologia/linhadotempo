import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--primary-color);
  color: #fff;
  position: fixed;
  top: 0;
  height: ${({ big, medium }) =>
    big ? '5.5rem' : medium ? '4.25rem' : '2.5rem'};
  z-index: 2;
  overflow: hidden;
`
