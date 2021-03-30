import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import PurchaseFormScreen from './screens/PurchaseFormScreen'
import PurchaseListScreen from './screens/PurchaseListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={PurchaseFormScreen} exact />
          <Route path='/purchases' component={PurchaseListScreen} exact />
          {/* <Route path='/accounts' component={AccountsScreen} exact /> */}
          {/* <Route path='/dashboard' component={DashboardScreen} exact /> */}
          {/* <Route path='/moods' component={MoodsScreen} exact /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
