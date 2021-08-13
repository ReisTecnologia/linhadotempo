import React from 'react'
import { TimeEntryForm } from '../TimeEntryForm/TimeEntryForm'
import { Header } from '../../_shared/Header/Header'
import { Layout } from '../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '../../_shared/Container'

export const EditEntryPage = ({ timelines, refetchTimelines, entryToEdit }) => {
  let history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  return (
    <Layout>
      <Header
        title={'Acontecimento'}
        subTitle={'Editar Acontecimento'}
        returnButton={goBack}
      />
      <Container>
        <TimeEntryForm
          timelines={timelines}
          refetchTimelines={refetchTimelines}
          entryToEdit={entryToEdit}
        />
      </Container>
    </Layout>
  )
}

EditEntryPage.propTypes = {
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
  entryToEdit: PropTypes.object,
}
