import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Typ dla komponentu
type HoodieViewerProps = {
  color: string; // Kolor bluzy w formacie HEX
};

const Hoodie: React.FC<HoodieViewerProps> = ({ color }) => {
  const { nodes, materials } = useGLTF("/hoodie-model.glb") as any;

  // Debugowanie struktury modelu
  console.log("Nodes (geometria):", nodes);
  console.log("Materials (materiały):", materials);

  // Sprawdzanie i przypisanie koloru dla każdego materiału
  useMemo(() => {
    if (materials) {
      Object.values(materials).forEach((material: any) => {
        if (material.isMeshStandardMaterial) {
          material.color.set(color); // Ustawienie koloru
        }
      });
    } else {
      console.error("Nie znaleziono materiałów w modelu.");
    }
  }, [color, materials]);

  // Renderowanie modelu
  return (
    <group scale={[4, 4, 4]} position={[0, -6, 0]}>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];
        if (node.isMesh) {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={node.material}
              position={node.position}
            />
          );
        }
        return null;
      })}
    </group>
  );
};

const HoodieViewer: React.FC<HoodieViewerProps> = ({ color }) => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent", // Usuń obramowanie i tło
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0}   />
      <Hoodie color={color} />
      
    </Canvas>
  );
};

export default HoodieViewer;