import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TimelinePage } from './TimelinePage/TimelinePage'
import { TIMELINE_QUERY } from './TimelinePage/TIMELINE_QUERY'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

const ApolloApp = (Wrapped) => (
  <ApolloProvider client={client}>
    <Wrapped />
  </ApolloProvider>
)
const Wrapped = () => {
  const { data, loading } = useQuery(TIMELINE_QUERY, {
    variables: { id: '2' },
    notifyOnNetworkStatusChange: true,
  })
  if (data) {
    console.log('data', data)
  }
  const { data: dataQuery2, loading: loadingQuery2 } = useQuery(
    TIMELINE_QUERY,
    {
      variables: { id: '3' },
      notifyOnNetworkStatusChange: true,
    }
  )
  if (dataQuery2) {
    console.log('dataQuery2', dataQuery2)
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/timeline'>
            <TimelinePage />
          </Route>
          <Route path='/'>
            <div>
              <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>Linha do Tempo</p>
                <div>{loading ? 'loading' : 'data'}</div>
                <div>{loadingQuery2 ? 'loadingQuery2' : 'dataQuery2'}</div>
              </header>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => ApolloApp(Wrapped)
