import { useEffect, useRef } from "react";
import * as THREE from "three";

const createStarTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");
  const center = 32;

  const gradient = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    center
  );

  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.4)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
};

const ThreeBackground = ({ style = {} }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);

    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    const palette = [
      new THREE.Color(0xa855f7),
      new THREE.Color(0x7c3aed),
      new THREE.Color(0xc084fc),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xffffff),
      new THREE.Color(0xe879f9),
    ];

    const starTexture = createStarTexture();

    // ==========================================
    // BACKGROUND STARS
    // ==========================================

    const bgCount = 4000;

    const bgPositions = new Float32Array(bgCount * 3);
    const bgColors = new Float32Array(bgCount * 3);

    for (let i = 0; i < bgCount; i++) {
      bgPositions[i * 3] = (Math.random() - 0.5) * 80;
      bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const color =
        palette[Math.floor(Math.random() * palette.length)];

      bgColors[i * 3] = color.r;
      bgColors[i * 3 + 1] = color.g;
      bgColors[i * 3 + 2] = color.b;
    }

    const bgGeo = new THREE.BufferGeometry();

    bgGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(bgPositions, 3)
    );

    bgGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(bgColors, 3)
    );

    const bgMat = new THREE.PointsMaterial({
      map: starTexture,
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const bgStars = new THREE.Points(bgGeo, bgMat);
    scene.add(bgStars);

    // ==========================================
    // TWINKLING STARS
    // ==========================================

    const blinkCount = 300;

    const blinkPositions = new Float32Array(blinkCount * 3);
    const blinkColors = new Float32Array(blinkCount * 3);

    const blinkPhase = new Float32Array(blinkCount);
    const blinkSpeed = new Float32Array(blinkCount);

    for (let i = 0; i < blinkCount; i++) {
      blinkPositions[i * 3] = (Math.random() - 0.5) * 70;
      blinkPositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      blinkPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      blinkPhase[i] = Math.random() * Math.PI * 2;
      blinkSpeed[i] = 0.4 + Math.random() * 1.5;

      const color =
        palette[Math.floor(Math.random() * palette.length)];

      blinkColors[i * 3] = color.r;
      blinkColors[i * 3 + 1] = color.g;
      blinkColors[i * 3 + 2] = color.b;
    }

    const blinkGeo = new THREE.BufferGeometry();

    blinkGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(blinkPositions, 3)
    );

    blinkGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(blinkColors, 3)
    );

    const blinkMat = new THREE.PointsMaterial({
      map: starTexture,
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const blinkStars = new THREE.Points(
      blinkGeo,
      blinkMat
    );

    scene.add(blinkStars);

    // ==========================================
    // HERO STARS
    // ==========================================

    const heroCount = 100;

    const heroPositions = new Float32Array(heroCount * 3);
    const heroColors = new Float32Array(heroCount * 3);

    const heroPhase = new Float32Array(heroCount);
    const heroSpeed = new Float32Array(heroCount);

    for (let i = 0; i < heroCount; i++) {
      heroPositions[i * 3] = (Math.random() - 0.5) * 65;
      heroPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      heroPositions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      heroPhase[i] = Math.random() * Math.PI * 2;
      heroSpeed[i] = 0.2 + Math.random() * 0.6;

      const color =
        palette[Math.floor(Math.random() * palette.length)];

      heroColors[i * 3] = color.r;
      heroColors[i * 3 + 1] = color.g;
      heroColors[i * 3 + 2] = color.b;
    }

    const heroGeo = new THREE.BufferGeometry();

    heroGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(heroPositions, 3)
    );

    heroGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(heroColors, 3)
    );

    const heroMat = new THREE.PointsMaterial({
      map: starTexture,
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const heroStars = new THREE.Points(
      heroGeo,
      heroMat
    );

    scene.add(heroStars);

    // ==========================================
    // ANIMATION
    // ==========================================

    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      bgStars.rotation.y = t * 0.008;
      bgStars.rotation.x = t * 0.003;

      blinkStars.rotation.y = t * 0.003;
      heroStars.rotation.y = t * 0.0015;

      const blinkAttr = blinkGeo.attributes.color;

      for (let i = 0; i < blinkCount; i++) {
        const pulse =
          0.5 +
          0.5 *
          Math.sin(
            blinkPhase[i] +
            t * blinkSpeed[i]
          );

        const sparkle = Math.pow(
          Math.max(
            0,
            Math.sin(
              blinkPhase[i] * 2 +
              t * blinkSpeed[i] * 4
            )
          ),
          8
        );

        const brightness =
          0.4 +
          pulse * 0.3 +
          sparkle * 0.8;

        blinkAttr.setXYZ(
          i,
          blinkColors[i * 3] * brightness,
          blinkColors[i * 3 + 1] * brightness,
          blinkColors[i * 3 + 2] * brightness
        );
      }

      blinkAttr.needsUpdate = true;

      const heroAttr = heroGeo.attributes.color;

      for (let i = 0; i < heroCount; i++) {
        const brightness =
          0.6 +
          Math.abs(
            Math.sin(
              heroPhase[i] +
              t * heroSpeed[i]
            )
          );

        heroAttr.setXYZ(
          i,
          heroColors[i * 3] * brightness,
          heroColors[i * 3 + 1] * brightness,
          heroColors[i * 3 + 2] * brightness
        );
      }

      heroAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect =
        mount.clientWidth / mount.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        mount.clientWidth,
        mount.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener(
        "resize",
        handleResize
      );

      bgGeo.dispose();
      blinkGeo.dispose();
      heroGeo.dispose();

      bgMat.dispose();
      blinkMat.dispose();
      heroMat.dispose();

      starTexture.dispose();

      renderer.dispose();

      if (
        mount &&
        renderer.domElement &&
        mount.contains(renderer.domElement)
      ) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
};

export default ThreeBackground;