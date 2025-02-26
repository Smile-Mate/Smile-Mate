/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useFBX, useTexture } from '@react-three/drei';
import { useGraph, useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { Object3D, Euler, RepeatWrapping } from 'three';

export default function AvatarRabbit({ blendshapes, rotation }: { blendshapes: any[]; rotation: Euler | null }) {
  const fbx = useFBX('/characters/rabbit/rabbits.fbx');
  const { nodes } = useGraph(fbx);
  const [headMeshes, setHeadMeshes] = useState<Object3D[]>([]);

  // 텍스처 로딩
  const texture = useTexture('/characters/rabbit/rabbit_AlbedoTransparency2.png');

  // 텍스처 적용
  useEffect(() => {
    if (texture) {
      // 텍스처 설정 (필요에 따라 조정)
      texture.wrapS = texture.wrapT = RepeatWrapping;

      // 모델의 모든 메시에 텍스처 적용
      fbx.traverse((child: any) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [fbx, texture]);

  // NOTE dev
  useEffect(() => {
    console.log('nodes', nodes);
    console.log('blendshapes', blendshapes);
    console.log('rotation', rotation);
  }, [nodes, blendshapes, rotation]);

  useEffect(() => {
    const meshes: any[] = [];
    // FBX 모델 구조에 따라 아래 노드 이름을 수정해야 할 수 있습니다
    if (nodes.Head) meshes.push(nodes.Head);
    if (nodes.Teeth) meshes.push(nodes.Teeth);
    if (nodes.Face) meshes.push(nodes.Face);
    if (nodes.Avatar) meshes.push(nodes.Avatar);

    // 만약 정확한 노드명이 없다면 모든 메시를 탐색
    fbx.traverse((obj: any) => {
      if (obj.isMesh && obj.morphTargetDictionary && Object.keys(obj.morphTargetDictionary).length > 0) {
        if (!meshes.includes(obj)) {
          meshes.push(obj);
        }
      }
    });

    setHeadMeshes(meshes);
  }, [nodes, fbx]);

  useFrame(() => {
    if (blendshapes.length > 0) {
      blendshapes.forEach((element: any) => {
        headMeshes.forEach((mesh: any) => {
          // morphTargetDictionary가 존재하고 해당 blendshape이 있는지 확인
          if (
            mesh.morphTargetDictionary &&
            element.categoryName[0].toUpperCase() + element.categoryName.slice(1) in mesh.morphTargetDictionary
          ) {
            const index =
              mesh.morphTargetDictionary[element.categoryName[0].toUpperCase() + element.categoryName.slice(1)];
            if (index >= 0) {
              mesh.morphTargetInfluences[index] = element.score;
            }
          }
        });
      });
    }

    if (rotation) {
      // FBX 모델의 뼈대 구조에 따라 수정이 필요할 수 있습니다
      if (nodes.Head) nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      if (nodes.Neck) nodes.Neck.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
      if (nodes.Spine2) nodes.Spine2.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);

      // FBX 모델의 뼈대 구조가 다를 경우 아래와 같이 다른 뼈대를 찾을 수 있습니다
      fbx.traverse((obj: any) => {
        if (obj.isBone) {
          if (obj.name.includes('Head')) {
            obj.rotation.set(rotation.x, rotation.y, rotation.z);
          } else if (obj.name.includes('Neck')) {
            obj.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
          } else if (obj.name.includes('Spine')) {
            obj.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);
          }
        }
      });
    }
  });

  // FBX 모델은 보통 스케일이 다르므로 적절히 조정
  return <primitive object={fbx} position={[0, -3, 0]} scale={[0.5, 0.5, 0.5]} />;
}
