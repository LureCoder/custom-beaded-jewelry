// lighting.tsx: 灯光设置 — 三点光源
export function DesignerLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
      />
      
      <pointLight
        position={[0, 3, 3]}
        intensity={0.5}
        distance={10}
      />
    </>
  );
}
