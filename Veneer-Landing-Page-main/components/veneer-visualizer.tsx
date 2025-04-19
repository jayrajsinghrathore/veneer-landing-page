"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Button } from "@/components/ui/button";

export default function VeneerVisualizer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStyle, setActiveStyle] = useState("natural");

  const veneerStyles = [
    { id: "natural", name: "Natural White", color: 0xf5f5f5 },
    { id: "bright", name: "Bright White", color: 0xffffff },
    { id: "hollywood", name: "Hollywood Smile", color: 0xf8f8ff },
    { id: "porcelain", name: "Porcelain", color: 0xf0f0f0 },
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
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
    controls.enableZoom = true;
    controls.autoRotate = false;

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

    // Create teeth model
    const teethGroup = new THREE.Group();
    scene.add(teethGroup);

    // Create jaw base
    const jawGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 32, Math.PI);
    const jawMaterial = new THREE.MeshPhongMaterial({
      color: 0xf0f0f0,
      shininess: 100,
    });
    const jaw = new THREE.Mesh(jawGeometry, jawMaterial);
    jaw.rotation.x = Math.PI;
    jaw.position.y = -0.2;
    teethGroup.add(jaw);

    // Create teeth
    const teethMaterial = new THREE.MeshPhongMaterial({
      color: 0xf0f0f0,
      shininess: 100,
    });

    // Create individual teeth along the jaw
    const teeth = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI + Math.PI / 24;
      const toothGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
      const tooth = new THREE.Mesh(toothGeometry, teethMaterial);

      tooth.position.x = 1.5 * Math.cos(angle);
      tooth.position.z = 1.5 * Math.sin(angle);
      tooth.position.y = 0;
      tooth.rotation.y = angle + Math.PI / 2;

      teethGroup.add(tooth);
      teeth.push(tooth);
    }

    // Create veneers
    const veneerMaterial = new THREE.MeshPhongMaterial({
      color:
        veneerStyles.find((style) => style.id === activeStyle)?.color ||
        0xf5f5f5,
      transparent: true,
      opacity: 0.9,
      shininess: 120,
    });

    const veneers = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 12) * Math.PI + Math.PI / 12;
      const veneerGeometry = new THREE.BoxGeometry(0.22, 0.42, 0.22);
      const veneer = new THREE.Mesh(veneerGeometry, veneerMaterial);

      veneer.position.x = 1.5 * Math.cos(angle);
      veneer.position.z = 1.5 * Math.sin(angle);
      veneer.position.y = 0;
      veneer.rotation.y = angle + Math.PI / 2;

      teethGroup.add(veneer);
      veneers.push(veneer);
    }

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

    // Update veneer color when style changes
    const updateVeneerColor = () => {
      const selectedStyle = veneerStyles.find(
        (style) => style.id === activeStyle
      );
      if (selectedStyle && veneerMaterial) {
        veneerMaterial.color.setHex(selectedStyle.color);
      }
    };

    // Set up a watcher for activeStyle changes
    const styleWatcher = setInterval(updateVeneerColor, 100);

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
      clearInterval(styleWatcher);
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center mb-4 space-x-2">
        {veneerStyles.map((style) => (
          <Button
            key={style.id}
            variant={activeStyle === style.id ? "default" : "outline"}
            className={`text-sm ${
              activeStyle === style.id ? "bg-primary text-white" : ""
            }`}
            onClick={() => setActiveStyle(style.id)}
          >
            {style.name}
          </Button>
        ))}
      </div>
      <div ref={mountRef} className="flex-1 rounded-lg overflow-hidden"></div>
    </div>
  );
}
