import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { HumeClient } from 'hume/Client';

const hume = new HumeClient({
  apiKey: process.env.NEXT_PUBLIC_HUME_API_KEY!,
});

// export const getHumeSocket = () => {
//   const socket = hume.expressionMeasurement.stream.connect({
//     config: {
//       language: {},
//     },
//   });
//   return socket;
// };

/**
 * MediaPipe 얼굴 랜드마크 객체 배열을 3차원 좌표 배열로 변환합니다.
 * @param {Array<Array<{x: number, y: number, z: number}>>} landmarkObjects - 변환할 랜드마크 객체 배열
 * @returns {number[][][]} - 변환된 3차원 배열 (faces, landmarks, coordinates)
 */
export function convertLandmarksToArray(landmarkObjects: NormalizedLandmark[][]) {
  // 결과 배열 초기화
  const result = [];

  // 각 얼굴에 대해 처리
  for (let faceIndex = 0; faceIndex < landmarkObjects.length; faceIndex++) {
    const face = landmarkObjects[faceIndex];
    const faceArray = [];

    // 각 랜드마크에 대해 처리
    for (let landmarkIndex = 0; landmarkIndex < face.length; landmarkIndex++) {
      const landmark = face[landmarkIndex];
      // x, y, z 좌표를 추출하여 배열로 변환하고 소수점 6자리로 제한
      faceArray.push([
        parseFloat(landmark.x.toFixed(6)),
        parseFloat(landmark.y.toFixed(6)),
        parseFloat(landmark.z.toFixed(6)),
      ]);
    }

    result.push(faceArray);
  }

  return result;
}
