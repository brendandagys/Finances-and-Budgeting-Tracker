import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import User from '../models/User.js'
import Purchase from '../models/Purchase.js'
import PurchaseCategory from '../models/PurchaseCategory.js'
import Account from '../models/Account.js'
import AccountUpdate from '../models/AccountUpdate.js'
import purchases from '../data/Purchases CLEAN.js'
import accountUpdates from '../data/Account Updates CLEAN.js'
import connectDB from './db.js'

dotenv.config()

connectDB()

const user = await User.findOne({ name: 'Brendan Dagys' })

const categories = {
  1: await PurchaseCategory.findOne({ name: 'Coffee' }),
  2: await PurchaseCategory.findOne({ name: 'Food/Drinks' }),
  3: await PurchaseCategory.findOne({ name: 'Groceries' }),
  4: await PurchaseCategory.findOne({ name: 'Gas' }),
  5: await PurchaseCategory.findOne({ name: 'Household Items' }),
  6: await PurchaseCategory.findOne({ name: 'Bills' }),
  7: await PurchaseCategory.findOne({ name: 'Services' }),
  8: await PurchaseCategory.findOne({ name: 'Restaurants' }),
  9: await PurchaseCategory.findOne({ name: 'Clothes' }),
  10: await PurchaseCategory.findOne({ name: 'Electronics' }),
  11: await PurchaseCategory.findOne({ name: 'Tickets/Fees' }),
  12: await PurchaseCategory.findOne({ name: 'Alcohol' }),
  13: await PurchaseCategory.findOne({ name: 'Gifts' }),
  14: await PurchaseCategory.findOne({ name: 'Dates' }),
  15: await PurchaseCategory.findOne({ name: 'Vacations' }),
  16: await PurchaseCategory.findOne({ name: 'Guitar' }),
}

const accounts = {
  1: await Account.findOne({ name: 'TD Chequing' }),
  2: await Account.findOne({ name: 'EQ Bank HISA' }),
  3: await Account.findOne({ name: 'TD First Class Travel Visa Infinite' }),
  4: await Account.findOne({ name: 'TD Direct Investing (TFSA)' }),
  5: await Account.findOne({ name: 'TD Direct Investing - USD' }),
  7: await Account.findOne({ name: 'Wealthsimple Trade (TFSA)' }),
  8: await Account.findOne({ name: 'Cash - EUR' }),
  9: await Account.findOne({ name: 'Cash - USD' }),
  10: await Account.findOne({ name: 'Cash' }),
  14: await Account.findOne({ name: 'Wealthsimple Trade (Personal)' }),
  15: await Account.findOne({ name: 'Wealthsimple Trade (RRSP)' }),
  '': { _id: undefined, name: undefined },
}

const importData = async () => {
  try {
    await Purchase.deleteMany()

    const purchasesToImport = purchases
      .filter((purchase) => ![11, 12, 13].includes(purchase.account_id))
      .map((purchase) => {
        const {
          item,
          category_id,
          amount,
          description,
          account_id,
          receiptUrl,
          timestamp,
          userName,
        } = purchase

        return {
          user: user._id,
          userName,
          timestamp,
          category_id: categories[purchase.category_id]._id,
          category: categories[purchase.category_id].name,
          item,
          amount,
          description:
            purchase.description === '' ? undefined : purchase.description,
          account_id: accounts[purchase.account_id]._id,
          account: accounts[purchase.account_id].name,
          receiptUrl:
            purchase.receiptUrl === ''
              ? undefined
              : purchase.receiptUrl.replace(
                  'media/',
                  'https://brendanfinances.s3.amazonaws.com/receipts/brendandagys@gmail.com/'
                ),
        }
      })

    const createdPurchases = await Purchase.insertMany(purchasesToImport)
    console.log('Purchases Imported!'.green.inverse)

    await AccountUpdate.deleteMany()

    const accountUpdatesToImport = accountUpdates
      .filter(
        (accountUpdate) => ![6, 11, 12, 13].includes(accountUpdate.account_id)
      )
      .map((accountUpdate) => {
        const { account_id, value, userName, timestamp } = accountUpdate

        return {
          user: user._id,
          userName,
          account_id: accounts[accountUpdate.account_id]._id,
          account: accounts[accountUpdate.account_id].name,
          value,
          timestamp,
        }
      })

    const createdAccountUpdates = await AccountUpdate.insertMany(
      accountUpdatesToImport
    )
    console.log('Account Updates Imported!'.green.inverse)

    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Purchase.deleteMany()
    await AccountUpdate.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
