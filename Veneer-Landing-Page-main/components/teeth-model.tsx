"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import OrbitControls from 'orbit-controls-es6'
import { gsap } from "gsap";

export default function TeethModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 10, 100);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4fb0ff, 2, 20);
    pointLight.position.set(-5, 2, 2);
    scene.add(pointLight);

    // Create a simplified teeth model
    const createTeethModel = () => {
      // Create jaw base
      const jawGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 32, Math.PI);
      const jawMaterial = new THREE.MeshPhongMaterial({
        color: 0xf5f5f5,
        shininess: 100,
      });
      const jaw = new THREE.Mesh(jawGeometry, jawMaterial);
      jaw.rotation.x = Math.PI;
      jaw.position.y = -0.2;
      scene.add(jaw);

      // Create teeth
      const teethGroup = new THREE.Group();
      const toothMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 100,
      });

      // Create individual teeth along the jaw
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI + Math.PI / 24;
        const toothGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
        const tooth = new THREE.Mesh(toothGeometry, toothMaterial);

        tooth.position.x = 1.5 * Math.cos(angle);
        tooth.position.z = 1.5 * Math.sin(angle);
        tooth.position.y = 0;
        tooth.rotation.y = angle + Math.PI / 2;

        teethGroup.add(tooth);
      }

      scene.add(teethGroup);

      // Create a veneer overlay that can be animated
      const veneerGroup = new THREE.Group();
      const veneerMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.7,
        shininess: 120,
      });

      for (let i = 0; i < 6; i++) {
        const angle = (i / 12) * Math.PI + Math.PI / 12;
        const veneerGeometry = new THREE.BoxGeometry(0.22, 0.42, 0.22);
        const veneer = new THREE.Mesh(veneerGeometry, veneerMaterial);

        veneer.position.x = 1.5 * Math.cos(angle);
        veneer.position.z = 1.5 * Math.sin(angle);
        veneer.position.y = 0;
        veneer.rotation.y = angle + Math.PI / 2;

        veneerGroup.add(veneer);
      }

      scene.add(veneerGroup);

      // Animate veneers
      gsap.to(veneerMaterial, {
        opacity: 0.9,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });

      return { jaw, teethGroup, veneerGroup };
    };

    const teethModel = createTeethModel();

    // Animation for the model
    gsap.to(teethModel.veneerGroup.position, {
      y: 0.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full"></div>;
}
