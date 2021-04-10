import PurchaseCategoryTable from '../components/PurchaseCategoryTable'
import AccountTable from '../components/AccountTable'

const SettingsScreen = ({ match, history }) => {
  return (
    <>
      <h1 className='text-center'>Settings</h1>
      <br />
      <div className='my-3'>
        <PurchaseCategoryTable />
      </div>
      <div className='mt-5'>
        <AccountTable />
      </div>
    </>
  )
}

export default SettingsScreen
