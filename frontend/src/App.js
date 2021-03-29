import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Purchase from './components/Purchase'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Purchase />
          <Purchase />
          <Purchase />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
