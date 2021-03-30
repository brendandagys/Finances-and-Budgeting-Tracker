import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Purchase from '../components/Purchase'

const PurchaseListScreen = () => {
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    const fetchPurchases = async () => {
      const { data } = await axios.get('/api/purchases')
      setPurchases(data)
    }

    fetchPurchases()
  }, [])

  return (
    <>
      {console.log(purchases)}
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
  )
}

export default PurchaseListScreen
