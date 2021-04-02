import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPurchases } from '../actions/purchaseActions'
import Purchase from '../components/Purchase'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PurchaseListScreen = () => {
  const dispatch = useDispatch()

  const { loading, error, purchases } = useSelector(
    (state) => state.purchaseList
  )

  useEffect(() => {
    dispatch(listPurchases())
  }, [dispatch])

  return (
    <>
      {/* {console.log(purchases)} */}
      <h1>Purchases</h1>
      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <h3>
          <Message variant='secondary'>{error}</Message>
        </h3>
      ) : (
        <>
          <Purchase />
          <Purchase />
          <Purchase />
          <Purchase />
          <Purchase />
          <Purchase />
          <Purchase />
          <Purchase />
          <Purchase />
        </>
      )}
    </>
  )
}

export default PurchaseListScreen
