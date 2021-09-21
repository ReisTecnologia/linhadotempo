import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { SourceTabs, TabSpan, InnerWrapper } from './EntrySource.styles'
import { SourceUrlDisplay } from './SourceUrlDisplay'
import { BookSelector } from './BookSelector'

export const EntrySource = ({ entry, books, changeEntry, setEntry }) => {
  const [showBookDisplay, setShowBookDisplay] = useState(false)
  const [showSiteDisplay, setShowSiteDisplay] = useState(false)

  const resetSources = () => {
    const newEntry = { ...entry }
    newEntry.source_url = ''
    newEntry.book_id = ''
    setEntry(newEntry)
  }

  const toggleBookDisplay = () => {
    setShowBookDisplay(!showBookDisplay)
    if (showSiteDisplay) setShowSiteDisplay(false)
  }
  const toggleSiteDisplay = () => {
    setShowSiteDisplay(!showSiteDisplay)
    if (showBookDisplay) setShowBookDisplay(false)
  }
  return (
    <>
      <SectionTitle title={'Fonte'} resetSection={resetSources} />
      <InnerWrapper>
        <SourceTabs>
          <TabSpan selected={showBookDisplay} onClick={toggleBookDisplay}>
            {'Livro'}
          </TabSpan>
          <span> | </span>
          <TabSpan selected={showSiteDisplay} onClick={toggleSiteDisplay}>
            {'Site'}
          </TabSpan>
        </SourceTabs>
        <SourceUrlDisplay
          entry={entry}
          changeEntry={changeEntry}
          showSiteDisplay={showSiteDisplay}
        />
        <BookSelector
          books={books}
          entry={entry}
          changeEntry={changeEntry}
          showBookSelector={showBookDisplay}
        />
      </InnerWrapper>
    </>
  )
}

EntrySource.propTypes = {
  entry: PropTypes.object,
  changeEntry: PropTypes.func,
  books: PropTypes.array,
  setEntry: PropTypes.func,
}