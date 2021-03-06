import React from 'react'
import PropTypes from 'prop-types'
import {
  EntriesWrapper,
  InvisibleIconWrapper,
  EntryWithoutYearLabelWrapper,
} from './TimelineScrollerAnnual.styles'
import { YearEntries } from './YearEntries/YearEntries'
import { InvisibleIcon } from '../../../_shared/InvisibleIcon'
import { MessageWrapper } from '../../../_shared/MessageWrapper'
import { filterEntriesWithoutValue } from './YearEntries/filterEntriesWithoutValue'
import { filterEntriesWithValue } from './YearEntries/filterEntriesWithValue'
import { EntriesWithoutYear } from './EntriesWithoutYear'
import { convertObjectToArray } from '../../../_shared/convertObjectToArray'
import { groupBy } from '../../../_shared/groupBy'
import { addPeriodEndEntries } from '../../../_shared/addPeriodEndEntries'
import { PeriodEndWithoutYear } from '../../TimelineScroller/PeriodEndWithoutYear'
import { getPeriods } from '../../../_shared/getPeriods'
import { filterRelevantPeriods } from '../../../_shared/filterRelevantPeriods'
import { getPeriodsPositions } from '../../../_shared/getPeriodsPositions'

export const TimelineScrollerAnnual = ({
  visibleTimelines,
  entries,
  newEntryId,
  forwardedRef,
  displayEntry,
  bucketName,
}) => {
  const visibleTimelinesIds = visibleTimelines.map((timeline) => timeline.id)
  const filteredEntriesByVisibleTimelines = entries.filter((entry) =>
    entry.timelines
      .map((timeline) => timeline.id)
      .some((id) => visibleTimelinesIds.includes(id))
  )

  const filteredEntriesAndPeriodsByVisibleTimelines = addPeriodEndEntries(
    filteredEntriesByVisibleTimelines
  )

  const periods = getPeriods(filteredEntriesAndPeriodsByVisibleTimelines)
  const periodsWithPositions = getPeriodsPositions(periods)

  const entriesAndPeriodsWithoutYear = filterEntriesWithValue(
    filteredEntriesAndPeriodsByVisibleTimelines,
    'year'
  )
  const entriesWithoutYear = entriesAndPeriodsWithoutYear.filter(
    (entry) => !entry.period_end
  )
  const periodEndsWithoutYear = entriesAndPeriodsWithoutYear.filter(
    (entry) => entry.period_end
  )
  const entriesWithYear = filterEntriesWithoutValue(
    filteredEntriesAndPeriodsByVisibleTimelines,
    'year'
  )
  const entriesGroupedByYear = groupBy(entriesWithYear, 'year')

  const arrayOfGroupedEntries = convertObjectToArray(entriesGroupedByYear)

  const entriesSortedByYear = arrayOfGroupedEntries.sort(
    (a, b) => b[0].year - a[0].year
  )

  const periodsWithoutEndYear = periodsWithPositions.filter(
    (subArray) => !subArray[1].year
  )

  return (
    <>
      {visibleTimelines[0] ? (
        <EntriesWrapper>
          {periodEndsWithoutYear[0] && (
            <PeriodEndWithoutYear
              periodEndsWithoutYear={periodEndsWithoutYear}
              newEntryId={newEntryId}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
              periods={periodsWithoutEndYear}
            />
          )}
          {entriesSortedByYear.map((timeEntriesByYear, index) => (
            <YearEntries
              timeEntriesByYear={timeEntriesByYear}
              key={index}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              displayEntry={displayEntry}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
              periods={filterRelevantPeriods(
                periodsWithPositions,
                timeEntriesByYear[0].year,
                'year'
              )}
            />
          ))}
          {entriesWithoutYear[0] && (
            <>
              <EntryWithoutYearLabelWrapper>
                <span>{'Sem data definida'}</span>
              </EntryWithoutYearLabelWrapper>
              <EntriesWithoutYear
                entriesWithoutYear={entriesWithoutYear}
                newEntryId={newEntryId}
                forwardedRef={forwardedRef}
                visibleTimelines={visibleTimelines}
                bucketName={bucketName}
              />
            </>
          )}
        </EntriesWrapper>
      ) : (
        <>
          <InvisibleIconWrapper>
            <InvisibleIcon />
          </InvisibleIconWrapper>
          <MessageWrapper>Todas as linhas est??o invis??veis.</MessageWrapper>
        </>
      )}
    </>
  )
}

TimelineScrollerAnnual.propTypes = {
  visibleTimelines: PropTypes.array,
  entries: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
}
