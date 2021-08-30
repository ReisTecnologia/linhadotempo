import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../SectionTitle/SectionTitle'
import {
  ClosedDisplayWrapper,
  TimelineNameWrapper,
  IconAndNameWrapper,
  IconWrapper,
  TimelineWrapper,
  OpenDisplayWrapper,
  ButtonWrapper,
  StyledButton,
} from './EntryTimelinesSelect.styles'

export const EntryTimelinesSelect = ({
  entry,
  setEntry,
  resetField,
  timelines,
}) => {
  const selectedTimelineIds = entry.timelines.sync

  const [displayTimelineSelect, setDisplayTimelineSelect] = useState(false)
  const toggleDisplaySelect = () => {
    setDisplayTimelineSelect(!displayTimelineSelect)
  }
  const selectedTimelines = timelines.filter((timeline) =>
    selectedTimelineIds.includes(timeline.id)
  )
  const toggleTimelines = (_, timeline) => {
    const newEntry = { ...entry }
    if (newEntry.timelines.sync.includes(timeline.id)) {
      newEntry.timelines.sync = newEntry.timelines.sync.filter(
        (timeline_id) => timeline_id !== timeline.id
      )
    } else {
      newEntry.timelines.sync = [...newEntry.timelines.sync, timeline.id]
    }
    setEntry(newEntry)
  }

  return (
    <>
      <SectionTitle title={'Linhas do Tempo'} resetSection={resetField} />
      {!displayTimelineSelect && (
        <ClosedDisplayWrapper onClick={toggleDisplaySelect}>
          {selectedTimelines.map((timeline) => (
            <TimelineWrapper key={timeline.id} id={timeline.id}>
              <IconAndNameWrapper>
                <IconWrapper color={timeline.color}>
                  {timeline.initials}
                </IconWrapper>
                <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
              </IconAndNameWrapper>
            </TimelineWrapper>
          ))}
        </ClosedDisplayWrapper>
      )}
      {displayTimelineSelect && (
        <OpenDisplayWrapper>
          {timelines.map((timeline) => {
            const onTimelineClick = (event) => toggleTimelines(event, timeline)
            return (
              <TimelineWrapper key={timeline.id} id={timeline.id}>
                <IconAndNameWrapper
                  isSelected={selectedTimelineIds.includes(timeline.id)}
                  onClick={onTimelineClick}
                >
                  <IconWrapper color={timeline.color}>
                    {timeline.initials}
                  </IconWrapper>
                  <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
                </IconAndNameWrapper>
              </TimelineWrapper>
            )
          })}
          <ButtonWrapper>
            <StyledButton onClick={toggleDisplaySelect} variant="contained">
              Ok
            </StyledButton>
          </ButtonWrapper>
        </OpenDisplayWrapper>
      )}
    </>
  )
}

EntryTimelinesSelect.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  resetField: PropTypes.func,
  timelines: PropTypes.array,
}