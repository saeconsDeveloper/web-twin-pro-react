import React, { Suspense } from "react";
import { OrbitControls, useGLTF, useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CONFIG } from "../../config";

const Model = ({ loader, url }) => {
  const loaderMap = {
    fbx: useFBX,
    gltf: useGLTF
  };
  const useModelLoader = loaderMap[loader];
  if (!useModelLoader) {
    throw new Error('Invalid loader specified');
  }
  const model = useModelLoader(url);
  const scene = model.scene || model;
  return <primitive object={scene} />;
};


const Model3dRenderer = ({type,pathUrl}) => (
  <>
  {console.log(type,pathUrl)}
    <Canvas pixelratio={[1, 2]}  camera={{ position: [50, 400, 0] ,fov:50}}>
      <ambientLight intensity={1} />
      <directionalLight position={[75, 150, 150]} intensity={0.55} />
      <Suspense fallback={null}>
        <Model loader={type} url={`${CONFIG.BASE_URI}${pathUrl}`} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  </>
);

export default Model3dRenderer;
