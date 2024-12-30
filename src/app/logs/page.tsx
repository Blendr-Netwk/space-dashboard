"use client"

import { getSignedURL } from "@/clientApi/fileUpload"
import { fetchTasks } from "@/clientApi/node"
import { MainContainer } from "@/components/container/MainContainer"
import LogsModal from "@/components/models/logs/logs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { GoDownload } from "react-icons/go"
import { HiOutlineCommandLine } from "react-icons/hi2"

enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

const Logs = () => {
  const [taskId, setTaskId] = useState<string>("")
  const [tasks, setTasks] = useState<any[]>([])

  const getTasks = async () => {
    try {
      const tasksResponse: any = await fetchTasks()

      setTasks(tasksResponse.data)
    } catch (error) {
      console.error("An error occurred while fetching tasks:", error)
    }
  }

  const download = async (cid: string) => {
    const url = await getSignedURL(cid)
    window.open(url.data, "_blank")
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <MainContainer>
      <div className="w-full mt-20 pt-8 px-5 sm:p-0 sm:w-full sm:mt-8 sm:mx-4 sm:pl-[150px]">
        <h2 className="text-xl font-bold text-white md:text-2xl">Task Logs</h2>
        <div className="mt-6">
          <Table className="mt-6 max-w-full rounded-[20px] px-[30px] py-5 bg-[#11141d]">
            <TableHeader>
              <TableRow className="w-full mb-4 flex text-[#A6A4AF]">
                <TableHead>Model Name</TableHead>
                <TableHead>Task Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 && (
                <TableRow className="text-center w-full flex items-center justify-center">
                  <TableCell
                    colSpan={12}
                    className="text-center text-white flex justify-center h-20"
                  >
                    No Logs
                  </TableCell>
                </TableRow>
              )}

              {tasks.map((task) => (
                <TableRow key={task.id} className="rounded-lg mb-2">
                  <TableCell className="font-medium text-white table-border">
                    {task.title}
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    {task.taskType}
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    {new Date(task.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    {task.status === TaskStatus.COMPLETED ? (
                      <span className="text-lime-400">COMPLETED</span>
                    ) : task.status === TaskStatus.IN_PROGRESS ? (
                      <span className="text-yellow-400">IN PROGRESS</span>
                    ) : (
                      <span className="text-white">PENDING</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-white table-border">
                    <div className="flex gap-2">
                      <HiOutlineCommandLine
                        className={`w-5 h-5 text-white ${
                          task.status === TaskStatus.PENDING
                            ? "opacity-25 cursor-not-allowed"
                            : "opacity-100 cursor-pointer"
                        }`}
                        onClick={() => {
                          // if (task.status !== TaskStatus.PENDING)
                          setTaskId(task.id)
                        }}
                      />
                      <GoDownload
                        className={`w-5 h-5 text-white ${
                          task.status === TaskStatus.COMPLETED &&
                          task.taskDetail.cid
                            ? "opacity-100 cursor-pointer"
                            : "opacity-25 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          // if (
                          //   task.status === TaskStatus.COMPLETED &&
                          //   task.taskDetail.cid
                          // ) {
                          //   download(task.taskDetail.cid)
                          // }
                          download(
                            "bafkreib55i6nzlh6uo4az4azy53dlalxgg4x244k2u6hwq2l4qopauqhi4"
                          )
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {taskId && (
            <div className="flex items-center justify-center inset-0 fixed">
              <LogsModal taskId={taskId} handleClose={() => setTaskId("")} />

              <div
                className="z-[2] fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setTaskId("")}
              ></div>
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  )
}

export default Logs
