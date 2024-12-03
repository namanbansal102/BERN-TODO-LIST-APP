import { Clock, Users, TrendingUp, ArrowRight } from "lucide-react"
import { PinataSDK } from "pinata";
import { useEffect, useState } from "react";

export default function HospitalCard({props}) {
  console.log("My props are :::::",props);
  const [imageUrl, setimageUrl] = useState("");
  
const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGIyM2U0MS1kZTg3LTRhYWYtOTVmNC1mNDBmZWQ2NjJlNzQiLCJlbWFpbCI6Im5hbWFuYmFuc2FsMTAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1OGQ1ODM1NWMwYTE2ZTc4MmEwOSIsInNjb3BlZEtleVNlY3JldCI6ImIxMjVkNGNkZGYyZmUzMTc4MWY0OTcyOGRiOTBlMzFmMjNkNTNmM2YzYTI3M2NiZTViZjY0Mjc1YjljYjFiYjIiLCJleHAiOjE3NjQ3NDEzNTR9.6dTuYSdS2GBexhtowWUM8r5h7UM4VoqoHdWEBPAe27o",
  pinataGateway: "example-gateway.mypinata.cloud",
});
const fetchImageUrl=async(cid)=>{
  try {

    const url = await pinata.gateways.createSignedURL({
       gateway:"jade-added-egret-280.mypinata.cloud",
       cid: cid,
    	expires: 1800000000000,
    })
    console.log(url)
    setimageUrl(url);

  } catch (error) {
    console.log(error);
  }

}
useEffect(() => {
  console.log("use Effect Running");
  fetchImageUrl(props.image);
  
}, [])

  
  return (
    <div className="p-8 bg-white">
      <div className="max-w-sm mx-auto">
        <div 
          className="group relative rounded-2xl p-[2px] transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
          }}
        >
          <div className="relative rounded-2xl bg-white p-4 transition-all">
            {/* Product Image */}
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={imageUrl}
                  alt="Product Name"
                  className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                
              </div>
              {/* Time Left Badge */}
             
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{props.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  Rare digital collectible featuring unique artwork. Limited release with certificate of authenticity.
                </p>
              </div>

              {/* Bid Stats */}
              
              {/* Bid History */}
              

              {/* Action Button */}
              <button
                className="relative w-full overflow-hidden rounded-lg p-4 transition-all hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                }}
              >
                <div className="relative z-10 flex items-center justify-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5" />
                  {/* <link></link> */}
                  <a href='/userProfile'>
                  <span className="font-semibold">Visit Hospital</span>
                  </a>
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-20"
                  style={{
                    background: "linear-gradient(135deg, white 0%, white 100%)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}