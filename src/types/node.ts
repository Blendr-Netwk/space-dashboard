export type ITaskPayload = {
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

// interface CpuInfo {
//   current_frequency: number;
//   max_frequency: string;
//   model: string;
//   physical_cores: number;
//   total_cores: number;
// }
// interface GpuInfo {
//   id: string
//   name: string
//   total_memory_mb: number
// }

// interface NetworkInfo {
//   download_speed_mbps: number;
//   upload_speed_mbps: number;
// }

// interface StorageInfo {
//   path: string;
//   total_gb: number;
//   allocated_mb: number;
//   storage_type: string;
// }

// export interface NodeData {
//   cpuInfo: CpuInfo;
//   gpuInfo: GpuInfo;
//   id: string;
//   networkInfo: NetworkInfo;
//   nodeName: string;
//   socketId: string;
//   status: string;
//   storageInfo: StorageInfo;
//   createdAt: string;
//   updatedAt: string;
//   userId: string;
// }
