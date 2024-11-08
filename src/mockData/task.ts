export const initialTaskData = {
  taskType: "FINE_TUNE",
  description: "",
  modelDetails: {
    modelId: "",
    modelType: "",
    framework: "",
    modelName: "",
    pretrainedModelUrl: "",
    configUrl: "",
    other: {
      vocabUrl: "",
      tokenizerConfigUrl: "",
      specialTokensMapUrl: "",
    },
  },
  trainingData: {
    trainingDataUrl: "",
    validationDataUrl: "",
  },
  trainingParameters: {
    learningRate: 0.0001,
    batchSize: 16,
    numEpochs: 3,
    optimizer: "AdamW",
    lossFunction: "CrossEntropyLoss",
  },
}

// export const initialTaskData = {
//     taskType: "FINE_TUNE",
//     description: "Fine-tuning DistilBERT for sentiment analysis on IMDb reviews.",
//     modelDetails: {
//         modelId: "clw8zb9dd0001qb699u4523mm",
//         modelType: "DistilBERT",
//         framework: "Transformers",
//         modelName: "distilbert-base-uncased",
//         pretrainedModelUrl: "https://blendrai.s3.ap-southeast-2.amazonaws.com/aimodels/distilbert-base-uncased/model.safetensors",
//         configUrl: "https://blendrai.s3.ap-southeast-2.amazonaws.com/aimodels/distilbert-base-uncased/config.json",
//         tokenizerFiles: {
//             vocab: "https://blendrai.s3.ap-southeast-2.amazonaws.com/aimodels/distilbert-base-uncased/vocab.txt",
//             tokenizerConfig: "https://blendrai.s3.ap-southeast-2.amazonaws.com/aimodels/distilbert-base-uncased/tokenizer_config.json",
//             specialTokensMap: "https://blendrai.s3.ap-southeast-2.amazonaws.com/aimodels/distilbert-base-uncased/special_tokens_map.json"
//         }
//     },
//     trainingData: {
//         trainingDataUrl: "https://blendrai.s3.ap-southeast-2.amazonaws.com/aimodels/distilbert-base-uncased/training/train_data.csv",
//         validationDataUrl: "https://blendrai.s3.ap-southeast-2.amazonaws.com/aimodels/distilbert-base-uncased/training/validation_data.csv"
//     },
//     trainingParameters: {
//         learningRate: 0.0001,
//         batchSize: 16,
//         numEpochs: 3,
//         optimizer: "AdamW",
//         lossFunction: "CrossEntropyLoss"
//     },
// }
