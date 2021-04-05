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

  useEffect(() => {
    dispatch(getPurchases())
  }, [dispatch])

  return (
    <>
      {/* {console.log(purchases)} */}
      <h1>Purchases</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        purchases.map((purchase) => {
          return <Purchase key={purchase._id} {...purchase} />
        })
      )}
    </>
  )
}

export default PurchaseListScreen
