/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { Object3D, Euler } from 'three';

export default function Avatar({
  url,
  blendshapes,
  rotation,
}: {
  url: string;
  blendshapes: any[];
  rotation: Euler | null;
}) {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);
  // const fbx = useFBX(url);
  // const { nodes } = useGraph(fbx);
  const [headMeshes, setHeadMeshes] = useState<Object3D[]>([]);

  // NOTE dev
  useEffect(() => {
    console.log('nodes', nodes);
    // console.log(JSON.stringify(nodes.Wolf3D_Avatar, null, 2));
    console.log('blendshapes', blendshapes);
    console.log('rotation', rotation);
    // if (nodes.CC_Base_BoneRoot_01) nodes.CC_Base_BoneRoot_01.rotation.set(0, 0, 0);
  }, [nodes, blendshapes, rotation]);

  useEffect(() => {
    const meshes = [];
    if (nodes.Wolf3D_Head) meshes.push(nodes.Wolf3D_Head);
    if (nodes.Wolf3D_Teeth) meshes.push(nodes.Wolf3D_Teeth);
    if (nodes.Wolf3D_Beard) meshes.push(nodes.Wolf3D_Beard);
    if (nodes.Wolf3D_Avatar) meshes.push(nodes.Wolf3D_Avatar);
    if (nodes.Wolf3D_Head_Custom) meshes.push(nodes.Wolf3D_Head_Custom);
    // if (nodes.Object_65) meshes.push(nodes.Object_65);

    setHeadMeshes(meshes);
  }, [nodes, url]);

  // scene.traverse((obj: any) => {
  //   if (obj.isMesh) {
  //     obj.material.color = new Color(1.2, 1.2, 1.2);
  //   }
  // });

  // TODO 맥북에서 blendshapes, categoryName, score 확인하기
  useFrame(() => {
    if (blendshapes.length > 0) {
      blendshapes.forEach((element: any) => {
        headMeshes.forEach((mesh: any) => {
          // const index = mesh.morphTargetDictionary[element.index];
          const index = mesh.morphTargetDictionary[element.categoryName];
          if (index >= 0) {
            mesh.morphTargetInfluences[index] = element.score;
          }
        });
      });
    }

    if (rotation) {
      if (nodes.Head) nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      if (nodes.Neck) nodes.Neck.rotation.set(rotation.x / 5 + 0.3, rotation.y / 5, rotation.z / 5);
      if (nodes.Spine2) nodes.Spine2.rotation.set(rotation.x / 10, rotation.y / 10, rotation.z / 10);
    }
  });

  // return <primitive object={scene} position={[0, -4.8, 3]} scale={[10, 10, 10]} />;
  // return <primitive object={scene} position={[0, -4.8, 3]} scale={[5, 5, 5]} />;
  return <primitive object={scene} position={[0, -4.8, 3]} scale={[3.6, 3.6, 3.6]} />;
  // return <primitive object={scene} position={[0, -4.0, 3]} scale={[2.8, 2.8, 2.8]} />;
  // return <primitive object={scene} position={[0, -4.0, 3]} scale={[2.4, 2.4, 2.4]} />;
  // return <primitive object={scene} position={[0, -4.0, 3]} scale={[0.03, 0.03, 0.03]} />;
  // return <primitive object={scene} position={[0, -4.8, 3]} scale={[4, 4, 4]} />;
  // return <primitive object={fbx} position={[0, -4.8, 3]} scale={[0.02, 0.02, 0.02]} />;
}
