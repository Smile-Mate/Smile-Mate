/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useFBX, useTexture } from '@react-three/drei';
import { useGraph, useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { Object3D, Euler } from 'three';

export default function AvatarElf({
  url,
  bodyTexture,
  clothesTexture,
  faceTexture,
  hairTexture,
  blendshapes,
  rotation,
}: {
  url: string;
  bodyTexture?: string;
  clothesTexture?: string;
  faceTexture?: string;
  hairTexture?: string;
  blendshapes: any[];
  rotation: Euler | null;
}) {
  const fbx = useFBX(url);
  const { nodes } = useGraph(fbx);
  const [headMeshes, setHeadMeshes] = useState<Object3D[]>([]);

  // 텍스처 URL 배열 생성 (존재하는 텍스처만)
  const textureUrls = [bodyTexture, clothesTexture, faceTexture, hairTexture].filter(Boolean) as string[];

  // 모든 텍스처 로드
  const textures = useTexture(textureUrls.length > 0 ? textureUrls : []);

  // 텍스처들을 배열로 변환
  const textureArray = Array.isArray(textures) ? textures : [textures];

  // 텍스처 적용
  useEffect(() => {
    if (textureUrls.length === 0) return;

    fbx.traverse((child: any) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();

        // Body 텍스처 적용
        if (bodyTexture && (name.includes('Body') || name.includes('skin'))) {
          const index = textureUrls.indexOf(bodyTexture);
          if (index !== -1 && textureArray[index]) {
            child.material.map = textureArray[index];
            child.material.needsUpdate = true;
          }
        }

        // Clothes 텍스처 적용
        if (
          clothesTexture &&
          (name.includes('cloth') ||
            name.includes('outfit') ||
            name.includes('dress') ||
            name.includes('shirt') ||
            name.includes('pant'))
        ) {
          const index = textureUrls.indexOf(clothesTexture);
          if (index !== -1 && textureArray[index]) {
            child.material.map = textureArray[index];
            child.material.needsUpdate = true;
          }
        }

        // Face 텍스처 적용
        if (faceTexture && (name.includes('face') || name.includes('head'))) {
          const index = textureUrls.indexOf(faceTexture);
          if (index !== -1 && textureArray[index]) {
            child.material.map = textureArray[index];
            child.material.needsUpdate = true;
          }
        }

        // Hair 텍스처 적용
        if (hairTexture && name.includes('hair')) {
          const index = textureUrls.indexOf(hairTexture);
          if (index !== -1 && textureArray[index]) {
            child.material.map = textureArray[index];
            child.material.needsUpdate = true;
          }
        }
      }
    });

    // 콘솔에 관련 모델 부위 이름 출력 (디버깅용)
    console.log('모델 메시 이름:');
    fbx.traverse((child: any) => {
      if (child.isMesh) {
        console.log(child.name);
      }
    });
  }, [fbx, textureUrls, textureArray, bodyTexture, clothesTexture, faceTexture, hairTexture]);

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
  }, [nodes, fbx, url]);

  useFrame(() => {
    if (blendshapes.length > 0) {
      blendshapes.forEach((element: any) => {
        headMeshes.forEach((mesh: any) => {
          if (mesh.morphTargetDictionary && element.categoryName in mesh.morphTargetDictionary) {
            const index = mesh.morphTargetDictionary[element.categoryName];
            if (index >= 0) {
              mesh.morphTargetInfluences[index] = element.score;
            }
          }
        });
      });
    }

    if (rotation) {
      if (nodes.Head) nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      if (nodes.Neck) nodes.Neck.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
      if (nodes.Spine2) nodes.Spine2.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);

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

  return <primitive object={fbx} position={[0, -23, 0]} scale={[0.12, 0.12, 0.12]} />;
}
