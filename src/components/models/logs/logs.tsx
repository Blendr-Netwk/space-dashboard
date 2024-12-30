"use client"

import { fetchLogs } from "@/clientApi/node"
import React, { useEffect, useState } from "react"
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui"

interface Props {
  taskId: string
  handleClose: () => void
}

const LogsModal: React.FC<Props> = ({ taskId, handleClose }) => {
  const [logs, setLogs] = useState<any[]>([])
  
  const formattedDate = (date: Date) =>
    new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  
  useEffect(() => {
    const getLogs = async () => {
      if (!taskId) return

      try {
        const resData = await fetchLogs(taskId)
        const logs = resData.logs.map((l: any, i: number) => (
          <div key={`logs${i}`}>
            {formattedDate(l.timestamp)} {l.message}
            <br/>
          </div>
        ))

        setLogs(logs)
      } catch (error) {
        console.error("Failed to fetch logs:", error)
      }
    }

    // Fetch logs every 2 seconds
    const interval = setInterval(() => {
      console.log("fetch logs")
      getLogs()
    }, 2000)

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [taskId])

  return (
    <div className=" bg-[#11141D] w-11/12 rounded-[20px] flex flex-col items-start justify-start gap-10 sm:w-9/12 md:3/5 lg:w-3/5 z-[9]">
      <Terminal
        name="Task Logs"
        colorMode={ColorMode.Dark}
        redBtnCallback={handleClose}
        yellowBtnCallback={handleClose}
        greenBtnCallback={handleClose}
      >
        {logs.length > 0 ? logs : <div>Loading...</div>}
      </Terminal>
    </div>
  )
}

export default LogsModal
