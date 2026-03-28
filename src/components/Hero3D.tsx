import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

function FloatingParticles() {
  const points = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particleCount = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      // Particles react to mouse movement
      points.current.rotation.x = state.clock.elapsedTime * 0.05 + mousePosition.current.y * 0.2;
      points.current.rotation.y = state.clock.elapsedTime * 0.1 + mousePosition.current.x * 0.2;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        transparent
        color="#ff6b35"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </points>
  );
}

function TorusMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth mouse following
      const targetX = mousePosition.current.x * 2;
      const targetY = mousePosition.current.y * 1.5;
      
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + targetY * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + targetX * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5 + targetY * 0.5;
      meshRef.current.position.x = targetX * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[2, 0.5, 16, 100]} />
      <meshStandardMaterial 
        color="#ff6b35" 
        emissive="#ff6b35"
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function SphereMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const targetX = mousePosition.current.x * 1.5;
      const targetY = mousePosition.current.y * 1.5;
      
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 + targetY * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25 + targetX * 0.2;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + Math.abs(targetX) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.position.x = targetX * 0.3;
      meshRef.current.position.y = targetY * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 1, -2]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#ff6b35" 
        emissive="#ff6b35"
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export { FloatingParticles, TorusMesh, SphereMesh };

