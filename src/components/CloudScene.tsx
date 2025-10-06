// src/components/CloudsScene.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CloudsScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // === Scene setup ===
    const scene = new THREE.Scene();
    scene.background = null; // Transparent

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current?.appendChild(renderer.domElement);

    // === Cloud texture ===
    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load(
      'https://cdn.pixabay.com/photo/2022/03/20/17/50/clouds-7081496_960_720.png'
    );

    const cloudMaterial = new THREE.SpriteMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.85,
      color: new THREE.Color('#FFAAE5'), // 💗 tvoja boja
    });

    // === Kreiraj oblake pri dnu ===
    function createCloud(scaleSize: number, spreadX: number, spreadZ: number) {
      const cloud = new THREE.Sprite(cloudMaterial.clone());
      cloud.scale.set(scaleSize, scaleSize * 0.6, 1);
      cloud.position.set(
        Math.random() * spreadX - spreadX / 2,
        Math.random() * 2 - 3, // pri dnu
        Math.random() * spreadZ - spreadZ / 2
      );
      return cloud;
    }

    const clouds: THREE.Sprite[] = [];
    for (let i = 0; i < 25; i++) {
      const cloud = createCloud(4, 25, 15);
      scene.add(cloud);
      clouds.push(cloud);
    }

    // === Animacija ===
    const animate = () => {
      requestAnimationFrame(animate);
      clouds.forEach((cloud, i) => {
        cloud.position.x += 0.02 * Math.sin(i + Date.now() * 0.0003);
        cloud.position.y += 0.01 * Math.cos(i + Date.now() * 0.0005);
        if (cloud.position.x > 15) cloud.position.x = -15;
      });
      renderer.render(scene, camera);
    };
    animate();

    // === Resize ===
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default CloudsScene;
