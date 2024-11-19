"use client"

import { fetchAllAiModels } from "@/clientApi/ai"
import { getSignedURL, uploadFile } from "@/clientApi/fileUpload"
import { postNewTask } from "@/clientApi/node"
import { MainContainer } from "@/components/container/MainContainer"
import { LogsComponent } from "@/components/sections/taskSection"
import { initialTaskData } from "@/mockData"
import { ITaskPayload } from "@/types/node"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { RxTriangleDown } from "react-icons/rx"

const Tasks = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ITaskPayload>({ defaultValues: initialTaskData })

  const [taskId, setTaskId] = useState<string>("")
  const [models, setModels] = useState<any[]>([])

  const watchAllFields = watch()

  useEffect(() => {
    const getAiModels = async () => {
      try {
        const models = await fetchAllAiModels()
        if (models.length > 0) {
          const model = models[0]
          const otherUrl = model.otherUrl

          setValue(
            "description",
            "This model can be fine-tuned using custom datasets to optimize its performance for specific tasks and achieve better accuracy in targeted applications."
          )
          setValue("modelDetails.modelId", model.id)
          setValue("modelDetails.modelType", model.type)
          setValue("modelDetails.modelName", model.modelName)
          setValue("modelDetails.framework", model.framework)
          setValue("modelDetails.configUrl", model.configUrl)
          setValue("modelDetails.pretrainedModelUrl", model.pretrainedModelUrl)
          setValue("modelDetails.other.vocabUrl", otherUrl.vocab)
          setValue(
            "modelDetails.other.tokenizerConfigUrl",
            otherUrl.tokenizerConfig
          )
          setValue(
            "modelDetails.other.specialTokensMapUrl",
            otherUrl.specialTokensMap
          )
        }

        setModels(models)
      } catch (err) {
        console.log(err)
      }
    }

    getAiModels()
  }, [])

  const handleFormRequired = () => {
    const modelDetails = watchAllFields.modelDetails
    const trainingData = watchAllFields.trainingData
    const trainingParameters = watchAllFields.trainingParameters
    const modelType = modelDetails.modelType
    const trainingDataFile = trainingData.trainingDataFile?.[0]
    const validationDataFile = trainingData.validationDataFile?.[0]
    const learningRate = trainingParameters.learningRate
    const batchSize = trainingParameters.batchSize
    const numEpochs = trainingParameters.numEpochs

    return (
      !modelType ||
      !trainingDataFile ||
      !validationDataFile ||
      !learningRate ||
      !batchSize ||
      !numEpochs
    )
  }

  const onSubmit: SubmitHandler<ITaskPayload> = async (data) => {
    try {
      console.log(data)
      const trainingData = watchAllFields.trainingData
      const trainingDataFile = trainingData.trainingDataFile?.[0]
      const validationDataFile = trainingData.validationDataFile?.[0]

      if (handleFormRequired()) return

      const trainResponse = await uploadFile(trainingDataFile)
      const validationResponse = await uploadFile(validationDataFile)
      const trainingDataUrl = await getSignedURL(trainResponse.data.cid)
      const validationDataUrl = await getSignedURL(validationResponse.data.cid)

      const response = await postNewTask({
        ...data,
        trainingData: {
          trainingDataUrl,
          validationDataUrl,
        },
      })
      console.log(response)
      setTaskId(response.data.task.id)

      // const pretrainedModelFile = data.modelDetails.pretrainedModelFile[0];
      // const configFile = data.modelDetails.configFile[0];
      // const vocabFile = data.modelDetails.other.vocabFile[0];
      // const tokenizerConfigFile =
      //   data.modelDetails.other.tokenizerConfigFile[0];
      // const specialTokensMapFile =
      //   data.modelDetails.other.specialTokensMapFile[0];
      // const trainingDataFile = data.trainingData.trainingDataFile[0]
      // const validationDataFile = data.trainingData.validationDataFile[0]

      // const pretrainedModelUrl = await uploadFileToS3(
      //   pretrainedModelFile,
      //   `aimodels/${modelName}/${pretrainedModelFile.name}`
      // );
      // const configUrl = await uploadFileToS3(
      //   configFile,
      //   `aimodels/${modelName}/${configFile.name}`
      // );
      // const vocabUrl = await uploadFileToS3(
      //   vocabFile,
      //   `aimodels/${modelName}/${vocabFile.name}`
      // );
      // const tokenizerConfigUrl = await uploadFileToS3(
      //   tokenizerConfigFile,
      //   `aimodels/${modelName}/${tokenizerConfigFile.name}`
      // );
      // const specialTokensMapUrl = await uploadFileToS3(
      //   specialTokensMapFile,
      //   `aimodels/${modelName}/${specialTokensMapFile.name}`
      // );
      // const trainingDataUrl = await uploadFileToS3(
      //   trainingDataFile,
      //   `aimodels/${modelName}/training/${trainingDataFile.name}`
      // )
      // const validationDataUrl = await uploadFileToS3(
      //   validationDataFile,
      //   `aimodels/${modelName}/training/${validationDataFile.name}`
      // )

      // // console.log(pretrainedModelUrl);
      // // console.log(configUrl);
      // // console.log(vocabUrl);
      // // console.log(tokenizerConfigUrl);
      // // console.log(specialTokensMapUrl);
      // console.log(trainingDataUrl)
      // console.log(validationDataUrl)

      // // setValue("modelDetails.pretrainedModelUrl", pretrainedModelUrl);
      // // setValue("modelDetails.configUrl", configUrl);
      // // setValue("modelDetails.other.vocabUrl", vocabUrl);
      // // setValue("modelDetails.other.tokenizerConfigUrl", tokenizerConfigUrl);
      // // setValue("modelDetails.other.specialTokensMapUrl", specialTokensMapUrl);
      // setValue("trainingData.trainingDataUrl", trainingDataUrl)
      // setValue("trainingData.validationDataUrl", validationDataUrl)

      // // data.modelDetails.pretrainedModelUrl = pretrainedModelUrl;
      // // data.modelDetails.configUrl = configUrl;
      // // data.modelDetails.other.vocabUrl = vocabUrl;
      // // data.modelDetails.other.tokenizerConfigUrl = tokenizerConfigUrl;
      // // data.modelDetails.other.specialTokensMapUrl = specialTokensMapUrl;
      // data.trainingData.trainingDataUrl = trainingDataUrl
      // data.trainingData.validationDataUrl = validationDataUrl

      // // console.log("fileType", `${pretrainedModelFile.type}`);
      // // const predefinedUrl = await generatePredefinedUrl({
      // //   fileName: `aimodels/${modelName}/${pretrainedModelFile.name}`,
      // //   fileType: pretrainedModelFile.type,
      // // });
      // // console.log(predefinedUrl);
      // // const reponse = await uploadToAws(predefinedUrl, pretrainedModelFile);
      // console.log(data)
      // const response = await postNewTask(data)
      // console.log(response)
      // setTaskId(response.data.task.id)
    } catch (err) {
      console.log(err)
    }
  }

  const insertFileName = (file: any) => {
    if (file && file.length > 0) {
      return file[0].name
    } else {
      return "Choose Files"
    }
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.files);
  // };

  const handleModelTypeChange = (value: string) => {
    if (!value) return

    const model = models.find((i) => i.type === value)

    setValue("modelDetails.modelType", value)
    setValue("modelDetails.modelName", model.modelName)
    // setValue("description", model.description)
    setValue("modelDetails.framework", model.framework)
  }

  return (
    <MainContainer>
      <div className="w-full grid grid-cols-9 lg:items-start lg:justify-between gap-8 sm:pl-[150px] sm:pr-5">
        <div className=" w-full mt-20 px-5 sm:p-0 sm:pb-10 sm:w-full sm:mt-8  col-span-9 lg:col-span-6 flex flex-col">
          <h2 className=" text-xl font-bold text-white sm:text-2xl ">
            Add Tasks
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" mt-14 mb-8">
              <h4
                className=" text-lg pb-4
            font-bold text-white sm:text-2xl border-bot "
              >
                Model Details
              </h4>

              <div className="mt-8 w-full flex flex-col items-start justify-start gap-[10px] ">
                <h4 className=" text-base font-semibold text-white">
                  Model Type <span className="text-red-600">*</span>
                </h4>
                <div className="w-full">
                  <Select onValueChange={handleModelTypeChange}>
                    <SelectTrigger className="model-toggle-btn flex items-center justify-between w-full h-[50px] rounded-[10px] p-4 text-gray-400 hover:text-gray-100">
                      <SelectValue
                        placeholder={
                          watchAllFields.modelDetails.modelType
                            ? watchAllFields.modelDetails.modelType
                            : "Model Type"
                        }
                      />
                      <RxTriangleDown />
                    </SelectTrigger>
                    <SelectContent className="model-toggle-btn bg-[#11141da5] backdrop-blur-sm text-white cursor-pointer">
                      {models &&
                        models.map((model, i) => {
                          return (
                            <SelectItem
                              key={model.type + i}
                              value={model.type}
                              className="p-2 hover:text-gray-100/50"
                            >
                              {model.type}
                            </SelectItem>
                          )
                        })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 items-center justify-center gap-4">
                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Model Name
                  </h4>
                  <input
                    type="text"
                    placeholder="Model Name"
                    className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300 cursor-not-allowed"
                    {...register("modelDetails.modelName")}
                    readOnly
                  />
                </div>

                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Task Type
                  </h4>
                  <input
                    type="text"
                    placeholder="Task Type"
                    className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300 cursor-not-allowed"
                    {...register("taskType")}
                    readOnly
                  />
                </div>

                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Description
                  </h4>
                  <textarea
                    rows={4}
                    placeholder="Description"
                    className=" model-toggle-btn w-full rounded-[10px] bg-[#010102] p-4 text-gray-300 cursor-not-allowed"
                    {...register("description")}
                    readOnly
                  />
                </div>

                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Framework
                  </h4>
                  <input
                    type="text"
                    placeholder="Framework"
                    className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300 cursor-not-allowed"
                    {...register("modelDetails.framework")}
                    readOnly
                  />
                </div>

                {/* <div className=" grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2">
                  <div className=" w-full flex flex-col items-start justify-start gap-[10px] ">
                    <h3 className=" text-base font-semibold text-white">
                      Pretrained Model File
                    </h3>
                    <div className="text-sm flex flex-col model-toggle-btn w-full h-[60px] rounded-[10px] bg-[#010102] p-4 relative cursor-pointer ">
                      <label
                        htmlFor="pretrainedModelFile"
                        className=" text-base font-semibold text-white absolute inset-0 rounded-[10px] opacity-0 cursor-pointer"
                      >
                        <input
                          id="pretrainedModelFile"
                          type="file"
                          placeholder="file"
                          className=" sr-only"
                          {...register("modelDetails.pretrainedModelFile")}
                        />
                      </label>
                      <div className=" flex items-center justify-start gap-4">
                        <Image
                          src="/assets/img/upload.png"
                          width={500}
                          height={500}
                          alt="Picture of the author"
                          className=" w-6"
                        />
                        <span className=" text-gray-200 ">
                          {insertFileName(
                            watchAllFields.modelDetails.pretrainedModelFile
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex flex-col items-start justify-start gap-[10px]  ">
                    <h3 className=" text-base font-semibold text-white">
                      Config File
                    </h3>
                    <div className="text-sm flex flex-col model-toggle-btn w-full h-[60px] rounded-[10px] bg-[#010102] p-4 relative cursor-pointer">
                      <label
                        htmlFor="configFile"
                        className=" text-base font-semibold text-white absolute inset-0 rounded-[10px] opacity-0 cursor-pointer"
                      >
                        <input
                          id="configFile"
                          type="file"
                          {...register("modelDetails.configFile")}
                          placeholder="file"
                          className=" sr-only"
                        />
                      </label>
                      <div className=" flex items-center justify-start gap-4">
                        <Image
                          src="/assets/img/upload.png"
                          width={500}
                          height={500}
                          alt="Picture of the author"
                          className=" w-6"
                        />
                        <span className=" text-gray-200 ">
                          {insertFileName(
                            watchAllFields.modelDetails.configFile
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className=" mt-14 mb-8">
              {/* <h4
                className=" text-lg pb-4
            font-bold text-white sm:text-2xl border-bot "
              >
                Tokenizer Files
              </h4>
              <div className=" mt-8 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-3">
                <div className=" w-full flex flex-col items-start justify-start gap-[10px] ">
                  <h3 className=" text-base font-semibold text-white">
                    Vocab File
                  </h3>
                  <div className="text-sm flex flex-col model-toggle-btn w-full h-[60px] rounded-[10px] bg-[#010102] p-4 relative cursor-pointer">
                    <label
                      htmlFor="vocabFile"
                      className=" text-base font-semibold text-white absolute inset-0 rounded-[10px] opacity-0 cursor-pointer"
                    >
                      <input
                        id="vocabFile"
                        type="file"
                        {...register("modelDetails.other.vocabFile")}
                        placeholder="file"
                        className=" sr-only"
                      />
                    </label>
                    <div className=" flex items-center justify-start gap-4">
                      <Image
                        src="/assets/img/upload.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className=" w-6"
                      />
                      <span className=" text-gray-200 ">
                        {" "}
                        {insertFileName(
                          watchAllFields.modelDetails.other.vocabFile
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" w-full flex flex-col items-start justify-start gap-[10px] ">
                  <h3 className=" text-base font-semibold text-white">
                    Tokenizer Config File
                  </h3>
                  <div className="text-sm flex flex-col model-toggle-btn w-full h-[60px] rounded-[10px] bg-[#010102] p-4 relative cursor-pointer">
                    <label
                      htmlFor="tokenizerConfigFile"
                      className=" text-base font-semibold text-white absolute inset-0 rounded-[10px] opacity-0 cursor-pointer"
                    >
                      <input
                        id="tokenizerConfigFile"
                        type="file"
                        {...register("modelDetails.other.tokenizerConfigFile")}
                        placeholder="file"
                        className=" sr-only"
                      />
                    </label>
                    <div className=" flex items-center justify-start gap-4">
                      <Image
                        src="/assets/img/upload.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className=" w-6"
                      />
                      <span className=" text-gray-200 ">
                        {insertFileName(
                          watchAllFields.modelDetails.other.tokenizerConfigFile
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" w-full flex flex-col items-start justify-start gap-[10px] ">
                  <h3 className=" text-base font-semibold text-white">
                    Special Tokens Map File
                  </h3>
                  <div className="text-sm flex flex-col model-toggle-btn w-full h-[60px] rounded-[10px] bg-[#010102] p-4 relative cursor-pointer">
                    <label
                      htmlFor="specialTokensMapFile"
                      className=" text-base font-semibold text-white absolute inset-0 rounded-[10px] opacity-0 cursor-pointer"
                    >
                      <input
                        id="specialTokensMapFile"
                        type="file"
                        {...register("modelDetails.other.specialTokensMapFile")}
                        placeholder="file"
                        className=" sr-only"
                      />
                    </label>
                    <div className=" flex items-center justify-start gap-4">
                      <Image
                        src="/assets/img/upload.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className=" w-6"
                      />
                      <span className=" text-gray-200 ">
                        {" "}
                        {insertFileName(
                          watchAllFields.modelDetails.other.specialTokensMapFile
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className=" mt-14 mb-8">
              <h4
                className=" text-lg pb-4
            font-bold text-white sm:text-2xl border-bot "
              >
                Training Data
              </h4>
              <div className=" mt-8 grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2">
                <div className=" w-full flex flex-col items-start justify-start gap-[10px] ">
                  <h3 className=" text-base font-semibold text-white">
                    Training Data File <span className="text-red-600">*</span>
                  </h3>
                  <div className="text-sm flex flex-col model-toggle-btn w-full h-[60px] rounded-[10px] bg-[#010102] p-4 relative cursor-pointer">
                    <label
                      htmlFor="trainingDataFile"
                      className=" text-base font-semibold text-white absolute inset-0 rounded-[10px] opacity-0 cursor-pointer"
                    >
                      <input
                        id="trainingDataFile"
                        type="file"
                        {...register("trainingData.trainingDataFile")}
                        placeholder="file"
                        className=" sr-only"
                      />
                    </label>
                    <div className=" flex items-center justify-start gap-4">
                      <Image
                        src="/assets/img/upload.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className=" w-6"
                      />
                      <span className=" text-gray-200 ">
                        {" "}
                        {insertFileName(
                          watchAllFields.trainingData.trainingDataFile
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" w-full flex flex-col items-start justify-start gap-[10px]  ">
                  <h3 className=" text-base font-semibold text-white">
                    Validation Data File <span className="text-red-600">*</span>
                  </h3>
                  <div className="text-sm flex flex-col model-toggle-btn w-full h-[60px] rounded-[10px] bg-[#010102] p-4 relative cursor-pointer">
                    <label
                      htmlFor="validationDataFile"
                      className=" text-base font-semibold text-white absolute inset-0 rounded-[10px] opacity-0 cursor-pointer"
                    >
                      <input
                        id="validationDataFile"
                        type="file"
                        {...register("trainingData.validationDataFile")}
                        placeholder="file"
                        className=" sr-only"
                      />
                    </label>
                    <div className=" flex items-center justify-start gap-4">
                      <Image
                        src="/assets/img/upload.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className=" w-6"
                      />
                      <span className=" text-gray-200 ">
                        {" "}
                        {insertFileName(
                          watchAllFields.trainingData.validationDataFile
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-14 mb-8">
              <h4
                className=" text-lg pb-4
            font-bold text-white sm:text-2xl border-bot "
              >
                Training Parameters
              </h4>
              <div className=" mt-8 grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2">
                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Learning Rate <span className="text-red-600">*</span>
                  </h4>
                  <input
                    type="number"
                    step=".0001"
                    {...register("trainingParameters.learningRate")}
                    placeholder="Learning Rate"
                    className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300"
                  />
                </div>
                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Batch Size <span className="text-red-600">*</span>
                  </h4>
                  <input
                    type="number"
                    {...register("trainingParameters.batchSize")}
                    placeholder="Batch Size"
                    className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300"
                  />
                </div>
                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Number of Epochs <span className="text-red-600">*</span>
                  </h4>
                  <input
                    type="number"
                    {...register("trainingParameters.numEpochs")}
                    placeholder="Number of Epochs"
                    className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300"
                  />
                </div>
                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Optimizer
                  </h4>
                  <input
                    type="text"
                    {...register("trainingParameters.optimizer")}
                    placeholder="Optimizer"
                    className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div className=" w-full flex flex-col items-start justify-start gap-[10px]">
                  <h4 className=" text-base font-semibold text-white">
                    Loss Function
                  </h4>
                  <input
                    type="text"
                    {...register("trainingParameters.lossFunction")}
                    placeholder="Loss Function"
                    className=" model-toggle-btn w-full h-[50px] rounded-[10px] bg-[#010102] p-4 text-gray-300 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <button
              disabled={isSubmitting || handleFormRequired()}
              className="flex items-center justify-center px-5 py-3 rounded-full bg-[#6c95c0] text-white font-medium max-w-[20rem] text-lg uppercase mx-auto w-full mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing.." : "Start"}
            </button>
          </form>
        </div>

        <LogsComponent taskId={taskId} />
      </div>
    </MainContainer>
  )
}

export default Tasks
