import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
  EditButtonWrapper,
  IconAndNameWrapper,
  CheckMarkerWrapper,
  Img,
} from './TimelinesList.styles'
import { EditButton } from '../../_shared/EditButton'
import { useHistory } from 'react-router'
import { sortArrayAlphabeticallyByProp } from '../../_shared/sortArrayAlphabeticallyByProp'
import { TimelinesIconRow } from '../TimelinesIconRow/TimelinesIconRow'

export const TimelinesList = ({
  timelines,
  setSelectedTimelines,
  selectedTimelines,
  bucketName,
  timelineId,
}) => {
  const arraySelectedTimelinesId = selectedTimelines.map(
    (timeline) => timeline.id
  )
  const mainTimeline = timelines.filter(
    (timeline) => timeline.id === timelineId
  )[0]
  let history = useHistory()
  const navigateToEditTimelinePage = (history, timelineId) => (e) => {
    e.stopPropagation()
    history.push(
      `/editTimeline/${timelineId}${
        arraySelectedTimelinesId[0]
          ? `?timelines=${arraySelectedTimelinesId.toString()}`
          : ''
      }`
    )
  }

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

  const sortedTimelinesAlphabetically = sortArrayAlphabeticallyByProp(
    'name',
    timelines
  )

  return (
    <TimelinesListWrapper>
      <TimelinesWrapper key={mainTimeline.id}>
        <IconAndNameWrapper checked={true}>
          {mainTimeline.timelineIconImageUrl ? (
            <IconWrapper>
              <Img
                src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${mainTimeline.timelineIconImageUrl}`}
                alt="Icone"
              />
            </IconWrapper>
          ) : (
            <IconWrapper color={mainTimeline.color}>
              {mainTimeline.initials}
            </IconWrapper>
          )}
          <TimelineNameWrapper>{mainTimeline.name}</TimelineNameWrapper>
        </IconAndNameWrapper>
        <EditButtonWrapper
          onClick={navigateToEditTimelinePage(history, mainTimeline.id)}
        >
          <EditButton />
        </EditButtonWrapper>
      </TimelinesWrapper>
      <TimelinesIconRow
        timelines={selectedTimelines}
        bucketName={bucketName}
        setSelectedTimelines={setSelectedTimelines}
      />

      {sortedTimelinesAlphabetically.map((timeline) => {
        const onTimelineClick = (event) => toggleTimelines(event, timeline)

        return (
          <TimelinesWrapper key={timeline.id}>
            <IconAndNameWrapper
              onClick={onTimelineClick}
              checked={arraySelectedTimelinesId.includes(timeline.id)}
            >
              {arraySelectedTimelinesId.includes(timeline.id) ? (
                <CheckMarkerWrapper checked={true}>&#10003;</CheckMarkerWrapper>
              ) : (
                <CheckMarkerWrapper />
              )}
              {timeline.timelineIconImageUrl ? (
                <IconWrapper>
                  <Img
                    src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                    alt="Icone"
                  />
                </IconWrapper>
              ) : (
                <IconWrapper color={timeline.color}>
                  {timeline.initials}
                </IconWrapper>
              )}
              <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
            </IconAndNameWrapper>
          </TimelinesWrapper>
        )
      })}
    </TimelinesListWrapper>
  )
}

TimelinesList.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
  bucketName: PropTypes.string,
  timelineId: PropTypes.string,
}
