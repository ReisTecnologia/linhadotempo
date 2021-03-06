import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  border-radius: 50%;
  border: solid white 1px;
  min-width: 22px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`

export const UserButton = ({ onClick, initial }) => {
  return <>{initial && <Wrapper onClick={onClick}>{initial}</Wrapper>}</>
}

UserButton.propTypes = {
  onClick: PropTypes.func,
  initial: PropTypes.string,
}
