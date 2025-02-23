/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useEffect, useState, useRef } from 'react';
import { FaceLandmarker, FaceLandmarkerOptions, FilesetResolver } from '@mediapipe/tasks-vision';
import { Color, Euler, Matrix4 } from 'three';
import { Canvas } from '@react-three/fiber';
import Avatar from './Avatar';
import * as faceapi from 'face-api.js';
import { loadFaceApiModels } from '@/utils/faceApiUtil';

// const defaultAvatarUrl = '/characters/realistic_elf_warrior_from_cc.glb';
const defaultAvatarUrl = '/characters/test.glb'; //'/characters/ssrbs_2.0_hololive.glb';
// 'https://models.readyplayer.me/66af16194d3eefd8c86cc4b2.glb?morphTargets=ARKit&textureAtlas=1024';

const options: FaceLandmarkerOptions = {
  baseOptions: {
    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
    delegate: 'GPU',
  },
  numFaces: 1,
  runningMode: 'VIDEO',
  outputFaceBlendshapes: true,
  outputFacialTransformationMatrixes: true,
};

let lastVideoTime = -1;

export default function WebcamComponent({ setIsSuccess }: { setIsSuccess: (success: boolean) => void }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blendshapes, setBlendshapes] = useState<any[]>([]);
  const [rotation, setRotation] = useState<Euler | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expression, setExpression] = useState<string>('neutral');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expressionScore, setExpressionScore] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [happyCount, setHappyCount] = useState(0);
  const animationFrameIdRef = useRef<number | null>(null); // animationFrame ID 저장
  const [detectCount, setDetectCount] = useState(0);

  const setup = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
    );
    const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, options);

    // const video = document.getElementById('video') as HTMLVideoElement;
    // videoRef.current = video;

    // TODO ref 에 대해 더 알아보기
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      })
      .then(function (stream) {
        if (videoRef.current !== null) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener('loadeddata', () => {
            detectFaceExpressions(videoRef.current as HTMLVideoElement); // 표정 감지 시작
            predict(faceLandmarker); // mediapipe로 위치 및 회전 감지 시작
          });
        }
      })
      .catch(function (error) {
        if (error.name === 'ConstraintNotSatisfiedError') {
          alert(
            'The resolution ' +
              // constraints.video.width.exact +
              'x' +
              // constraints.video.width.exact +
              ' px is not supported by your device.'
          );
        } else if (error.name === 'PermissionDeniedError') {
          alert(
            'Permissions have not been granted to use your camera and ' +
              'microphone, you need to allow the page access to your devices in ' +
              'order for the demo to work.'
          );
        }
        alert('getUserMedia error: ' + error.name);
      });
  };

  const detectFaceExpressions = async (video: HTMLVideoElement) => {
    await loadFaceApiModels();

    const detect = async () => {
      setDetectCount(prev => prev + 1);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0 && detections[0].expressions) {
        const expressions = detections[0].expressions;
        const maxExpression = Object.keys(expressions).reduce((a, b) =>
          expressions[a as keyof faceapi.FaceExpressions] > expressions[b as keyof faceapi.FaceExpressions] ? a : b
        );

        const score = expressions[maxExpression as keyof faceapi.FaceExpressions];
        if (typeof score === 'number') {
          setExpression(maxExpression);
          setExpressionScore(score);
          if (maxExpression === 'happy' && score > 0.5) {
            setHappyCount(prev => {
              console.log('happyCount: ', prev + 1);
              return prev + 1;
            });
          } else {
            setHappyCount(0);
            console.log('점수 초기화');
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(detect);
    };

    detect();
  };

  useEffect(() => {
    if (happyCount >= 10) {
      setIsSuccess(true);
    }
  }, [happyCount]);

  const predict = async (faceLandmarker: FaceLandmarker) => {
    const nowInMs = Date.now();
    const video = videoRef.current;

    if (video && lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      const faceLandmarkerResult = faceLandmarker.detectForVideo(video, nowInMs);

      if (
        faceLandmarkerResult.faceBlendshapes &&
        faceLandmarkerResult.faceBlendshapes.length > 0 &&
        faceLandmarkerResult.faceBlendshapes[0].categories
      ) {
        setBlendshapes(faceLandmarkerResult.faceBlendshapes[0].categories);

        const matrix = new Matrix4().fromArray(faceLandmarkerResult.facialTransformationMatrixes![0].data);
        setRotation(new Euler().setFromRotationMatrix(matrix));
      }
    }

    animationFrameIdRef.current = window.requestAnimationFrame(() => predict(faceLandmarker));
  };

  useEffect(() => {
    setup(); // 시작 시 캠 설정 및 감지 시작

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current); // 컴포넌트 언마운트 시 반복 작업 정리
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>detectCount:{detectCount}</div>
      <div>happyCount:{happyCount}</div>
      <video ref={videoRef} id="video" style={{ width: '300px', height: '300px', opacity: 30 }} autoPlay muted />

      <Canvas style={{ height: 240, width: '100%' }} camera={{ fov: 60, position: [0, 1, 5] }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} color={new Color(1, 1, 0)} intensity={1.75} />
        <pointLight position={[-10, 0, 10]} color={new Color(1, 0, 0)} intensity={1.75} />
        <pointLight position={[0, 0, 10]} intensity={1.75} />
        <Avatar url={defaultAvatarUrl} blendshapes={blendshapes} rotation={rotation} />
      </Canvas>
    </div>
  );
}
