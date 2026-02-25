"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

const FloatingObjects = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const group = useRef<THREE.Group>(null);

    // Colors based on theme
    const materialColor = isDark ? "#667eea" : "#3B82F6";
    const wireframeColor = isDark ? "#764ba2" : "#8b5cf6";

    const objects = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 - 5,
            ] as [number, number, number],
            scale: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 2 + 1,
        }));
    }, []);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.05;
            group.current.rotation.x = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <group ref={group}>
            {objects.map((obj, i) => (
                <Float
                    key={i}
                    speed={obj.speed}
                    rotationIntensity={2}
                    floatIntensity={2}
                    position={obj.position}
                >
                    <Sphere args={[obj.scale, 16, 16]}>
                        <meshStandardMaterial
                            color={i % 2 === 0 ? materialColor : wireframeColor}
                            wireframe={i % 3 === 0}
                            transparent
                            opacity={0.6}
                            roughness={0.1}
                            metalness={0.8}
                        />
                    </Sphere>
                </Float>
            ))}
        </group>
    );
};

export default function Hero3DBackground() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <div className="absolute inset-0 z-0 bg-background overflow-hidden">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ambientLight intensity={isDark ? 0.3 : 0.8} />
                <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#667eea" />
                {isDark && (
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                )}
                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <FloatingObjects />
                </Float>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/80 pointer-events-none" />
        </div>
    );
}
