"use client"

import GpuRentCard from "@/components/cards/gpuRentCard"
import { MainContainer } from "@/components/container/MainContainer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { getAllNodes } from "@/clientApi/node"
import MyGpuRentedCard from "@/components/cards/myGpuRentedCard"
import RentedGpuCard from "@/components/cards/rentedGpuCard"
import RentGpuConfirmModal from "@/components/models/RentGpuConfirmModel/RentGpuConfirmModel"

const RentGpus = () => {
  const [gpus, setGpus] = useState<any[]>([])
  const [myActiveGpus, setMyActiveGpus] = useState<any[]>([])
  const [myTerminatedGpus, setMyTerminatedGpus] = useState<any[]>([])
  const [showConfirmModel, setShowConfirmModel] = useState(false)
  const [selectedNode, setSelectedNode] = useState<string>("")

  useEffect(() => {
    const fetchGpus = async () => {
      try {
        const resGpus = await getAllNodes()

        const availableGpus = resGpus.filter(
          (node: { isConnected: any; status: string }) => {
            return node.isConnected && node.status === "idle"
          }
        )
        const activeGpus = resGpus.filter((node: { status: string }) => {
          return node.status === "lended"
        })

        setGpus(availableGpus)
        setMyActiveGpus(activeGpus)
      } catch (err) {
        console.log(err)
      }
    }

    fetchGpus()
  }, [])

  const handleRentSubmit = async (node: any) => {
    try {
      setSelectedNode(node)
      setShowConfirmModel(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <MainContainer>
      <div className=" w-full mt-20 pt-8 px-5 sm:p-0 sm:w-full sm:mt-8 sm:mx-4 sm:pl-[150px]">
        <Tabs defaultValue="available" className=" ">
          <div className=" w-full flex flex-row items-start justify-between sm:items-center">
            <div className=" flex flex-col items-start justify-start gap-5 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-5">
              <h2 className=" text-xl font-bold text-white md:text-2xl ">
                Rent GPUs
              </h2>
              <TabsList className=" model-toggle-btn h-[50px] rounded-[15px] p-[5px] gap-[5px] flex flex-row items-center justify-between">
                <TabsTrigger
                  value="available"
                  className=" text-white text-[15px] "
                >
                  Available
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className=" text-white text-[15px] "
                >
                  Active
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <TabsContent value="available" className=" text-white">
            <div className="mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center md:gap-[10px] xl:grid-cols-3 xl:items-stretch xl:justify-start xl:gap-[10px]">
              {gpus.map((data, i) => (
                <GpuRentCard
                  handleSubmit={handleRentSubmit}
                  key={i}
                  node={data}
                />
              ))}
            </div>
            {gpus.length <= 0 && (
              <div className="text-white flex justify-center items-center h-[60vh]">
                <h1>No Available Gpus</h1>
              </div>
            )}
          </TabsContent>
          <TabsContent value="active" className=" text-white">
            <div className=" mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center md:gap-[10px] 2xl:grid-cols-3  xl:items-stretch xl:justify-start xl:gap-[10px]">
              {myActiveGpus.map((data, i) => {
                return (
                  <RentedGpuCard key={`available-${data.id}`} node={data} />
                )
              })}
            </div>
            {myActiveGpus.length <= 0 && (
              <div className="text-white flex justify-center items-center h-[60vh]">
                <h1>No Active Gpus</h1>
              </div>
            )}
          </TabsContent>
          <TabsContent value="terminated" className=" text-white">
            <div className=" mt-10 flex flex-col items-center justify-center gap-[10px] md:grid md:grid-cols-2 md:items-stretch md:justify-center md:gap-[10px] 2xl:grid-cols-3  xl:items-stretch xl:justify-start xl:gap-[10px]">
              {myTerminatedGpus.map((data, i) => {
                return <MyGpuRentedCard key={`${data._id}-${i}`} node={data} />
              })}
            </div>
            {myTerminatedGpus.length <= 0 && (
              <div className="text-white flex justify-center items-center h-[60vh]">
                <h1>No Terminated Gpus</h1>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {showConfirmModel && (
          <div className="flex items-center justify-center inset-0 fixed">
            <RentGpuConfirmModal node={selectedNode} />

            <div
              className="z-[2] fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowConfirmModel(false)}
            ></div>
          </div>
        )}
      </div>
    </MainContainer>
  )
}

export default RentGpus
