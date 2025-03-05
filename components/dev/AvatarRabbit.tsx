'use client';

import React, { useEffect, useState } from 'react';
import { useFBX, useTexture, useAnimations } from '@react-three/drei';
import { useGraph, useFrame } from '@react-three/fiber';
import { Object3D, Euler, RepeatWrapping, Mesh, MeshStandardMaterial, SkinnedMesh } from 'three';

interface AvatarRabbitProps {
  blendshapes: Array<{
    categoryName: string;
    score: number;
  }>;
  rotation: Euler | null;
  animationIndex?: number;
}

export default function AvatarRabbit({ blendshapes, rotation, animationIndex = 0 }: AvatarRabbitProps) {
  // FBX 모델 및 텍스처 로드
  const fbx = useFBX('/characters/rabbit/rabbits.fbx');
  const { nodes } = useGraph(fbx);
  const { actions } = useAnimations(fbx.animations, fbx);

  // 텍스처 로딩
  const texture = useTexture('/characters/rabbit/rabbit_AlbedoTransparency2.png');

  // 헤드 메시 상태 관리
  const [headMeshes, setHeadMeshes] = useState<Object3D[]>([]);

  // 텍스처 적용
  useEffect(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;

      fbx.traverse(child => {
        // @ts-expect-error - Three.js 타입 호환성 문제
        if (child.isMesh) {
          const mesh = child as Mesh;
          if (mesh.material) {
            const material = Array.isArray(mesh.material) ? mesh.material[0] : (mesh.material as MeshStandardMaterial);
            // @ts-expect-error - Three.js 타입 호환성 문제
            material.map = texture;
            material.needsUpdate = true;
          }
        }
      });
    }
  }, [fbx, texture]);

  // 애니메이션 및 메시 초기화
  useEffect(() => {
    // 디버그 로그
    console.log('Nodes:', nodes);
    console.log('Blendshapes:', blendshapes);
    console.log('Rotation:', rotation);

    console.log('fbx.animations', fbx.animations);

    // 애니메이션 재생
    if (fbx.animations.length > 0 && actions) {
      const action = actions[animationIndex];

      if (action) {
        action.reset();
        action.play();
      }
    }

    // 헤드 메시 찾기
    const meshes: Object3D[] = [];
    const potentialMeshNames = ['Head', 'Teeth', 'Face', 'Avatar'];

    potentialMeshNames.forEach(name => {
      if (nodes[name]) meshes.push(nodes[name]);
    });

    // 모프 타겟이 있는 추가 메시 찾기
    fbx.traverse(obj => {
      const skinnedMesh = obj as SkinnedMesh;
      if (
        // @ts-expect-error - Three.js 타입 호환성 문제
        obj.isMesh &&
        skinnedMesh.morphTargetDictionary &&
        Object.keys(skinnedMesh.morphTargetDictionary).length > 0 &&
        !meshes.includes(obj)
      ) {
        meshes.push(obj);
      }
    });

    setHeadMeshes(meshes);

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (actions) {
        Object.values(actions).forEach(action => action?.stop());
      }
    };
  }, [nodes, fbx, fbx.animations, actions, animationIndex]);

  // 프레임마다 Blendshapes 및 회전 처리
  useFrame(() => {
    // Blendshapes 적용
    if (blendshapes.length > 0) {
      blendshapes.forEach(element => {
        headMeshes.forEach(mesh => {
          const skinnedMesh = mesh as SkinnedMesh;
          const capitalizedCategory = element.categoryName[0].toUpperCase() + element.categoryName.slice(1);

          if (skinnedMesh.morphTargetDictionary && capitalizedCategory in skinnedMesh.morphTargetDictionary) {
            const index = skinnedMesh.morphTargetDictionary[capitalizedCategory];
            if (index >= 0 && skinnedMesh.morphTargetInfluences) {
              skinnedMesh.morphTargetInfluences[index] = element.score;
            }
          }
        });
      });
    }

    // 회전 적용
    if (rotation) {
      const rotateBone = (boneName: string, factor: number = 1) => {
        const bone = fbx.getObjectByName(boneName);
        if (bone) {
          bone.rotation.set(rotation.x * factor, rotation.y * factor, rotation.z * factor);
        }
      };

      // 주요 본 회전
      rotateBone('Head');
      rotateBone('Neck', 0.2);
      rotateBone('Spine', 0.1);

      // 대체 탐색 방법
      fbx.traverse(obj => {
        // @ts-expect-error - Three.js 타입 호환성 문제
        if (obj.isBone) {
          if (obj.name.toLowerCase().includes('head')) {
            obj.rotation.set(rotation.x, rotation.y, rotation.z);
          } else if (obj.name.toLowerCase().includes('neck')) {
            obj.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
          } else if (obj.name.toLowerCase().includes('spine')) {
            obj.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);
          }
        }
      });
    }
  });

  return <primitive object={fbx} position={[0, -3, 0]} scale={[0.5, 0.5, 0.5]} />;
}

// 최적화: 모델과 텍스처 프리로드
useFBX.preload('/characters/rabbit/rabbits.fbx');
useTexture.preload('/characters/rabbit/rabbit_AlbedoTransparency2.png');
