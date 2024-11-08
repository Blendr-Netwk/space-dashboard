import { updateSSHPublicKey } from "@/clientApi/auth"
import { useUser } from "@/providers/UserProvider"
import { SubmitHandler, useForm } from "react-hook-form"

export const UpdateSSHKeys = () => {
  const { user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ publickey: string }>({
    defaultValues: { publickey: user?.sshPublicKey || "" },
  })

  const onUpdateSshPublicKeySubmit: SubmitHandler<{
    publickey: string
  }> = async (data) => {
    try {
      await updateSSHPublicKey(data.publickey)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className=" mt-8">
      <h3 className=" text-[#A6A4AF] text-sm ">
        Adding Public Keys to your account will allow access to nodes using the
        basic terminal access option via the associated private key.
      </h3>
      <div className=" mt-8 ">
        <form onSubmit={handleSubmit(onUpdateSshPublicKeySubmit)}>
          <div className=" mb-8 w-full flex flex-col items-start justify-start gap-[10px] sm:mb-12">
            <h4 className=" pl-2 text-base font-semibold text-white">
              Public Key
            </h4>
            <textarea
              {...register("publickey", { required: true })}
              placeholder="--- Public Key ---"
              rows={5}
              className=" model-toggle-btn w-full rounded-[10px] bg-[#010102] p-4 text-gray-300 sm:w-3/5"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="ml-2 bg-[#A8FF77] text-[#11141D] px-10 py-3 rounded-lg font-semibold "
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
