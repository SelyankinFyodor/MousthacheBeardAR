const fetch = require('node-fetch');
const faceApi = require("face-api.js");

const fs = require('fs');
const canvas = require("canvas")
const {Canvas, Image, ImageData} = canvas;


faceApi.env.monkeyPatch({fetch, Canvas, Image, ImageData});

describe('a', ()=>{
  const MODEL_URL = __dirname + '/models'

  beforeAll(async () => {
    // console.log('before all')
    await faceApi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
    await faceApi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
    console.log('before all')
  });

  it('a', async ()=>{

    const img = await canvas.loadImage(__dirname +'/photos/face001.jpg')
    const landmarks = await faceApi.detectAllFaces(img).withFaceLandmarks();
    console.log("landmarks")
    console.log(landmarks[0].landmarks.positions)
    console.log(1)
  }, 30000)
})
