import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Header } from '../../../_shared/Header/Header'
import { Layout } from '../../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { NewEntryForm } from './NewEntryForm/NewEntryForm'
import { CREATE_TIME_ENTRY_MUTATION } from '../../../_shared/CREATE_TIME_ENTRY_MUTATION'
import { UPDATE_TIME_ENTRY_MUTATION } from '../../../_shared/UPDATE_TIME_ENTRY_MUTATION'
import { useMutation } from '@apollo/client'
import { DELETE_TIME_ENTRY_MUTATION } from '../../../_shared/DELETE_TIME_ENTRY_MUTATION'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { checkIfEntryError } from '../../../_shared/checkIfEntryError'
import { convertFormDataValues } from '../../../_shared/convertFormDataValues'
import { SelectTimelines } from '../SelectTimelines/SelectTimelines'
import { EntryPageContainer } from '../EntryPageContainer'
import { TimelinesIconRow } from '../TimelinesIconRow/TimelinesIconRow'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

const setCookie = (cookieName, cookieValue, expireDays) => {
  let date = new Date()
  date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${cookieName}=${cookieValue}; ${expires}`
}

const getCookie = (cookieName) => {
  const name = `${cookieName}=`
  const cookieDecoded = decodeURIComponent(document.cookie)
  if (cookieDecoded === '') {
    return null
  }
  const cookieArray = cookieDecoded.split('; ')
  let result
  cookieArray.forEach((value) => {
    if (value.indexOf(name) === 0) result = value.substr(name.length)
  })
  return result
}

export const NewEntryPage = ({ timelines, books, bucketName }) => {
  const isFirstRun = useRef(true)
  const cookieEntry = useRef(null)
  const cookieValueUsed = useRef(false)
  const [showTimelineSelectorScreen, setShowTimelineSelectorScreen] =
    useState(false)
  const [entryId, setEntryId] = useState(null)
  const [radioValue, setRadioValue] = useState('DC')
  const [entry, setEntry] = useState({
    timelines: { sync: [timelines[0].id] },
    time_entry_categories: { sync: [] },
    name: '',
    description: '',
    year: '',
    month: '',
    day: '',
    end_year: '',
    end_month: '',
    end_day: '',
    is_period: false,
    show_period: true,
    period_color: '',
    annual_importance: false,
    monthly_importance: false,
    source_url: '',
    book_page: '',
    book_id: '',
  })
  const [createEntry, { loading: createLoading }] = useMutation(
    CREATE_TIME_ENTRY_MUTATION
  )

  const [updateEntry, { loading }] = useMutation(UPDATE_TIME_ENTRY_MUTATION)
  const [deleteEntry, { loading: deleteLoading }] = useMutation(
    DELETE_TIME_ENTRY_MUTATION,
    {
      variables: { id: entryId },
    }
  )

  const handleDelete = () => {
    deleteEntry().then((res) => {
      if (res.data) history.push(`/viewTimeline/${location.search}`)
    })
  }

  const entryError = checkIfEntryError(entry)

  const filterCookieTimelinesForVisibleTimelines = useCallback(
    (cookieEntryTimelines) =>
      cookieEntryTimelines.filter((timelineId) =>
        timelines.map((timeline) => timeline.id).includes(timelineId)
      ),
    [timelines]
  )

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!entryError)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: entryId,
              input: convertFormDataValues(entry, radioValue),
            },
          }
          if (entryId) {
            updateEntry(payload)
          } else if (!entryId && !createLoading) {
            createEntry(payload).then((res) => {
              if (res.data.createTimeEntry && !entryId) {
                setEntryId(res.data.createTimeEntry.id)
              }
            })
          }
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [
    entry,
    entryError,
    radioValue,
    entryId,
    updateEntry,
    createEntry,
    createLoading,
  ])

  const timelinesString = timelines
    .map((timeline) => timeline.id)
    .sort((a, b) => a - b)
    .toString()
  let history = useHistory()

  const goBack = () => {
    if (showTimelineSelectorScreen) {
      setShowTimelineSelectorScreen(false)
    } else {
      if (!entryId) {
        history.push({
          pathname: '/viewTimeline/',
          search: `${location.search}`,
        })
      } else {
        history.push({
          pathname: '/viewTimeline/',
          search: `?timelines=${timelinesString}`,
          hash: `#date=${entry.year ? `${entry.year}` : 'null'}${
            entry.month ? `/${entry.month}` : ''
          }${entry.day ? `/${entry.day}` : ''}&entryId=${entryId}`,
        })
      }
    }
  }

  useEffect(() => {
    if (entryId) {
      const entryCookieValue = {
        year: `${radioValue === 'AC' ? `-${entry.year}` : `${entry.year}`}`,
        month: `${entry.month}`,
        day: `${entry.day}`,
        timelines: `${entry.timelines.sync.toString()}`,
        time_entry_categories:
          entry.time_entry_categories.sync[0] &&
          `${entry.time_entry_categories.sync.toString()}`,
        bookId: `${entry.book_id}`,
        bookPage: `${entry.book_page}`,
      }
      setCookie('entry', JSON.stringify(entryCookieValue), 30)
    }
    cookieEntry.current = JSON.parse(getCookie('entry'))

    if (!cookieValueUsed.current && cookieEntry.current) {
      const hasNegativeYear =
        cookieEntry.current.year && cookieEntry.current.year.startsWith('-')
      setRadioValue(hasNegativeYear ? 'AC' : 'DC')
      setEntry({
        timelines: {
          sync: filterCookieTimelinesForVisibleTimelines(
            cookieEntry.current.timelines.split(',')
          )[0]
            ? filterCookieTimelinesForVisibleTimelines(
                cookieEntry.current.timelines.split(',')
              )
            : [timelines[0].id],
        },
        time_entry_categories: {
          sync: cookieEntry.current.time_entry_categories
            ? cookieEntry.current.time_entry_categories.split(',')
            : [],
        },
        year: yearWithoutNegativeSign(cookieEntry.current.year),
        month:
          cookieEntry.current.month !== ''
            ? parseInt(cookieEntry.current.month)
            : '',
        day:
          cookieEntry.current.day !== ''
            ? parseInt(cookieEntry.current.day)
            : '',
        end_year: entry.end_year,
        end_month: entry.end_month,
        end_day: entry.end_day,
        is_period: entry.is_period,
        show_period: entry.show_period,
        period_color: entry.period_color,
        book_id: cookieEntry.current.bookId,
        book_page: cookieEntry.current.bookPage,
        annual_importance: entry.annual_importance,
        monthly_importance: entry.monthly_importance,
        source_url: entry.source_url,
        description: entry.description,
        name: entry.name,
      })
      cookieValueUsed.current = true
    }
  }, [
    entry,
    entryId,
    entry.day,
    entry.month,
    entry.year,
    entry.timelines.sync,
    entry.book_id,
    entry.book_page,
    radioValue,
    filterCookieTimelinesForVisibleTimelines,
    timelines,
  ])
  const setEntryTimelines = (array) => {
    const newEntry = { ...entry }
    newEntry.timelines.sync = array
    setEntry(newEntry)
  }

  const headerTitle = showTimelineSelectorScreen
    ? 'Selecionar as linhas do tempo'
    : 'Acontecimento'
  const isLoading = loading || createLoading

  const titleEntryName = entry.name === '' && ' '
  return (
    <Layout>
      <Header
        title={headerTitle}
        returnButton={goBack}
        loading={isLoading}
        entryTitle={showTimelineSelectorScreen && titleEntryName}
        timelinesIconRow={
          showTimelineSelectorScreen && (
            <TimelinesIconRow
              selectedTimelinesIds={entry.timelines.sync}
              setSelectedTimelines={setEntryTimelines}
              timelines={timelines}
              bucketName={bucketName}
            />
          )
        }
      />
      <EntryPageContainer expandSize={showTimelineSelectorScreen}>
        {!showTimelineSelectorScreen ? (
          <NewEntryForm
            timelines={timelines}
            entry={entry}
            setEntry={setEntry}
            radioValue={radioValue}
            setRadioValue={setRadioValue}
            entryId={entryId}
            entryError={entryError}
            books={books}
            bucketName={bucketName}
            deleteLoading={deleteLoading}
            handleDelete={handleDelete}
            setShowTimelineSelectorScreen={setShowTimelineSelectorScreen}
          />
        ) : (
          <SelectTimelines
            timelines={timelines}
            entry={entry}
            setEntry={setEntry}
            bucketName={bucketName}
          />
        )}
      </EntryPageContainer>
    </Layout>
  )
}

NewEntryPage.propTypes = {
  timelines: PropTypes.array,
  defaultEntryData: PropTypes.object,
  books: PropTypes.array,
  bucketName: PropTypes.string,
}
