import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
  SelectedIconAndNameWrapper,
} from './SelectTimelinesList.styles'
import { isSelected } from '../../../_shared/isSelected'
import { timelineColor } from '../../../_shared/timelineColor'

export const SelectTimelinesList = ({
  timelines,
  selectedTimelines,
  setSelectedTimelines,
}) => {
  const arraySelectedTimelinesId = selectedTimelines.map(
    (timeline) => timeline.id
  )

  const toggleTimelines = (_, timeline) => {
    if (arraySelectedTimelinesId.includes(timeline.id)) {
      setSelectedTimelines(
        selectedTimelines.filter(
          (timelineItem) => timelineItem.id !== timeline.id
        )
      )
    } else {
      setSelectedTimelines([...selectedTimelines, timeline])
    }
  }

  return (
    <TimelinesListWrapper>
      {timelines.map((timeline) => {
        const onTimelineClick = (event) => toggleTimelines(event, timeline)
        return (
          <TimelinesWrapper key={timeline.id} id={timeline.id}>
            <SelectedIconAndNameWrapper
              isSelected={isSelected(timeline.id, arraySelectedTimelinesId)}
              onClick={onTimelineClick}
            >
              <IconWrapper color={timelineColor(timelines, timeline.id)}>
                {timeline.initials}
              </IconWrapper>
              <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
            </SelectedIconAndNameWrapper>
          </TimelinesWrapper>
        )
      })}
    </TimelinesListWrapper>
  )
}

SelectTimelinesList.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
}
