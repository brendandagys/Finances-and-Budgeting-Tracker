import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchases } from '../actions/purchaseActions'
import Purchase from '../components/Purchase'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PurchaseListScreen = () => {
  const dispatch = useDispatch()

  const { loading, error, purchases } = useSelector(
    (state) => state.purchaseList
  )

  const { deleted } = useSelector((state) => state.purchaseDelete)

  useEffect(() => {
    dispatch(getPurchases())
  }, [dispatch])

  return (
    <>
      {/* {console.log(purchases)} */}
      <h1>Purchases</h1>
      <br />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : purchases.length === 0 ? (
        <Message variant='info'>You have not yet entered any purchases</Message>
      ) : (
        purchases
          .filter((purchase) => !deleted.includes(purchase._id))
          .map((purchase) => {
            return (
              <Purchase id={purchase._id} key={purchase._id} {...purchase} />
            )
          })
      )}
    </>
  )
}

export default PurchaseListScreen
