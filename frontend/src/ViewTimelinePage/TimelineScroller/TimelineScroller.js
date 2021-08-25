import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  EntriesWrapper,
  InvisibleIconWrapper,
  SpanWrapper,
  EntryWithoutYearLabelWrapper,
} from './TimelineScroller.styles'
import { YearEntries } from './YearEntries/YearEntries'
import { convertObjectToArray } from './convertObjectToArray'
import { groupBy } from './groupBy'
import { InvisibleIcon } from '../../_shared/InvisibleIcon'
import { MessageWrapper } from '../../_shared/MessageWrapper'
import { filterEntriesWithoutValue } from './YearEntries/filterEntriesWithoutValue'
import { filterEntriesWithValue } from './YearEntries/filterEntriesWithValue'
import { EntriesWithoutYear } from './EntriesWithoutYear'

export const TimelineScroller = ({
  visibleTimelines,
  entries,
  newEntryId,
  forwardedRef,
  displayEntry,
}) => {
  const entriesWithoutYear = filterEntriesWithValue(entries, 'year')

  const entriesWithYear = filterEntriesWithoutValue(entries, 'year')

  const entriesGroupedByYear = groupBy(entriesWithYear, 'year')

  const arrayOfGroupedEntries = convertObjectToArray(entriesGroupedByYear)

  const entriesSortedByYear = arrayOfGroupedEntries.sort(
    (a, b) => b[0].year - a[0].year
  )

  return (
    <Wrapper>
      {visibleTimelines[0] ? (
        <EntriesWrapper>
          {entriesSortedByYear.map((timeEntriesByYear, index) => (
            <YearEntries
              timeEntriesByYear={timeEntriesByYear}
              key={index}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              displayEntry={displayEntry}
            />
          ))}
          {entriesWithoutYear[0] && (
            <>
              <EntryWithoutYearLabelWrapper>
                <SpanWrapper>
                  <span>{'Sem data definida'}</span>
                </SpanWrapper>
              </EntryWithoutYearLabelWrapper>
              <EntriesWithoutYear
                entriesWithoutYear={entriesWithoutYear}
                newEntryId={newEntryId}
                forwardedRef={forwardedRef}
              />
            </>
          )}
        </EntriesWrapper>
      ) : (
        <>
          <InvisibleIconWrapper>
            <InvisibleIcon />
          </InvisibleIconWrapper>
          <MessageWrapper>Todas as linhas estão invisíveis.</MessageWrapper>
        </>
      )}
    </Wrapper>
  )
}

TimelineScroller.propTypes = {
  visibleTimelines: PropTypes.array,
  entries: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
}
