import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import PurchaseFormScreen from './screens/PurchaseFormScreen'
import PurchaseListScreen from './screens/PurchaseListScreen'
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
          <Route path='/purchases' component={PurchaseListScreen} />
          {/* <Route path='/accounts' component={AccountsScreen} exact /> */}
          {/* <Route path='/dashboard' component={DashboardScreen} exact /> */}
          {/* <Route path='/moods' component={MoodsScreen} exact /> */}
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
