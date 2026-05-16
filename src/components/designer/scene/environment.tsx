// environment.tsx: 环境设置 — 背景和地面
import { ContactShadows } from '@react-three/drei';

export function DesignerEnvironment() {
  return (
    <>
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
      
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  );
}
