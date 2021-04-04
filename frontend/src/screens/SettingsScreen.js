import PurchaseCategoryTable from '../components/PurchaseCategoryTable'
import AccountTable from '../components/AccountTable'

const SettingsScreen = ({ match, history }) => {
  return (
    <>
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
