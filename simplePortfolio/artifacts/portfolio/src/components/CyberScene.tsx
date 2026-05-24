import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 160;
const CONNECTION_DISTANCE = 2.8;

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function CyberScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (!isWebGLAvailable()) return;

    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
    camera.position.set(0, 0, 12);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xff6600, 3, 25);
    pointLight.position.set(0, 0, 6);
    scene.add(pointLight);

    // Central wireframe icosahedron orb
    const orbGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // Inner soft glow sphere
    const glowGeo = new THREE.SphereGeometry(1.35, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Orbit rings
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.015, 6, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.012, 6, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff8844,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.z = Math.PI / 5;
    scene.add(ring2);

    // Particle nodes
    const nodePositions: THREE.Vector3[] = [];
    const posArr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      let x = 0, y = 0, z = 0, r = 0, attempts = 0;
      do {
        x = (Math.random() - 0.5) * 20;
        y = (Math.random() - 0.5) * 14;
        z = (Math.random() - 0.5) * 9;
        r = Math.sqrt(x * x + y * y + z * z);
        attempts++;
      } while (r < 3.5 && attempts < 200);
      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0xff8833,
      size: 0.09,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // Connection edges between nearby nodes
    const edgeArr: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECTION_DISTANCE) {
          edgeArr.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(edgeArr), 3)
    );
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // Subtle background dust particles
    const dustCount = 90;
    const dustArr = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustArr[i * 3] = (Math.random() - 0.5) * 22;
      dustArr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      dustArr[i * 3 + 2] = (Math.random() - 0.5) * 11;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustArr, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    let mouseX = 0, mouseY = 0, smoothX = 0, smoothY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener("mousemove", onMouseMove);

    let scrollProgress = 0;
    const onScroll = () => {
      scrollProgress = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    const startTime = performance.now();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      smoothX += (mouseX - smoothX) * 0.05;
      smoothY += (mouseY - smoothY) * 0.05;

      orb.rotation.x = t * 0.22;
      orb.rotation.y = t * 0.38;
      glow.rotation.y = t * 0.15;
      ring1.rotation.z = t * 0.28;
      ring2.rotation.y = t * 0.35;
      ring2.rotation.x = Math.PI / 3 + t * 0.18;

      nodes.rotation.y = t * 0.035;
      edges.rotation.y = t * 0.035;
      dust.rotation.y = t * 0.018;
      dust.rotation.x = t * 0.01;

      camera.position.x += (smoothX * 2.2 - camera.position.x) * 0.04;
      camera.position.y += (smoothY * 1.6 - camera.position.y) * 0.04;

      const targetZ = 12 + scrollProgress * 12;
      camera.position.z += (targetZ - camera.position.z) * 0.07;
      camera.lookAt(0, 0, 0);

      const fade = Math.max(0, 1 - scrollProgress * 2.2);
      nodeMat.opacity = fade * 0.9;
      edgeMat.opacity = fade * 0.1;
      orbMat.opacity = fade * 0.65;
      glowMat.opacity = fade * 0.06;
      ringMat1.opacity = fade * 0.35;
      ringMat2.opacity = fade * 0.25;
      dustMat.opacity = fade * 0.25;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
