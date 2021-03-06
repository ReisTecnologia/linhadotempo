import { gql } from '@apollo/client'

export const DELETE_TIME_ENTRY_MUTATION = gql`
  mutation DeleteTimeEntry($id: ID!) {
    deleteTimeEntry(id: $id) {
      id
      name
      year
      month
      day
    }
  }
`
