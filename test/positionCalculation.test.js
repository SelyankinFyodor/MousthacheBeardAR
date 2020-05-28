const fetch = require('node-fetch');
const faceApi = require("face-api.js");
const fs = require('fs');

const canvas = require("canvas")
const {Canvas, Image, ImageData} = canvas;

import position from '../src/tools/positionСalculation'

faceApi.env.monkeyPatch({fetch, Canvas, Image, ImageData});

describe('should get correct coordinates for photos', ()=>{
  const MODEL_URL = __dirname + '/models'

  const range = (begin, end) => Array.from({length:end-begin+1},(v,k)=>k+begin);

  const testSet = JSON.parse(fs.readFileSync(__dirname + '/testSet.json', 'utf8'));

  const coords_indexes = {
    nose: range(31,35),
    lipsUp: range(48,54),
    lipsDown: [48, 59, 58, 57, 56, 55, 54],
    oval: range(0,16)
  };

  const fetch_landmarks = (landmarks) => {
    const positions = landmarks[0].landmarks.positions
    return {
      nose:coords_indexes.nose.map(el => positions[el]),
      lipsUp:coords_indexes.lipsUp.map(el => positions[el]),
      lipsDown:coords_indexes.lipsDown.map(el => positions[el]),
      oval:coords_indexes.oval.map(el => positions[el])
    }
  };

  beforeAll(async () => {
    await faceApi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
    await faceApi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
  });

  const delta = {
    moustache: { x: 20, y: 20, width: 20, height: 20, angle: 2},
    beard: {x: 20, y: 50, width: 20, height: 20, angle: 4}
  }

  const checkDistance = (standard, model)=>{

    const parentCheck = (parentKey)=>{
      for (let key in standard[parentKey]){
        if (Math.abs(standard[parentKey][key] - model[parentKey][key]) > delta[parentKey][key]){
          console.log(key+": " + standard[parentKey][key] + " vs " + model[parentKey][key])
          return false
        }
      }
      return true
    }

    return parentCheck('beard') && parentCheck('moustache')
  };

  describe('doTests', ()=>{
    testSet.forEach(el => test(el.photo, async ()=>{
      const img = await canvas.loadImage(__dirname +'/photos/' + el.photo + '.jpg')
      const landmarks = await faceApi.detectAllFaces(img).withFaceLandmarks();

      expect(landmarks.lenght).not.toBe(0)

      const coordinates = position(el.set.measure, fetch_landmarks(landmarks))

      const exp_set = {
        measure: el.set.measure,
        moustache: coordinates.moustache,
        beard: coordinates.beard
      }
      expect(checkDistance(el.set,exp_set)).toBe(true);

    }, 30000))
  });
})
