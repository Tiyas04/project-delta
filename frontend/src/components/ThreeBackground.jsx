import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js particle star-field background.
 * Matches the deep-space aesthetic in the reference designs.
 */
const ThreeBackground = ({ style = {} }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // ── Stars ──
    const starGeo = new THREE.BufferGeometry();
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color(0xa855f7),
      new THREE.Color(0x7c3aed),
      new THREE.Color(0xc084fc),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sizes[i] = Math.random() * 1.8 + 0.3;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Large Glow Orb (purple) ──
    const orbGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0x4c1d95,
      transparent: true,
      opacity: 0.08,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(4, 2, -6);
    scene.add(orb);

    // Small secondary orb
    const orb2Geo = new THREE.SphereGeometry(1.5, 32, 32);
    const orb2Mat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.06,
    });
    const orb2 = new THREE.Mesh(orb2Geo, orb2Mat);
    orb2.position.set(-5, -2, -4);
    scene.add(orb2);

    // ── Animate ──
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      stars.rotation.y = t * 0.012;
      stars.rotation.x = t * 0.006;
      orb.position.y = 2 + Math.sin(t * 0.4) * 0.4;
      orb2.position.y = -2 + Math.sin(t * 0.3 + 1) * 0.3;
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  );
};

export default ThreeBackground;
