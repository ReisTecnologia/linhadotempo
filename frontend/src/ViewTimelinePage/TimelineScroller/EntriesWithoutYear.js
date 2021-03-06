import React, { Fragment } from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  IconsWrapper,
  Img,
  EntryImageWrapper,
  EntryImage,
  CategoryName,
  CategoriesWrapper,
} from './YearEntries/YearEntries.styles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../_shared/filterEntryTimelinesByVisibleTimelines'
import { getEntryMainImage } from '../../_shared/getEntryMainImage'
import {
  DateTextWrapper,
  EntryAndIconWrapper,
  EntryWithoutYearLabelWrapper,
  LeftDateLine,
  RightNoDateLine,
} from './TimelineScroller.styles'

export const EntriesWithoutYear = ({
  entriesWithoutYear,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
}) => {
  let history = useHistory()
  const navigateToEditEntry = (entry) => {
    history.push({
      pathname: '/viewTimeline/editEntry/',
      search: window.location.search,
      hash: `#entry=${entry.id}`,
    })
  }

  return (
    <>
      {entriesWithoutYear.map((entry, index) => {
        return (
          <Fragment key={index}>
            <EntryWithoutYearLabelWrapper>
              <LeftDateLine />
              <RightNoDateLine />
              <DateTextWrapper>
                <span>{'Sem data definida'}</span>
              </DateTextWrapper>
            </EntryWithoutYearLabelWrapper>
            <EntryAndIconWrapper
              isNew={newEntryId === entry.id}
              id={entry.id}
              ref={forwardedRef[entry.id]}
              onClick={() => navigateToEditEntry(entry)}
            >
              {getEntryMainImage(entry) && (
                <EntryImageWrapper>
                  <EntryImage
                    src={`${process.env.REACT_APP_IMAGES_ENDPOINT}?name=${
                      getEntryMainImage(entry).image_url
                    }&width=39&height=39`}
                    alt="Imagem"
                  />
                </EntryImageWrapper>
              )}
              <EntryNameWrapper>{entry.name}</EntryNameWrapper>
              <CategoriesWrapper>
                {entry.time_entry_categories[0] &&
                  entry.time_entry_categories.map((category, index) => (
                    <CategoryName key={index} bgColor={category.color}>
                      {category.name}
                    </CategoryName>
                  ))}
              </CategoriesWrapper>
              <IconsWrapper>
                {filterEntryTimelinesByVisibleTimelines(
                  visibleTimelines,
                  entry
                ).map((timeline) => (
                  <div key={timeline.id}>
                    {timeline.timelineIconImageUrl ? (
                      <EntryIcon borderColor={timeline.color}>
                        <Img
                          src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                          alt="Icone"
                        />
                      </EntryIcon>
                    ) : (
                      <EntryIcon color={timeline.color}>
                        {timeline.initials}
                      </EntryIcon>
                    )}
                  </div>
                ))}
              </IconsWrapper>
            </EntryAndIconWrapper>
          </Fragment>
        )
      })}
    </>
  )
}

EntriesWithoutYear.propTypes = {
  entriesWithoutYear: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  visibleTimelines: PropTypes.array,
  bucketName: PropTypes.string,
}
