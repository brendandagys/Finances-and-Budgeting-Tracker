import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import PurchaseFormScreen from './screens/PurchaseFormScreen'
import PurchaseListScreen from './screens/PurchaseListScreen'
import AccountUpdateScreen from './screens/AccountUpdateScreen'
import DashboardScreen from './screens/DashboardScreen'
import SettingsScreen from './screens/SettingsScreen'
import WidgetsScreen from './screens/WidgetsScreen'
import MoodsScreen from './screens/MoodsScreen'
import { fetchUser } from './actions/authActions'
import { range } from 'lodash'

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header />
      <main
        className={
          range(992, 1200).includes(useWindowSize()[0]) ? 'py-5' : 'py-3'
        }
      >
        <Container>
          <Route path='/' component={PurchaseFormScreen} exact />
          <Route path='/purchases' component={PurchaseListScreen} exact />
          <Route path='/accounts' component={AccountUpdateScreen} exact />
          <Route path='/dashboard' component={DashboardScreen} exact />
          <Route path='/moods' component={MoodsScreen} exact />
          <Route path='/settings' component={SettingsScreen} exact />
          <Route path='/widgets' component={WidgetsScreen} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
