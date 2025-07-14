import * as faceapi from 'face-api.js';

export const loadFaceApiModels = async () => {
  const MODEL_URL = '/models';

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
  ]);
};

/* declare global {
  interface Window {
    faceapi: any; // 필요시 more specific하게 지정 가능
  }
}

export const loadFaceApiModels = async () => {
  const MODEL_URL = '/models';

  await Promise.all([
    window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    window.faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    window.faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    window.faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
  ]);
}; */
