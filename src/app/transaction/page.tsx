"use client"

import { fetchMyTransactions } from "@/clientApi/aws"
import { MainContainer } from "@/components/container/MainContainer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EXPLORER_URL } from "@/constants/web3"
import { minifyHash } from "@/utils/math"
import { useEffect, useState } from "react"

const Transaction = () => {
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const txs = await fetchMyTransactions()
        setTransactions(txs)
      } catch (err) {
        console.log(err)
      }
    }
    
    fetchTransaction()
  }, [])

  return (
    <MainContainer>
      <div className="w-full mt-20 pt-8 px-5 sm:p-0 sm:w-full sm:mt-8 sm:mx-4 sm:pl-[150px]">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          Transaction Logs
        </h2>
        <div className="mt-6">
          <Table className=" w-full rounded-[20px] px-[30px] py-5 bg-[#11141d]">
            <TableHeader>
              <TableRow className="w-full mb-4 flex">
                <TableHead className=" text-[#A6A4AF]">Date</TableHead>
                <TableHead className=" text-[#A6A4AF]">Type</TableHead>
                <TableHead className=" text-[#A6A4AF]">Value</TableHead>
                <TableHead className="text-right text-[#A6A4AF]  ">
                  Hash
                </TableHead>
                <TableHead className="text-right text-[#A6A4AF] ">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 && (
                <TableRow className="text-center w-full flex items-center justify-center">
                  <TableCell
                    colSpan={12}
                    className="text-center text-white flex justify-center h-20"
                  >
                    No Transactions
                  </TableCell>
                </TableRow>
              )}

              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="rounded-lg mb-2">
                  <TableCell className="font-medium text-white table-border">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    {transaction.type}
                  </TableCell>
                  <TableCell className="font-medium text-[#A8FF77] table-border">
                    {transaction.value} Credits
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    <a
                      href={`${EXPLORER_URL}/tx/${transaction.txHash}`}
                      target="_blank"
                    >
                      {minifyHash(transaction.txHash)}
                    </a>
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    {transaction.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainContainer>
  )
}

export default Transaction
