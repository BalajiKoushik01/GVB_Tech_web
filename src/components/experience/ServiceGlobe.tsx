"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Stars, Float } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
const nodes = [
  {label:"Software", position:[-1.35,.65,1.05],href:"/services"},
  {label:"Applied AI",position:[1.3,.9,.85],href:"/services"},
  {label:"Automation",position:[1.55,-.7,.7],href:"/services"},
  {label:"Analytics",position:[-.9,-1.3,.9],href:"/services"},
  {label:"Consulting",position:[0,1.65,-.45],href:"/services"}
] as const;
function World(){
  const group=useRef<THREE.Group>(null);
  useFrame((_,delta)=>{if(group.current)group.current.rotation.y+=Math.min(delta,.05)*.085;});
  return <group ref={group}>
    <Sphere args={[1.7,64,48]}><meshPhysicalMaterial color="#092e53" metalness={.5} roughness={.17} transmission={.28} thickness={1.5} clearcoat={1} clearcoatRoughness={.08}/></Sphere>
    <Sphere args={[1.83,48,32]}><meshBasicMaterial color="#49bfff" side={THREE.BackSide} transparent opacity={.045}/></Sphere>
    <Sphere args={[1.72,32,20]}><meshBasicMaterial color="#1e65bd" wireframe transparent opacity={.19}/></Sphere>
    <Float speed={1.4} rotationIntensity={.12} floatIntensity={.15}><mesh><icosahedronGeometry args={[1.02,2]}/><meshBasicMaterial color="#37a8ff" wireframe transparent opacity={.14}/></mesh></Float>
    {nodes.map(n=><group key={n.label} position={n.position as unknown as [number,number,number]}>
      <mesh><sphereGeometry args={[.07,12,12]}/><meshBasicMaterial color="#65d9ff"/></mesh>
      <Html center distanceFactor={8} occlude style={{pointerEvents:"auto"}}><a href={n.href} className="globe-label">{n.label}</a></Html>
    </group>)}
  </group>;
}
export default function ServiceGlobe(){
  const [failed,setFailed]=useState(false);
  if(failed)return <div className="globe-fallback" role="img" aria-label="GVB technology capabilities">Software · Applied AI · Automation · Analytics · Consulting</div>;
  return <div className="globe-canvas" aria-label="Interactive rotating services globe">
    <Canvas onCreated={({gl})=>{gl.domElement.addEventListener("webglcontextlost",()=>setFailed(true),{once:true});}} dpr={[1,1.5]} camera={{position:[0,0,5.3],fov:43}} gl={{antialias:false,powerPreference:"low-power"}} frameloop="always">
      <ambientLight intensity={.75}/><Stars radius={60} depth={30} count={600} factor={2} saturation={0} fade speed={.35}/><directionalLight position={[-3,2,5]} intensity={3.5} color="#8ee9ff"/><pointLight position={[4,4,5]} intensity={28} color="#68b6ff"/>
      <Suspense fallback={null}><World/></Suspense><OrbitControls enablePan={false} enableZoom={false} autoRotate={true} autoRotateSpeed={.35} enableDamping={true} dampingFactor={.07} rotateSpeed={.45}/>
    </Canvas>
  </div>;
}