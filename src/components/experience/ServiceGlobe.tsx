"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
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
    <Sphere args={[1.7,48,32]}><meshStandardMaterial color="#071c38" metalness={.35} roughness={.42} transparent opacity={.95}/></Sphere>
    <Sphere args={[1.72,32,20]}><meshBasicMaterial color="#1e65bd" wireframe transparent opacity={.19}/></Sphere>
    {nodes.map(n=><group key={n.label} position={n.position as unknown as [number,number,number]}>
      <mesh><sphereGeometry args={[.07,12,12]}/><meshBasicMaterial color="#65d9ff"/></mesh>
      <Html center distanceFactor={9} style={{pointerEvents:"auto"}}><a href={n.href} className="globe-label">{n.label}</a></Html>
    </group>)}
  </group>;
}
export default function ServiceGlobe(){
  const [failed,setFailed]=useState(false);
  if(failed)return <div className="globe-fallback" role="img" aria-label="GVB technology capabilities">Software · Applied AI · Automation · Analytics · Consulting</div>;
  return <div className="globe-canvas" aria-label="Interactive rotating services globe">
    <Canvas onCreated={({gl})=>{gl.domElement.addEventListener("webglcontextlost",()=>setFailed(true),{once:true});}} dpr={[1,1.5]} camera={{position:[0,0,5.3],fov:43}} gl={{antialias:false,powerPreference:"low-power"}} frameloop="always">
      <ambientLight intensity={1.5}/><pointLight position={[4,4,5]} intensity={55} color="#68b6ff"/>
      <Suspense fallback={null}><World/></Suspense><OrbitControls enablePan={false} enableZoom={false} autoRotate={false} rotateSpeed={.45}/>
    </Canvas>
  </div>;
}