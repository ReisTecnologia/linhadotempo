import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Layout } from '../../_shared/Layout'
import { Footer } from '../../_shared/Footer/Footer'
import { Button } from './Button'
import PropTypes from 'prop-types'
import { TimelineScroller } from '../TimelineScroller/TimelineScroller'
import { useHistory } from 'react-router-dom'
import { TimelinesButtonsRow } from './TimelinesButtonsRow'
import { AddButtonWrapper } from './TimelinePage.styles'
import { findEntryToDisplay } from './findEntryToDisplay'
import { findClosestNextEntryToHash } from './findClosestNextEntryToHash'
import { getScrollPosition } from './getScrollPosition'
import { TimelinePageHeader } from './TimelinePageHeader/TimelinePageHeader'
import { NoEntriesYet } from './NoEntriesYet'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TimelineScrollerContainer } from './TimelineScrollerContainer'

const HASH_UPDATE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const TimelinePage = ({
  timelines,
  entries,
  previousEntries,
  hasInvalidTimelines,
}) => {
  const alreadyRan = useRef(false)
  const [displayEntry, setDisplayEntry] = useState({})
  const [visibleTimelines, setVisibleTimelines] = useState(timelines)
  const hash = useRef(window.location.hash)
  const oldEntryIds =
    previousEntries && previousEntries.map((entry) => entry.id)

  const newEntryIds = entries && entries.map((entry) => entry.id)

  const brandNewEntry =
    oldEntryIds &&
    newEntryIds.filter((entry) => !oldEntryIds.includes(entry))[0]

  const objectRefs = newEntryIds.reduce((accumulator, curr) => {
    accumulator[curr] = useRef(null)
    return accumulator
  }, {})

  let history = useHistory()
  const timelinesString = timelines.map((timeline) => timeline.id).toString()
  const displayEntryDate =
    displayEntry &&
    `${
      displayEntry.timelines
        ? `timeline=${displayEntry.timelines
            .map((timeline) => timeline.id)
            .join()}`
        : ''
    }${displayEntry.year ? `&year=${displayEntry.year}` : ''}${
      displayEntry.month ? `&month=${displayEntry.month}` : ''
    }${displayEntry.day ? `&day=${displayEntry.day}` : ''}`

  const navigateToNewEntryPage = () => {
    history.push({
      pathname: '/viewTimeline/newEntry/',
      search: `?timelines=${timelinesString}`,
      hash: `#${displayEntryDate ? displayEntryDate : ''}`,
    })
  }

  const isTheRightYear = (entry, hash) =>
    entry.year
      ? entry.year.toString() === hash.substr(6).split('/')[0]
      : !entry.year === !hash.substr(6).split('/')[0]
  const isTheRightMonth = (entry, hash) =>
    entry.month
      ? entry.month.toString() === hash.substr(6).split('/')[1]
      : !entry.month === !hash.substr(6).split('/')[1]
  const isTheRightDay = (entry, hash) =>
    entry.day
      ? entry.day.toString() === hash.substr(6).split('/')[2]
      : !entry.day === !hash.substr(6).split('/')[2]

  const firstEntryOfExactDate = entries.filter((entry) => {
    if (
      isTheRightYear(entry, hash.current) &&
      isTheRightMonth(entry, hash.current) &&
      isTheRightDay(entry, hash.current)
    ) {
      return entry
    }
  })[0]

  const firstEntryOfNullYear = entries.filter((entry) => {
    if (!entry.year && hash.current.substr(6).split('/')[0] === 'null') {
      return entry
    }
  })[0]

  const closestNextEntryToHash = findClosestNextEntryToHash(
    entries,
    hash.current
  )

  const entryToScrollTo = firstEntryOfExactDate
    ? firstEntryOfExactDate.id
    : firstEntryOfNullYear
    ? firstEntryOfNullYear.id
    : closestNextEntryToHash
    ? closestNextEntryToHash.id
    : null

  useEffect(() => {
    handleScroll()
  }, [handleScroll, visibleTimelines])

  useEffect(() => {
    const yOffset = -40
    const element = hash.current && document.getElementById(entryToScrollTo)
    const elementPositionWithOffset =
      element &&
      element.getBoundingClientRect().top + window.pageYOffset + yOffset
    if (element) {
      window.scrollTo({ top: elementPositionWithOffset, behavior: 'smooth' })
    }
  }, [entryToScrollTo])
  useEffect(() => {
    if (
      displayEntry &&
      displayEntry.entryId &&
      (!isTheRightYear(displayEntry, window.location.hash) ||
        !isTheRightMonth(displayEntry, window.location.hash) ||
        !isTheRightDay(displayEntry, window.location.hash))
    ) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        history.push({
          pathname: '/viewTimeline/',
          search: `?timelines=${timelinesString}`,
          hash: `#date=${displayEntry.year}${
            displayEntry.month ? `/${displayEntry.month}` : ''
          }${displayEntry.day ? `/${displayEntry.day}` : ''}`,
        })
      }, HASH_UPDATE_DEBOUNCE_MILISECONDS)
    }
  }, [displayEntry, history, timelinesString])

  const handleScroll = useCallback(() => {
    const elementsCoords = getScrollPosition(objectRefs)
    const entryToDisplay = findEntryToDisplay(elementsCoords, entries)
    if (entryToDisplay || !visibleTimelines[0]) {
      setDisplayEntry(entryToDisplay)
    }
  }, [entries, objectRefs, visibleTimelines])

  useEffect(() => {
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
    if (hasInvalidTimelines && !alreadyRan.current) {
      toast.error(
        'Você não tem acesso à uma ou mais linhas do tempo que tentou acessar.',
        {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        }
      )
      alreadyRan.current = true
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.removeEventListener('touchmove', function (e) {
        e.preventDefault()
      })
    }
  })
  return (
    <Layout>
      <TimelinePageHeader displayEntry={displayEntry} timelines={timelines} />
      <TimelineScrollerContainer>
        {entries[0] ? (
          <TimelineScroller
            visibleTimelines={visibleTimelines}
            entries={entries}
            newEntryId={brandNewEntry}
            forwardedRef={objectRefs}
            displayEntry={displayEntry}
          />
        ) : (
          <NoEntriesYet visibleTimelines={visibleTimelines} />
        )}
      </TimelineScrollerContainer>
      <Footer
        pageActions={
          <>
            <AddButtonWrapper>
              <Button onClick={navigateToNewEntryPage}>+</Button>
            </AddButtonWrapper>
            <TimelinesButtonsRow
              timelines={timelines}
              visibleTimelines={visibleTimelines}
              setVisibleTimelines={setVisibleTimelines}
            />
          </>
        }
      />
      <ToastContainer />
    </Layout>
  )
}

TimelinePage.propTypes = {
  timelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  entries: PropTypes.array,
  previousEntries: PropTypes.array,
  hasInvalidTimelines: PropTypes.bool,
}