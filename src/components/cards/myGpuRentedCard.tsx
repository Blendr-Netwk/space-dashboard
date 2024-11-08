"use client"

import React from "react"

// createdAt
// expireAt
// id
// instanceId
// instanceType{id: '', type: '', cpu: }, gpu: }, network: }}
// instanceTypeId
// keyName
// publicIp
// status
// updatedAt
// userId

type Props = {
  node: any
}

const MyGpuRentedCard: React.FC<Props> = ({ node }) => {
  // const [isDownloading, setIsDownloading] = useState(false);

  // const handleDownloadSSH = async () => {
  //   try {
  //     setIsDownloading(true);
  //     const keyPair = await fetchMyKeypair(instance.keyName);
  //     const blob = new Blob([keyPair.keyMaterial], { type: "text/plain" });

  //     downloadFile(blob, instance.keyName);
  //     setIsDownloading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setIsDownloading(false);
  //   }
  // };

  return (
    <div className=" w-full gpu-rent-card px-5 pt-[30px] pb-5 rounded-[20px] flex flex-col items-start justify-start gap-3 ">
      <div className=" flex flex-col items-start justify-start gap-[5px] ">
        <h3 className=" text-[15px] font-medium text-[#A6A4AF] ">
          {node.cpu.name}
        </h3>
        <h2 className=" text-2xl font-bold text-white ">{node.gpu.name}</h2>
      </div>
      {/*       
      {node.inUse ? (
        <h1 className=" text-[#A6A4AF] text-[14px] ">
          Total Used :
          <span className=" text-white text-[17px] pl-2 ">
            {getUsedHours(instance.createdAt)}Hr
          </span>
        </h1>
      ) : (
        <></>
      )} */}

      <h2 className=" text-[#A6A4AF] text-[14px] ">
        Created Date :
        <span className=" text-white text-[17px] pl-2 ">
          {new Date(node.createdAt).toLocaleString()}
        </span>
      </h2>
      <h2 className=" text-[#A6A4AF] text-[14px] ">
        End Date :
        <span className=" text-white text-[17px] pl-2 ">
          {new Date(node.expireAt).toLocaleString()}
        </span>
      </h2>
      <h1 className=" text-[#A6A4AF] text-[14px] ">
        Public IP :
        <span className=" text-white text-[17px] pl-2">{node.publicIp}</span>
      </h1>
      <h1 className=" text-[#A6A4AF] text-[14px] ">
        Status :
        <span className=" text-white text-[17px] pl-2">{node.status}</span>
      </h1>
      <div className=" mt-6 flex items-start justify-center gap-4 ">
        {/* <button
          onClick={handleDownloadSSH}
          className="bg-[#0a0e16] text-[#A8FF77] px-6 py-2 rounded-md"
          disabled={isDownloading}
        >
          Download SSH KEY
        </button> */}
        {/* <button className="bg-[#0a0e16] text-[#A6A4AF] rounded-md px-6 py-2">
          Extend
        </button> */}
      </div>
    </div>
  )
}

export default MyGpuRentedCard
