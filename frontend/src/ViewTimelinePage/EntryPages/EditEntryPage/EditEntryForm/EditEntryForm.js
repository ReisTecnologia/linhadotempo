import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { DateDisplay } from '../../DateDisplay/DateDisplay'
import { Wrapper } from './EditEntryForm.styles'
import { EntryTimelinesSelect } from '../../EntryTimelinesSelect/EntryTimelinesSelect'
import { EntrySource } from '../../EntrySource/EntrySource'
import { EntryImages } from '../../EntryImages/EntryImages'
import { DeleteButtonAndConfirmation } from '../../../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { EntryAnnualImportance } from '../../EntryAnnualImportance/EntryAnnualImportance'
import { TimelineOriginSelector } from '../../TimelineOriginSelector/TimelineOriginSelector'
import { TimeEntryCategoriesContext } from '../../../TimeEntryCategoriesContextProvider'
import { TimeEntryCategorySelect } from '../../../../_shared/TimeEntryCategorySelect/TimeEntryCategorySelect'
import { EntryNameInput } from '../../EntryNameInput/EntryNameInput'
import { EntryDescriptionInput } from '../../EntryDescriptionInput/EntryDescriptionInput'

export const EditEntryForm = ({
  entry,
  setEntry,
  radioValue,
  setRadioValue,
  timelines,
  books,
  entryError,
  bucketName,
  deleteLoading,
  handleDelete,
  setShowTimelineSelectorScreen,
  entryId,
  entryImages,
}) => {
  const { categories, loading: categoriesLoading } = useContext(
    TimeEntryCategoriesContext
  )
  const handleChange = (entryPropName) => (e) => {
    const newEntry = { ...entry }
    newEntry[entryPropName] = e.target.value
    setEntry(newEntry)
  }

  const resetFieldValue = (fieldName) => () => {
    const newEntry = { ...entry }
    newEntry[fieldName] = ''
    setEntry(newEntry)
  }
  const resetSelectedTimelines = () => {
    const newEntry = { ...entry }
    newEntry.timelines.sync = []
    setEntry(newEntry)
  }
  const resetSelectedTimeEntryCategories = () => {
    const newEntry = { ...entry }
    newEntry.time_entry_categories.sync = []
    setEntry(newEntry)
  }
  const numberOfRelatedTimelines = entry.timelines.sync.length
  const skipDeleteMessage = !numberOfRelatedTimelines
  const deleteMessage = `Ao deletar esse acontecimento ${
    numberOfRelatedTimelines > 1
      ? `${numberOfRelatedTimelines} linhas do tempo perder??o esse acontecimento`
      : `1 linha do tempo ir?? perder esse acontecimento`
  }. Tem certeza que deseja deletar esse acontecimento? Essa a????o ser?? irrevers??vel.`
  return (
    <Wrapper>
      <DateDisplay
        fieldId={'date'}
        entryError={entryError}
        entry={entry}
        setEntry={setEntry}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
      />
      <EntryNameInput
        entry={entry}
        setEntry={setEntry}
        entryError={entryError}
        resetField={resetFieldValue}
      />
      <EntryTimelinesSelect
        fieldId={'timelines'}
        entryError={entryError}
        timelines={timelines}
        resetField={resetSelectedTimelines}
        entry={entry}
        setEntry={setEntry}
        bucketName={bucketName}
        setShowTimelineSelectorScreen={setShowTimelineSelectorScreen}
      />
      <EntryDescriptionInput
        entry={entry}
        setEntry={setEntry}
        resetField={resetFieldValue}
      />
      {categoriesLoading ? (
        <span>Loading...</span>
      ) : (
        <TimeEntryCategorySelect
          entry={entry}
          setEntry={setEntry}
          resetField={resetSelectedTimeEntryCategories}
          entryCategories={categories}
        />
      )}
      <EntryAnnualImportance entry={entry} setEntry={setEntry} />
      <TimelineOriginSelector
        entry={entry}
        bucketName={bucketName}
        timelines={timelines}
        entryId={entryId}
      />
      <EntrySource
        entry={entry}
        books={books}
        changeEntry={handleChange}
        setEntry={setEntry}
      />
      <EntryImages
        entry={entry}
        bucketName={bucketName}
        entryId={entryId}
        entryImages={entryImages}
      />
      <DeleteButtonAndConfirmation
        deleteFunction={handleDelete}
        deleteMessage={deleteMessage}
        skipDeleteMessage={skipDeleteMessage}
        loading={deleteLoading}
      />
    </Wrapper>
  )
}

EditEntryForm.propTypes = {
  entry: PropTypes.object,
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
  books: PropTypes.array,
  setEntry: PropTypes.func,
  entryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  entryId: PropTypes.string,
  updateEntry: PropTypes.func,
  bucketName: PropTypes.string,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
  deleteLoading: PropTypes.bool,
  handleDelete: PropTypes.func,
  setShowTimelineSelectorScreen: PropTypes.func,
  entryId: PropTypes.string,
  entryImages: PropTypes.array,
}
