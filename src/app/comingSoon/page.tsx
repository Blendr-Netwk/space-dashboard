import Image from "next/image"

const ComingSoon = () => {
  return (
    <div className="min-h-screen h-screen bg-[#000] flex flex-col items-center justify-center coming-bg">
      <div className="flex items-center gap-4">
        <Image
          src={"/assets/img/sidebar/brand.png"}
          alt="logo"
          className="w-[2rem] 2xl:w-[2.5rem] h-auto"
          width={100}
          height={100}
        />
        <h3 className="text-[1.6rem] lg:text-[2.2rem] 2xl:text-[2.8rem] tracking-wider font-semibold text-white">
          Coming Soon
        </h3>
      </div>
    </div>
  )
}

export default ComingSoon
