"use client"

import Link from "next/link"

interface Props {
  handleClose: () => void
}

const CreateTasksModal: React.FC<Props> = ({ handleClose }) => {
  return (
    <div className=" bg-[#11141D] w-11/12 rounded-[20px] flex flex-col items-start justify-start gap-10 sm:w-9/12 md:3/5 lg:w-2/5 z-[9] px-4 py-8">
      <div className=" flex flex-col items-start justify-start gap-[1rem]">
        <h2 className="text-2xl font-bold text-white ">
          Task created successfully!
        </h2>
        <p className=" text-[#A6A4AF] text-base font-medium ">
          <Link href="/logs" className="text-yellow-400">
            Click here to view the Task Log
          </Link>{" "}
          and monitor its progress.
        </p>
      </div>

      <button
        className={`bg-[#6C95C0] rounded-[80px] w-full px-[30px] py-[11px] text-[15px] font-semibold text-white text-center bg-[#6C95C0]
        `}
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  )
}

export default CreateTasksModal
