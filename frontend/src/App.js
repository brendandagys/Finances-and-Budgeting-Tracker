import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import PurchaseFormScreen from './screens/PurchaseFormScreen'
import PurchaseListScreen from './screens/PurchaseListScreen'
import AccountUpdateScreen from './screens/AccountUpdateScreen'
import SettingsScreen from './screens/SettingsScreen'
import MoodsScreen from './screens/MoodsScreen'
import { fetchUser } from './actions/authActions'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={PurchaseFormScreen} exact />
          <Route path='/purchases' component={PurchaseListScreen} exact />
          <Route path='/accounts' component={AccountUpdateScreen} exact />
          {/* <Route path='/dashboard' component={DashboardScreen} exact /> */}
          <Route path='/moods' component={MoodsScreen} exact />
          <Route path='/settings' component={SettingsScreen} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
