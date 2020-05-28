import * as faceapi from 'face-api.js';

/**
 * Load models and weights
 * @returns {Promise<void>}
 */
export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

    console.log('models loaded')
}

/**
 *
 * @param blob
 * @returns {Promise<ComputeAllFaceDescriptorsTask<WithFaceLandmarks<{detection: FaceDetection}, FaceLandmarks68>>>}
 */
export async function getFullFaceDescription(blob) {
    // fetch image to api
    let img = await faceapi.fetchImage(blob);

    // detect all faces and generate full description from image
    // including landmark and descriptor of each face
    console.log('face detecting end');
    return faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
}
