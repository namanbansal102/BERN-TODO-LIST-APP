import React from 'react'
import AuctionCard from '../components/AuctionCArd'

const ViewAuction = () => {
  return (
    <div>
      <center className='text-4xl font-bold mt-2'>
      Products
      </center>
      <div className="grid-cards grid grid-cols-3 gap-x-2">
      <AuctionCard></AuctionCard>
      <AuctionCard></AuctionCard>
      <AuctionCard></AuctionCard>
      <AuctionCard></AuctionCard>
      <AuctionCard></AuctionCard>
      </div>
      </div>
  )
}

export default ViewAuction