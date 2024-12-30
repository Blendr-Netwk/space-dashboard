export type ITaskPayload = {
  nodeId: string
  gpu: {
    name: string
  }
  taskType: string
  description: string
  modelDetails: {
    modelId?: string
    modelType: string
    framework: string
    modelName: string
    pretrainedModelFile: FileList
    pretrainedModelUrl: string
    configFile: FileList
    configUrl: string
    other: {
      vocabUrl: string
      tokenizerConfigUrl: string
      specialTokensMapUrl: string
      vocabFile: FileList
      tokenizerConfigFile: FileList
      specialTokensMapFile: FileList
    }
  }
  trainingData: {
    trainingDataFile: FileList
    validationDataFile: FileList
    trainingDataUrl: string
    validationDataUrl: string
  }
  trainingParameters: {
    learningRate: number
    batchSize: number
    numEpochs: number
    optimizer: string
    lossFunction: string
  }
}