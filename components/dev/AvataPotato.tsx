'use client';

import React, { useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Object3D, Euler } from 'three';

interface AvatarProps {
  blendshapes: Array<{
    categoryName: string;
    score: number;
  }>;
  rotation: Euler | null;
  animationIndex?: number; // 재생할 애니메이션 인덱스
}

export default function AvatarPotato({
  blendshapes,
  rotation,
  animationIndex = 0, // 기본값으로 첫 번째 애니메이션 선택
}: AvatarProps) {
  // GLTF 모델 로드
  // const { scene, animations } = useGLTF('/characters/potato.gltf');
  const { scene, animations } = useGLTF('/characters/vtuber_convert_from_blend.glb');

  console.log('scene', scene);
  console.log('animations', animations);

  // 애니메이션 훅 추가
  const { actions } = useAnimations(animations, scene);

  console.log('actions', actions);

  // 헤드 메시 상태 관리
  const [headMeshes, setHeadMeshes] = useState<Object3D[]>([]);

  // 애니메이션 초기화 및 재생
  useEffect(() => {
    // 애니메이션이 존재하는지 확인
    if (animations.length > 0 && actions) {
      const action = actions[animationIndex];
      console.log('action', action);
      if (action) {
        // 애니메이션 설정 및 재생
        action.reset(); // 애니메이션 리셋
        action.play(); // 애니메이션 재생

        // 필요한 경우 추가 설정
        // action.setEffectiveTimeScale(1); // 재생 속도 설정
        // action.setLoop(THREE.LoopRepeat, Infinity); // 반복 설정
      }
    }

    // 헤드 메시 찾기
    const meshes = Object.values(scene.children).filter(
      child =>
        child.name.includes('Wolf3D_Head') ||
        child.name.includes('Wolf3D_Teeth') ||
        child.name.includes('Wolf3D_Beard') ||
        child.name.includes('Wolf3D_Avatar')
    );

    setHeadMeshes(meshes);

    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      if (actions) {
        Object.values(actions).forEach(action => action?.stop());
      }
    };
  }, [scene, animations, actions, animationIndex]);

  // 프레임마다 blendshapes와 회전 처리
  useFrame(() => {
    // Blendshapes 적용
    if (blendshapes.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headMeshes.forEach((mesh: any) => {
        blendshapes.forEach(element => {
          const index = mesh.morphTargetDictionary?.[element.categoryName];
          if (index !== undefined && index >= 0) {
            mesh.morphTargetInfluences[index] = element.score;
          }
        });
      });
    }

    // 회전 적용
    if (rotation) {
      // 본 회전 로직
      const findAndRotateBone = (boneName: string, rotationFactor: number = 1) => {
        const bone = scene.getObjectByName(boneName);
        if (bone) {
          bone.rotation.set(rotation.x * rotationFactor, rotation.y * rotationFactor, rotation.z * rotationFactor);
        }
      };

      findAndRotateBone('Head');
      findAndRotateBone('Neck', 0.2);
      findAndRotateBone('Spine2', 0.1);
    }
  });

  return <primitive object={scene} position={[0, 0, 0]} scale={[3, 3, 3]} />;
}

// 모델 프리로드
useGLTF.preload('/characters/potato.gltf');
