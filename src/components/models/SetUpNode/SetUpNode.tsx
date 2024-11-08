import { SubmitHandler, useForm } from "react-hook-form"

type SetupNodeInputs = {
  name: string
  price: string
  hostname: string
  username: string
  port: string
  key: string
}

export const SetUpNode = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SetupNodeInputs>()

  const onSubmit: SubmitHandler<SetupNodeInputs> = (data) => {
    console.log(data)
  }

  return (
    <div className="bg-[#11141D] w-11/12 my-10 px-5 pt-[30px] pb-5 rounded-[20px] flex flex-col items-start justify-start gap-10 sm:w-9/12 md:3/5 lg:w-2/5 z-[9]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col items-start justify-start gap-[10px] ">
          <h2 className=" text-2xl font-bold text-white ">Setup a node</h2>
          <p className=" text-[#A6A4AF] text-[15px] font-medium ">
            We will guide you through a straightforward setup process to prepare
            your node for our network. Please follow each step carefully to
            ensure accurate configuration and secure integration.
          </p>
        </div>
        <div className=" w-full flex flex-col items-start justify-start gap-5 ">
          <label className=" relative w-full text-[15px] text-white font-medium ">
            <div className=" absolute px-[5px] w-[140px] h-[22px] bg-[#11141D] -top-[10px] left-[15px]">
              Name Your Node
            </div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Name your Node"
              className=" setNode-input w-full h-[50px] p-4 rounded-[10px] "
            />
          </label>
          <label className=" relative w-full text-[15px] text-white font-medium ">
            <div className=" absolute px-[5px] w-[140px] h-[22px] bg-[#11141D] -top-[10px] left-[15px]">
              Price per hour ($)
            </div>
            <input
              type="text"
              {...register("price", { required: true })}
              placeholder="0.00"
              className=" setNode-input w-full h-[50px] p-4 rounded-[10px] "
            />
          </label>
        </div>
        <div className=" flex flex-col items-start justify-start gap-[25px] ">
          <div className=" flex flex-col items-start justify-start gap-[10px] ">
            <h2 className=" text-xl font-semibold text-white ">SSH Key</h2>
            <p className=" text-[#A6A4AF] text-[13px] font-medium ">
              In order to authenticate the configuration and maintain
              operational integrity of your node, we require the submission of
              SSH details. This information is essential for verification
              purposes and to facilitate the allocation of tasks to your node.
              Please be advised that without these credentials, your node cannot
              be integrated into our listing and task distribution network.
            </p>
          </div>
          <div className=" w-full flex items-start justify-start gap-[10px] my-10">
            <label className=" relative w-full text-[15px] text-white font-medium ">
              <div className=" absolute px-[5px] w-[120px] h-[22px] bg-[#11141D] -top-[10px] left-[15px]">
                SSH hostname
              </div>
              <input
                type="text"
                {...register("hostname", { required: true })}
                placeholder="127.0.0.1"
                className=" setNode-input w-full h-[50px] p-4 rounded-[10px] "
              />
            </label>
            <label className=" relative w-full text-[15px] text-white font-medium ">
              <div className=" absolute px-[5px] w-[80px] h-[22px] bg-[#11141D] -top-[10px] left-[15px]">
                SSH Port
              </div>
              <input
                type="text"
                {...register("port", { required: true })}
                placeholder="22"
                className="  setNode-input w-full h-[50px] p-4 rounded-[10px] "
              />
            </label>
          </div>
          <div className=" w-full flex flex-col items-start justify-start gap-5 ">
            <label className=" relative w-full text-[15px] text-white font-medium ">
              <div className=" absolute px-[5px] w-[120px] h-[22px] bg-[#11141D] -top-[10px] left-[15px]">
                SSH Username
              </div>
              <input
                type="username"
                {...register("username", { required: true })}
                placeholder="root"
                className=" setNode-input w-full h-[50px] p-4 rounded-[10px] "
              />
            </label>
            <label className=" relative w-full text-[15px] text-white font-medium ">
              <div className=" absolute px-[5px] w-[130px] h-[22px] bg-[#11141D] -top-[10px] left-[15px]">
                SSH Private Key
              </div>
              <input
                type="key"
                {...register("key", { required: true })}
                placeholder="Enter here"
                className=" setNode-input w-full h-[50px] p-4 rounded-[10px] "
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className=" bg-[#6C95C0] rounded-[80px] w-full px-[30px] py-[11px] text-[15px] font-semibold text-white text-center mt-5"
        >
          Continue
        </button>
      </form>
    </div>
  )
}
