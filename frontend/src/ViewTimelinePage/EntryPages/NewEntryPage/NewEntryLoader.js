import React, { useContext } from 'react'
import { NewEntryPage } from './NewEntryPage'
import qs from 'query-string'
import { TimelinesContext } from '../../TimelinesContextProvider'
import { urlQueryTimelineIds } from '../../../_shared/urlQueryTimelineIds'
import { BOOKS_QUERY } from '../../../_shared/BOOKS_QUERY'
import { useQuery } from '@apollo/client'
import { CurrentUserContext } from '../../../_shared/CurrentUserContextProvider'

export const NewEntryLoader = () => {
  const { userDataLoading, s3BucketName } = useContext(CurrentUserContext)
  const { loading, refetchTimelines, getTimelines } =
    useContext(TimelinesContext)
  const { data: booksData, loading: booksLoading } = useQuery(BOOKS_QUERY)

  const defaultEntryData = qs.parse(location.hash)

  const selectedTimelines = getTimelines(urlQueryTimelineIds())
  const isLoading = loading || booksLoading || userDataLoading

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <NewEntryPage
      timelines={selectedTimelines}
      refetchTimelines={refetchTimelines}
      defaultEntryData={defaultEntryData}
      books={booksData.books}
      bucketName={s3BucketName}
    />
  )
}
