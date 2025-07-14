/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useFBX } from '@react-three/drei';
import { useGraph, useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { Object3D, Euler, RepeatWrapping, MeshStandardMaterial, TextureLoader } from 'three';

export default function AvatarReal({
  url,
  textureUrl,
  blendshapes,
  rotation,
}: {
  url: string;
  textureUrl: string;
  blendshapes: any[];
  rotation: Euler | null;
}) {
  const fbx = useFBX(url);
  const { nodes } = useGraph(fbx);
  const [headMeshes, setHeadMeshes] = useState<Object3D[]>([]);

  // ✅ 텍스처를 useLoader로 불러오기
  const aoMap = useLoader(TextureLoader, `${textureUrl}/DOG_ambient_occlusion.png`);
  const baseColorMap = useLoader(TextureLoader, `${textureUrl}/DOG_base_color.png`);
  const metallicMap = useLoader(TextureLoader, `${textureUrl}/DOG_metallic.png`);
  const normalMap = useLoader(TextureLoader, `${textureUrl}/DOG_normal.png`);
  const roughnessMap = useLoader(TextureLoader, `${textureUrl}/DOG_roughness.png`);

  useEffect(() => {
    const textures = [aoMap, baseColorMap, metallicMap, normalMap, roughnessMap];
    textures.forEach(tex => {
      tex.wrapS = tex.wrapT = RepeatWrapping;
    });

    baseColorMap.colorSpace = 'srgb';
    fbx.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          map: baseColorMap,
          aoMap,
          metalnessMap: metallicMap,
          normalMap,
          roughnessMap,
          metalness: 1,
          roughness: 1,
        });

        //색 밝기 조절
        child.material.color.setScalar(2);

        if (!child.geometry.attributes.uv2) {
          child.geometry.setAttribute('uv2', child.geometry.attributes.uv);
        }

        child.material.needsUpdate = true;
      }
    });
  }, [fbx, aoMap, baseColorMap, metallicMap, normalMap, roughnessMap]);

  useEffect(() => {
    const meshes: any[] = [];
    if (nodes.Head) meshes.push(nodes.Head);
    if (nodes.Teeth) meshes.push(nodes.Teeth);
    if (nodes.Face) meshes.push(nodes.Face);
    if (nodes.Avatar) meshes.push(nodes.Avatar);

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
          const key = 'blendShape5.' + element.categoryName;
          if (mesh.morphTargetDictionary && key in mesh.morphTargetDictionary) {
            const index = mesh.morphTargetDictionary[key];
            if (index >= 0) {
              mesh.morphTargetInfluences[index] = element.score;
            }
          }
        });
      });
    }

    if (rotation) {
      if (nodes.head) nodes.head.rotation.set(0, rotation.y, 0);
      if (nodes.Neck) nodes.Neck.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
      if (nodes.Spine2) nodes.Spine2.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);

      fbx.traverse((obj: any) => {
        if (obj.isBone) {
          if (obj.name.includes('Head')) obj.rotation.set(rotation.x, rotation.y, rotation.z);
          else if (obj.name.includes('Neck')) obj.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
          else if (obj.name.includes('Spine')) obj.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);
        }
      });
    }
  });

  return (
    <>
      <primitive object={fbx} position={[0, -2.5, -1]} scale={[0.3, 0.3, 0.3]} />
    </>
  );
}
