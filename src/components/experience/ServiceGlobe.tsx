"use client";

import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import * as THREE from "three";

const capabilities = [
  { id:"software", short:"Software", title:"Software built around your operations", description:"Custom portals, internal tools and connected applications designed for the way your team works.", outcome:"From manual workarounds to dependable systems.", color:"#75dcff", position:[-.94,.92,1.12] },
  { id:"ai", short:"Applied AI", title:"AI with a practical purpose", description:"Document intelligence, computer vision and decision support, evaluated against real business outcomes.", outcome:"Start with a use case. Prove its value.", color:"#c5abff", position:[1.05,.85,.9] },
  { id:"automation", short:"Automation", title:"Fewer hand-offs. Clearer workflows.", description:"Join systems, reduce repeated entry and include safeguards when a process needs human review.", outcome:"Automate the work, not the confusion.", color:"#6af3ca", position:[1.3,-.7,.6] },
  { id:"analytics", short:"Analytics", title:"Make the next decision easier", description:"Consolidate operational data, agree on metrics and make important exceptions visible.", outcome:"Insight that leads to action.", color:"#ffcf88", position:[-.85,-.93,1.05] },
  { id:"consulting", short:"Consulting", title:"A clearer technical direction", description:"Discovery, feasibility and architecture guidance before time and budget are committed.", outcome:"Solve the right problem first.", color:"#f19fc8", position:[0,1.42,-.35] }
] as const;

function Orb({selected}:{selected:number}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state,delta)=>{
    if (!group.current) return;
    const target = selected * .21;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y,target + Math.sin(state.clock.elapsedTime * .2) * .12,1.1,delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x,.08 + Math.sin(state.clock.elapsedTime * .25) * .09,1.2,delta);
  });
  return <group ref={group}>
    <Sphere args={[1.55,64,48]}><meshPhysicalMaterial color="#103866" metalness={.5} roughness={.17} clearcoat={1} clearcoatRoughness={.08} transparent opacity={.91}/></Sphere>
    <Sphere args={[1.58,36,24]}><meshBasicMaterial color="#61caff" wireframe transparent opacity={.24}/></Sphere>
    <mesh rotation={[.6,0,.5]}><torusGeometry args={[1.85,.012,8,120]}/><meshBasicMaterial color="#61b6fa" transparent opacity={.42}/></mesh>
    <mesh rotation={[-.5,.4,-.58]}><torusGeometry args={[1.96,.007,8,120]}/><meshBasicMaterial color="#b5a4ff" transparent opacity={.25}/></mesh>
    {capabilities.map((item,i)=><group key={item.id} position={item.position as unknown as [number,number,number]}>
      <mesh scale={i===selected?1.9:1}><sphereGeometry args={[.07,16,16]}/><meshBasicMaterial color={item.color}/></mesh>
      <mesh scale={i===selected?1.2:.7}><ringGeometry args={[.1,.13,32]}/><meshBasicMaterial color={item.color} side={THREE.DoubleSide} transparent opacity={i===selected?.95:.38}/></mesh>
    </group>)}
  </group>;
}

export default function ServiceGlobe(){
  const [selected,setSelected]=useState(0);
  const [failed,setFailed]=useState(false);
  const current=capabilities[selected];
  return <div className="gvb-experience" aria-label="Explore GVB Tech's services">
    <div className="gvb-experience-visual" aria-hidden="true">
      {!failed && <Canvas camera={{position:[0,0,6.2],fov:41}} dpr={[1,1.5]} gl={{antialias:true,powerPreference:"default"}} onCreated={({gl})=>gl.domElement.addEventListener("webglcontextlost",()=>setFailed(true),{once:true})}>
        <ambientLight intensity={1.05}/>
        <pointLight position={[3,4,5]} intensity={40} color="#65cfff"/>
        <directionalLight position={[-4,-2,3]} intensity={2.1} color="#b7bcff"/>
        <Stars radius={55} depth={30} count={400} factor={2} saturation={0} fade speed={.2}/>
        <Suspense fallback={null}><Orb selected={selected}/></Suspense>
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={.45} enableDamping dampingFactor={.08}/>
      </Canvas>}
      {failed && <div className="gvb-experience-orb-fallback" />}
    </div>
    <div className="gvb-experience-copy" aria-live="polite">
      <div className="gvb-experience-overline"><span className="gvb-live-dot"/>EXPLORE OUR CAPABILITIES</div>
      <span className="gvb-experience-index">0{selected+1} / 05</span>
      <h2>{current.title}</h2>
      <p>{current.description}</p>
      <div className="gvb-experience-outcome">{current.outcome}</div>
      <Link href="/services" className="gvb-experience-cta">Explore this service <ArrowUpRight size={17}/></Link>
    </div>
    <div className="gvb-experience-chooser" role="group" aria-label="Choose a capability">
      {capabilities.map((item,index)=><button key={item.id} type="button" className={`gvb-experience-choice ${selected===index?"is-active":""}`} aria-pressed={selected===index} onClick={()=>setSelected(index)}><span className="gvb-choice-indicator" style={{backgroundColor:item.color}}/>{item.short}</button>)}
    </div>
    <button type="button" className="gvb-experience-reset" onClick={()=>setSelected(0)} aria-label="Reset to Software"><RotateCcw size={16}/></button>
  </div>;
}
