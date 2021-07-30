import React from 'react'
import { DeleteButton } from '../../_shared/DeleteButton'
import { DELETE_TIME_ENTRY_MUTATION } from './DELETE_TIME_ENTRY_MUTATION'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

const Wrapper = styled.div`
  align-self: center;
  padding-top: 2rem;
`
export const DeleteEntryButton = ({ entryId, afterDelete }) => {
  const [deleteEntry, { loading }] = useMutation(DELETE_TIME_ENTRY_MUTATION, {
    variables: { id: entryId },
  })

  const confirmAndDelete = () => {
    console.log('click')
    var response = window.confirm('Apagar esse acontecimento?')
    response && deleteEntry().then(() => afterDelete())
  }
  return loading ? (
    <Wrapper>
      <span>Loading...</span>
    </Wrapper>
  ) : (
    <Wrapper>
      <DeleteButton onClick={confirmAndDelete} />
    </Wrapper>
  )
}

DeleteEntryButton.propTypes = {
  entryId: PropTypes.string,
  afterDelete: PropTypes.func,
}
