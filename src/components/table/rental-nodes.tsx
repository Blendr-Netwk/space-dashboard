"use client"

import { fetchRentalNodes } from "@/clientApi/node"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

const MyRentalNodesTable = () => {
  const [myNodes, setMyNodes] = useState<any[]>([])

  useEffect(() => {
    const getRentalNodes = async () => {
      try {
        const resNodes = await fetchRentalNodes()
        setMyNodes(resNodes)
      } catch (err) {
        console.log(err)
      }
    }

    getRentalNodes()
  }, [])

  return (
    <div className=" md:col-span-12 lg:col-span-12 ">
      <Table className=" w-full bg-[#11141D] rounded-[20px] px-[30px] py-5 ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-[#A6A4AF]">Name</TableHead>
            <TableHead className=" text-[#A6A4AF]">GPU</TableHead>
            <TableHead className=" text-[#A6A4AF]">Price</TableHead>
            <TableHead className="text-right text-[#A6A4AF]">
              Started At
            </TableHead>
            <TableHead className="text-right text-[#A6A4AF]">
              Expire At
            </TableHead>
            <TableHead className="text-right text-[#A6A4AF]">
              Public Ip
            </TableHead>
            <TableHead className="text-right text-[#A6A4AF]">Port</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myNodes.length === 0 && (
            <TableRow className="text-center w-full flex items-center justify-center">
              <TableCell
                colSpan={12}
                className="text-center justify-center opacity-50 pt-6 p-4 !h-20"
              >
                No active nodes
              </TableCell>
            </TableRow>
          )}

          {myNodes.map((node) => (
            <TableRow key={node.id} className=" border-nones">
              <TableCell className="font-medium">{node.name}</TableCell>
              <TableCell className="font-medium">{node.gpu.name}</TableCell>
              <TableCell>{node.price}</TableCell>
              <TableCell>{new Date(node.startedAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(node.expireAt).toLocaleString()}</TableCell>
              <TableCell className="text-right">{node.publicIp}</TableCell>
              <TableCell className="text-right">{node.port}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MyRentalNodesTable
