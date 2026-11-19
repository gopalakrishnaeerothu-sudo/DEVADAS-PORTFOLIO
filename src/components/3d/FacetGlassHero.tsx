"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { ArrowLeft, Play, Sparkles, ChevronDown, Volume2, VolumeX } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface FacetGlassHeroProps {
  onExploreClick?: () => void;
  onOpenProjectModal?: (id: string) => void;
}

export default function FacetGlassHero({ onExploreClick, onOpenProjectModal }: FacetGlassHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isShattered, setIsShattered] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [activeTermIndex, setActiveTermIndex] = useState(0);

  // References for three.js state
  const stateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    pmremGenerator?: THREE.PMREMGenerator;
    animFrameId?: number;
    glassGroup?: THREE.Group;
    bgParticles?: THREE.Points;
    filmReels?: THREE.Group;
    shards: Array<{
      id: string;
      mesh: THREE.Mesh;
      textMesh: THREE.Mesh;
      initialPos: THREE.Vector3;
      targetPos: THREE.Vector3;
      currentPos: THREE.Vector3;
      velocity: THREE.Vector3;
      initialRot: THREE.Euler;
      targetRot: THREE.Euler;
      currentRot: THREE.Euler;
      rotVelocity: THREE.Euler;
      isHovered: boolean;
      shatterVel: THREE.Vector3;
      shatterRotAxis: THREE.Vector3;
      shatterRotSpeed: number;
      stagger: number;
    }>;
    backSliver?: {
      mesh: THREE.Mesh;
      initialPos: THREE.Vector3;
      wobbleTime: number;
      isHovered: boolean;
    };
    pointer: { x: number; y: number; worldX: number; worldY: number; isInside: boolean };
    uniforms: {
      uPointerPos: { value: THREE.Vector3 };
      uGlowIntensity: { value: number };
      uScale: { value: number };
    };
    glassMaterial?: THREE.MeshPhysicalMaterial;
    textTexture?: THREE.CanvasTexture;
    canvas2d?: HTMLCanvasElement;
    heroImage?: HTMLImageElement;
    lastTime: number;
    layoutScale: number;
    blockWidth: number;
    blockHeight: number;
    shatterProgress: number; // 0 to 1
    shattering: boolean;
    reassembling: boolean;
  }>({
    shards: [],
    pointer: { x: 0, y: 0, worldX: 0, worldY: 0, isInside: false },
    uniforms: {
      uPointerPos: { value: new THREE.Vector3(0, 0, 0) },
      uGlowIntensity: { value: 0 },
      uScale: { value: 1 }
    },
    lastTime: performance.now(),
    layoutScale: 1,
    blockWidth: 1200,
    blockHeight: 700,
    shatterProgress: 0,
    shattering: false,
    reassembling: false
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    // FOV 30°, placed so that 1 world unit = 1 CSS px at z = 0
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050507");

    const fov = 30;
    const fovRad = (fov * Math.PI) / 180;
    const cameraZ = (height / 2) / Math.tan(fovRad / 2);
    const camera = new THREE.PerspectiveCamera(fov, width / height, 10, cameraZ * 4);
    camera.position.set(0, 0, cameraZ);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. PMREM RoomEnvironment & Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;
    scene.environmentIntensity = 0.42;

    // Soft white-blue key light from top-left
    const keyLight = new THREE.DirectionalLight(0xd4e4ff, 1.8);
    keyLight.position.set(-width * 0.4, height * 0.5, 400);
    scene.add(keyLight);

    // Warm cinematic fill light from bottom-right
    const fillLight = new THREE.DirectionalLight(0xff7733, 1.2);
    fillLight.position.set(width * 0.4, -height * 0.4, 300);
    scene.add(fillLight);

    // Soft ambient light
    const ambientLight = new THREE.AmbientLight(0x181a24, 1.2);
    scene.add(ambientLight);

    // 4. Floating Cinematic Background Elements (Film Reels & Golden Sparks)
    const filmReelsGroup = new THREE.Group();
    scene.add(filmReelsGroup);

    // Camera Aperture / Lens Ring in 3D
    const ringGeo = new THREE.TorusGeometry(120, 4, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x22242c,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: false
    });
    const apertureRing = new THREE.Mesh(ringGeo, ringMat);
    apertureRing.position.set(width * 0.36, -height * 0.15, -120);
    apertureRing.rotation.set(0.4, -0.6, 0.2);
    filmReelsGroup.add(apertureRing);

    // Film Sprocket Ring
    const innerRingGeo = new THREE.TorusGeometry(80, 2, 8, 32);
    const innerRingMat = new THREE.MeshStandardMaterial({ color: 0xff6b35, roughness: 0.4, metalness: 0.5 });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.copy(apertureRing.position);
    innerRing.rotation.copy(apertureRing.rotation);
    filmReelsGroup.add(innerRing);

    // Subtle floating dust / amber embers
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * width * 1.4;
      particlePos[i + 1] = (Math.random() - 0.5) * height * 1.4;
      particlePos[i + 2] = (Math.random() - 0.5) * 400 - 100;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 3.5,
      color: 0xffa050,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const bgParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(bgParticles);

    // 5. Glass Shaders & Material Construction
    // Layout scale: S = blockWidth / 1730
    const marginSide = width * 0.055;
    const marginTop = height * 0.085;
    const blockWidth = Math.max(340, width - marginSide * 2);
    const blockHeight = Math.max(260, height - marginTop * 2);
    const S = blockWidth / 1730;

    stateRef.current.blockWidth = blockWidth;
    stateRef.current.blockHeight = blockHeight;
    stateRef.current.layoutScale = S;

    const uniforms = stateRef.current.uniforms;
    uniforms.uScale.value = S;

    // Glass Material with Custom Lavender Cursor Glow via onBeforeCompile
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#17171b"),
      roughness: 0.36,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      specularIntensity: 0.7,
      iridescence: 0.55,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [250, 650],
      metalness: 0.1,
      transmission: 0.05,
      transparent: true,
      opacity: 0.98
    });

    glassMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uPointerPos = uniforms.uPointerPos;
      shader.uniforms.uGlowIntensity = uniforms.uGlowIntensity;
      shader.uniforms.uScale = uniforms.uScale;

      shader.fragmentShader = `
        uniform vec3 uPointerPos;
        uniform float uGlowIntensity;
        uniform float uScale;
        ${shader.fragmentShader}
      `;

      // Inject cursor glow: vec3(.42,.37,.62) * .16 * exp(-1.6 * (d / 300S)^2)
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <dithering_fragment>`,
        `
        #include <dithering_fragment>
        float distToCursor = length(vWorldPosition - uPointerPos);
        float glowRadius = 320.0 * max(0.5, uScale);
        float glowFactor = exp(-1.6 * pow(distToCursor / glowRadius, 2.0)) * uGlowIntensity;
        vec3 lavenderGlow = vec3(0.42, 0.37, 0.62) * 0.28 * glowFactor;
        vec3 amberRim = vec3(1.0, 0.42, 0.18) * 0.12 * glowFactor;
        gl_FragColor.rgb += lavenderGlow + amberRim;
        `
      );
    };
    stateRef.current.glassMaterial = glassMaterial;

    // 6. Printed Content Canvas (Page Image Texture)
    const canvas2d = document.createElement("canvas");
    const dpr2d = 2.0;
    canvas2d.width = Math.round(blockWidth * dpr2d);
    canvas2d.height = Math.round(blockHeight * dpr2d);
    const ctx = canvas2d.getContext("2d")!;
    stateRef.current.canvas2d = canvas2d;

    const textTexture = new THREE.CanvasTexture(canvas2d);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.generateMipmaps = false;
    stateRef.current.textTexture = textTexture;

    // Load Devadas hero image for projection onto the hero shard!
    const heroImg = new Image();
    heroImg.crossOrigin = "anonymous";
    heroImg.src = "/images/profile/devadas-portrait.jpg";
    heroImg.onload = () => {
      stateRef.current.heroImage = heroImg;
      drawPrintedCanvas();
    };

    function drawPrintedCanvas() {
      if (!ctx) return;
      const cw = canvas2d.width;
      const ch = canvas2d.height;
      const s = S * dpr2d;

      ctx.clearRect(0, 0, cw, ch);

      // Hero shard photo area (Cell A: Left side of panel)
      // Print Devadas photograph on the glass hero shard with elegant dark gradients!
      if (stateRef.current.heroImage) {
        ctx.save();
        const img = stateRef.current.heroImage;
        const photoWidth = cw * 0.42;
        const photoHeight = ch * 0.76;
        const photoX = cw * 0.03;
        const photoY = ch * 0.14;

        // Rounded clipping area for photograph
        ctx.beginPath();
        const pradius = 24 * s;
        ctx.moveTo(photoX + pradius, photoY);
        ctx.arcTo(photoX + photoWidth, photoY, photoX + photoWidth, photoY + photoHeight, pradius);
        ctx.arcTo(photoX + photoWidth, photoY + photoHeight, photoX, photoY + photoHeight, pradius);
        ctx.arcTo(photoX, photoY + photoHeight, photoX, photoY, pradius);
        ctx.arcTo(photoX, photoY, photoX + photoWidth, photoY, pradius);
        ctx.closePath();
        ctx.clip();

        // Draw image
        ctx.drawImage(img, photoX, photoY, photoWidth, photoHeight);

        // Dark cinematic vignette overlay
        const grad = ctx.createRadialGradient(
          photoX + photoWidth * 0.5,
          photoY + photoHeight * 0.5,
          photoWidth * 0.2,
          photoX + photoWidth * 0.5,
          photoY + photoHeight * 0.5,
          photoWidth * 0.7
        );
        grad.addColorStop(0, "rgba(8, 9, 13, 0.0)");
        grad.addColorStop(0.7, "rgba(8, 9, 13, 0.4)");
        grad.addColorStop(1, "rgba(8, 9, 13, 0.95)");
        ctx.fillStyle = grad;
        ctx.fillRect(photoX, photoY, photoWidth, photoHeight);

        // Film badge overlay on image
        ctx.fillStyle = "rgba(255, 107, 53, 0.85)";
        ctx.font = `600 ${Math.max(12, 11 * s)}px Inter, sans-serif`;
        ctx.fillText("MEESALA DEVADAS · LEAD EDITOR", photoX + 24 * s, photoY + photoHeight - 32 * s);
        ctx.restore();
      }

      // Panel Content Printed across the shards
      const textLeft = cw * 0.42;

      // 1. Eyebrow: "REAL-TIME MATERIAL STUDIO" / "REAL-TIME CINEMATIC STORYTELLER"
      ctx.fillStyle = "rgba(255, 255, 255, 0.48)";
      ctx.font = `600 ${Math.max(12, 12 * s)}px Inter, sans-serif`;
      ctx.letterSpacing = "0.22em";
      ctx.fillText("MEESALA DEVADAS · CINEMATIC REALM", textLeft, ch * 0.22);
      ctx.letterSpacing = "0px";

      // 2. Headline: "Designed in glass." / "Every frame has a story."
      const headlineSize = Math.max(26, Math.min(cw * 0.058, ch * 0.14));
      ctx.font = `600 ${headlineSize}px Sora, Inter, sans-serif`;
      const headlineGrad = ctx.createLinearGradient(0, ch * 0.26, 0, ch * 0.48);
      headlineGrad.addColorStop(0, "#FFFFFF");
      headlineGrad.addColorStop(0.5, "#E2E2E6");
      headlineGrad.addColorStop(1, "#A0A0A8");
      ctx.fillStyle = headlineGrad;

      ctx.fillText("Designed in glass.", textLeft, ch * 0.33);
      ctx.fillText("Every frame a story.", textLeft, ch * 0.33 + headlineSize * 1.05);

      // 3. Subtitle: "Author dispersion, transmission, and refraction..."
      ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
      const subSize = Math.max(14, 15 * s);
      ctx.font = `400 ${subSize}px Inter, sans-serif`;
      ctx.fillText(
        "Visual Storyteller & Lead Video Editor. Crafting cinematic rhythm,",
        textLeft,
        ch * 0.52
      );
      ctx.fillText(
        "DaVinci color science, and evocative narratives in the browser.",
        textLeft,
        ch * 0.52 + subSize * 1.45
      );

      // 4. "Open Studio / Explore Work" Light Pill (116 x 40 * S, radius 6)
      const pillW = Math.max(120, 150 * s);
      const pillH = Math.max(38, 44 * s);
      const pillX = textLeft;
      const pillY = ch * 0.67;
      const pradius = 8 * s;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pillX + pradius, pillY);
      ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, pradius);
      ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, pradius);
      ctx.arcTo(pillX, pillY + pillH, pillX, pillY, pradius);
      ctx.arcTo(pillX, pillY, pillX + pillW, pillY, pradius);
      ctx.closePath();
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      ctx.fillStyle = "#08090D";
      ctx.font = `600 ${Math.max(13, 14 * s)}px Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Explore Work", pillX + pillW / 2, pillY + pillH / 2);
      ctx.restore();

      // 5. "Read paper →" / "Shatter Page →"
      const linkX = pillX + pillW + 28 * s;
      const linkY = pillY + pillH / 2;
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = `500 ${Math.max(13, 14 * s)}px Inter, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillText("Shatter universe  →", linkX, linkY);
      ctx.restore();

      // 6. Bottom tags: "© DEVADAS LAB" & "KHR_materials_dispersion"
      ctx.fillStyle = "rgba(255, 255, 255, 0.38)";
      ctx.font = `400 ${Math.max(10, 11 * s)}px Inter, sans-serif`;
      ctx.fillText("© MEESALA DEVADAS · HYDERABAD", cw * 0.05, ch * 0.94);
      ctx.textAlign = "right";
      ctx.fillText("PRORES_4K_DAVINCI_CINEMA", cw * 0.95, ch * 0.94);
      ctx.textAlign = "left";

      textTexture.needsUpdate = true;
    }

    drawPrintedCanvas();

    // 7. Glass Geometry Builder & Cut Pattern
    // Block partitioned into Nav Slab (10.8% height) + 14px Gap + Shard Panel (rest)
    const navHeight = blockHeight * 0.108;
    const gap = 14 * S;
    const panelHeight = blockHeight - navHeight - gap;
    const cornerRadius = 20 * S;
    const depth = 13 * S;
    const bevel = 2.6 * S;

    const glassGroup = new THREE.Group();
    scene.add(glassGroup);
    stateRef.current.glassGroup = glassGroup;

    // Helper to create rounded polygon shape
    function createRoundedShape(points: THREE.Vector2[], radius: number): THREE.Shape {
      const shape = new THREE.Shape();
      const len = points.length;
      if (len < 3) return shape;

      for (let i = 0; i < len; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % len];
        const p0 = points[(i - 1 + len) % len];

        const v1 = new THREE.Vector2().subVectors(p0, p1).normalize();
        const v2 = new THREE.Vector2().subVectors(p2, p1).normalize();

        const p1_start = new THREE.Vector2().addVectors(p1, v1.clone().multiplyScalar(radius));
        const p1_end = new THREE.Vector2().addVectors(p1, v2.clone().multiplyScalar(radius));

        if (i === 0) {
          shape.moveTo(p1_start.x, p1_start.y);
        } else {
          shape.lineTo(p1_start.x, p1_start.y);
        }
        shape.quadraticCurveTo(p1.x, p1.y, p1_end.x, p1_end.y);
      }
      shape.closePath();
      return shape;
    }

    // Extrude Options
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel
    };

    // Construct Nav Slab
    const navHalfW = blockWidth / 2;
    const navHalfH = navHeight / 2;
    const navPts = [
      new THREE.Vector2(-navHalfW, -navHalfH),
      new THREE.Vector2(navHalfW, -navHalfH),
      new THREE.Vector2(navHalfW, navHalfH),
      new THREE.Vector2(-navHalfW, navHalfH)
    ];
    const navShape = createRoundedShape(navPts, cornerRadius * 0.8);
    const navGeo = new THREE.ExtrudeGeometry(navShape, extrudeSettings);
    const navMesh = new THREE.Mesh(navGeo, glassMaterial);
    const navPosY = blockHeight / 2 - navHalfH;
    navMesh.position.set(0, navPosY, 0);

    // Text plane for nav
    const navTextGeo = new THREE.PlaneGeometry(blockWidth, navHeight);
    const navTextMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.95,
      map: textTexture
    });
    const navTextMesh = new THREE.Mesh(navTextGeo, navTextMat);
    navTextMesh.position.set(0, 0, depth + bevel + 0.5);

    glassGroup.add(navMesh);

    // Track shard in state
    stateRef.current.shards.push({
      id: "nav",
      mesh: navMesh,
      textMesh: navTextMesh,
      initialPos: new THREE.Vector3(0, navPosY, 0),
      targetPos: new THREE.Vector3(0, navPosY, 0),
      currentPos: new THREE.Vector3(0, navPosY, 0),
      velocity: new THREE.Vector3(),
      initialRot: new THREE.Euler(0, 0, 0),
      targetRot: new THREE.Euler(0, 0, 0),
      currentRot: new THREE.Euler(0, 0, 0),
      rotVelocity: new THREE.Euler(),
      isHovered: false,
      shatterVel: new THREE.Vector3(0, 300 * S, 600 * S),
      shatterRotAxis: new THREE.Vector3(0.5, 0.8, 0.2).normalize(),
      shatterRotSpeed: 2.5,
      stagger: 0.0
    });

    // 8. The Live Cut Pattern: Five Shards (A, B, C, D, E)
    // Coords relative to panel center:
    const panelHalfW = blockWidth / 2;
    const panelHalfH = panelHeight / 2;
    const panelCenterY = -blockHeight / 2 + panelHalfH;

    // Normalised points:
    // Top edges: .22, .515, .84; Bottom edges: .34, .865
    // Inner junctions: J0 (.385, .72), J1 (.48, .62), J2 (.716, .49)
    function normToPanel(nx: number, ny: number) {
      return new THREE.Vector2(
        (nx - 0.5) * blockWidth,
        (0.5 - ny) * panelHeight
      );
    }

    const TL = normToPanel(0, 0);
    const TR = normToPanel(1, 0);
    const BL = normToPanel(0, 1);
    const BR = normToPanel(1, 1);

    const tAB = normToPanel(0.22, 0);
    const tBC = normToPanel(0.515, 0);
    const tCE = normToPanel(0.84, 0);

    const bAD = normToPanel(0.34, 1);
    const bDE = normToPanel(0.865, 1);

    const J0 = normToPanel(0.385, 0.72);
    const J1 = normToPanel(0.48, 0.62);
    const J2 = normToPanel(0.716, 0.49);

    const cellDefs = [
      { id: "A", pts: [TL, tAB, J0, bAD, BL], stagger: 0.05, velX: -350, velY: -200, velZ: 650 },
      { id: "B", pts: [tAB, tBC, J1, J0], stagger: 0.09, velX: -100, velY: 380, velZ: 550 },
      { id: "C", pts: [tBC, tCE, J2, J1], stagger: 0.12, velX: 200, velY: 320, velZ: 700 },
      { id: "D", pts: [J0, J1, J2, bDE, bAD], stagger: 0.08, velX: -80, velY: -450, velZ: 750 },
      { id: "E", pts: [tCE, TR, BR, bDE, J2], stagger: 0.15, velX: 420, velY: -150, velZ: 800 }
    ];

    cellDefs.forEach((cell) => {
      // Inset points slightly for gap
      const shape = createRoundedShape(cell.pts, cornerRadius);
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      // Generate UVs mapped to entire panel for seamless text and image refraction
      const posAttr = geo.attributes.position;
      const uvs = new Float32Array(posAttr.count * 2);
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        // Map from panel space [-panelHalfW, panelHalfW] -> [0, 1]
        const u = (x + panelHalfW) / blockWidth;
        const v = (y + panelHalfH) / blockHeight;
        uvs[i * 2] = Math.max(0, Math.min(1, u));
        uvs[i * 2 + 1] = Math.max(0, Math.min(1, v));
      }
      geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

      const mesh = new THREE.Mesh(geo, glassMaterial);
      mesh.position.set(0, panelCenterY, 0);

      // Surface text mesh carrying the printed texture
      const textShapeGeo = new THREE.ShapeGeometry(shape);
      const textGeoPos = textShapeGeo.attributes.position;
      const textUVs = new Float32Array(textGeoPos.count * 2);
      for (let i = 0; i < textGeoPos.count; i++) {
        const x = textGeoPos.getX(i);
        const y = textGeoPos.getY(i);
        const u = (x + panelHalfW) / blockWidth;
        const v = (y + panelHalfH) / blockHeight;
        textUVs[i * 2] = Math.max(0, Math.min(1, u));
        textUVs[i * 2 + 1] = Math.max(0, Math.min(1, v));
      }
      textShapeGeo.setAttribute("uv", new THREE.BufferAttribute(textUVs, 2));

      const textMat = new THREE.MeshBasicMaterial({
        map: textTexture,
        transparent: true,
        opacity: 0.94
      });
      const textMesh = new THREE.Mesh(textShapeGeo, textMat);
      textMesh.position.set(0, 0, depth + bevel + 0.3);
      mesh.add(textMesh);

      glassGroup.add(mesh);

      // Random tumble axis
      const rotAxis = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();

      stateRef.current.shards.push({
        id: cell.id,
        mesh,
        textMesh,
        initialPos: new THREE.Vector3(0, panelCenterY, 0),
        targetPos: new THREE.Vector3(0, panelCenterY, 0),
        currentPos: new THREE.Vector3(0, panelCenterY, 0),
        velocity: new THREE.Vector3(),
        initialRot: new THREE.Euler(0, 0, 0),
        targetRot: new THREE.Euler(0, 0, 0),
        currentRot: new THREE.Euler(0, 0, 0),
        rotVelocity: new THREE.Euler(),
        isHovered: false,
        shatterVel: new THREE.Vector3(cell.velX * S, cell.velY * S, cell.velZ * S),
        shatterRotAxis: rotAxis,
        shatterRotSpeed: 2.0 + Math.random() * 1.6,
        stagger: cell.stagger
      });
    });

    // 9. "← Back" Glass Sliver (Revealed in Shattered View)
    // Outline: viewport fractions (.147,.243) (.252,.169) (.287,.277) (.151,.258), 11*k extrusion
    const k = width / 1918;
    const sliverPts = [
      new THREE.Vector2((0.147 - 0.5) * width, (0.5 - 0.243) * height),
      new THREE.Vector2((0.252 - 0.5) * width, (0.5 - 0.169) * height),
      new THREE.Vector2((0.287 - 0.5) * width, (0.5 - 0.277) * height),
      new THREE.Vector2((0.151 - 0.5) * width, (0.5 - 0.258) * height)
    ];
    const sliverShape = createRoundedShape(sliverPts, 12 * k);
    const sliverGeo = new THREE.ExtrudeGeometry(sliverShape, {
      depth: 11 * k,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 2 * k,
      bevelThickness: 2 * k
    });
    const sliverMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#17171b"),
      roughness: 0.36,
      clearcoat: 0.7,
      iridescence: 0.35,
      iridescenceIOR: 1.3,
      transmission: 0.08,
      transparent: true,
      opacity: 0.95
    });
    const sliverMesh = new THREE.Mesh(sliverGeo, sliverMat);
    sliverMesh.position.set(0, 0, 80);
    sliverMesh.rotation.set(0.08, -0.16, 0);
    sliverMesh.scale.set(0.001, 0.001, 0.001); // starts invisible
    scene.add(sliverMesh);

    stateRef.current.backSliver = {
      mesh: sliverMesh,
      initialPos: new THREE.Vector3(0, 0, 80),
      wobbleTime: 0,
      isHovered: false
    };

    // 10. Pointer Movement & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / width) * 2 - 1;
      const normY = -(clientY / height) * 2 + 1;

      mouseNorm.set(normX, normY);

      // World point at z = 0
      const worldX = (normX * width) / 2;
      const worldY = (normY * height) / 2;

      stateRef.current.pointer.x = normX;
      stateRef.current.pointer.y = normY;
      stateRef.current.pointer.worldX = worldX;
      stateRef.current.pointer.worldY = worldY;
      stateRef.current.pointer.isInside = true;

      uniforms.uPointerPos.value.set(worldX, worldY, 15);
      uniforms.uGlowIntensity.value = 1.0;
    };

    const onPointerLeave = () => {
      stateRef.current.pointer.isInside = false;
      uniforms.uGlowIntensity.value = 0.0;
      mouseNorm.set(-999, -999);
    };

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseleave", onPointerLeave);

    // Click handler for Three.js 3D objects (e.g. Back sliver)
    const onCanvasClick = (e: MouseEvent) => {
      if (stateRef.current.shattering || stateRef.current.reassembling) return;
      if (stateRef.current.shatterProgress > 0.8 && stateRef.current.backSliver?.isHovered) {
        handleReassemble();
      }
    };
    container.addEventListener("click", onCanvasClick);

    // 11. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Slow drift & particle movement
      if (bgParticles) {
        bgParticles.rotation.y = elapsed * 0.03;
        bgParticles.rotation.x = Math.sin(elapsed * 0.05) * 0.05;
      }
      if (apertureRing) {
        apertureRing.rotation.z = elapsed * 0.1;
      }

      // Pointer Raycast for Hover
      raycaster.setFromCamera(mouseNorm, camera);
      const meshesToTest = stateRef.current.shards.map((s) => s.mesh);
      if (stateRef.current.backSliver?.mesh.visible) {
        meshesToTest.push(stateRef.current.backSliver.mesh);
      }
      const intersects = raycaster.intersectObjects(meshesToTest, false);

      const hoveredMesh = intersects.length > 0 ? intersects[0].object : null;

      // Handle Back Sliver Hover & Wobble
      if (stateRef.current.backSliver) {
        const sliver = stateRef.current.backSliver;
        sliver.isHovered = hoveredMesh === sliver.mesh;
        sliver.wobbleTime += delta;
        const wobble = Math.sin(sliver.wobbleTime * 2.0) * 0.035;

        if (stateRef.current.shatterProgress > 0.5) {
          sliver.mesh.visible = true;
          // Scale in smoothly
          const targetScale = 1.0;
          sliver.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
          sliver.mesh.rotation.y = -0.16 + wobble + (sliver.isHovered ? 0.14 : 0);
          sliver.mesh.rotation.x = 0.08 + (sliver.isHovered ? 0.06 : 0);
        } else {
          sliver.mesh.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), delta * 8);
          if (sliver.mesh.scale.x < 0.01) sliver.mesh.visible = false;
        }
      }

      // Global Tilt of Glass Group
      // rotateY = x * 7° - 1.2°, rotateX = -y * 5.5° + 0.8°
      const p = stateRef.current.pointer;
      const targetTiltY = p.isInside ? (p.x * 7 - 1.2) * (Math.PI / 180) : -1.2 * (Math.PI / 180);
      const targetTiltX = p.isInside ? (-p.y * 5.5 + 0.8) * (Math.PI / 180) : 0.8 * (Math.PI / 180);

      // Smooth with 0.3s exponential
      glassGroup.rotation.y += (targetTiltY - glassGroup.rotation.y) * Math.min(1, delta * 3.5);
      glassGroup.rotation.x += (targetTiltX - glassGroup.rotation.x) * Math.min(1, delta * 3.5);

      // Handle Shatter / Reassemble Animation Progress
      if (stateRef.current.shattering) {
        stateRef.current.shatterProgress = Math.min(1, stateRef.current.shatterProgress + delta / 0.72);
        if (stateRef.current.shatterProgress >= 1) {
          stateRef.current.shattering = false;
        }
      } else if (stateRef.current.reassembling) {
        stateRef.current.shatterProgress = Math.max(0, stateRef.current.shatterProgress - delta / 0.72);
        if (stateRef.current.shatterProgress <= 0) {
          stateRef.current.reassembling = false;
        }
      }

      const sp = stateRef.current.shatterProgress;

      // Update Each Shard
      stateRef.current.shards.forEach((shard) => {
        shard.isHovered = hoveredMesh === shard.mesh && sp < 0.05;

        // Glass iridescence & envMap boost on hover
        if (shard.isHovered) {
          glassMaterial.iridescence = THREE.MathUtils.lerp(glassMaterial.iridescence, 1.0, delta * 8);
          scene.environmentIntensity = THREE.MathUtils.lerp(scene.environmentIntensity, 1.9, delta * 6);
        } else if (!intersects.some((i) => i.object === shard.mesh)) {
          glassMaterial.iridescence = THREE.MathUtils.lerp(glassMaterial.iridescence, 0.55, delta * 2);
          scene.environmentIntensity = THREE.MathUtils.lerp(scene.environmentIntensity, 0.42, delta * 2);
        }

        if (sp > 0) {
          // SHATTERED STATE: fly outward, downward + 420-800*S toward camera, gravity + tumble
          // Ease-in cubic fly-off:
          const staggeredP = Math.max(0, Math.min(1, (sp - shard.stagger) / (1 - shard.stagger)));
          const easeIn = staggeredP * staggeredP * staggeredP;

          const flightX = shard.initialPos.x + shard.shatterVel.x * easeIn * 2.2;
          const flightY = shard.initialPos.y + shard.shatterVel.y * easeIn * 1.8 - 400 * S * easeIn * easeIn; // gravity
          const flightZ = shard.initialPos.z + shard.shatterVel.z * easeIn * 1.5;

          shard.mesh.position.set(flightX, flightY, flightZ);

          // Tumble rotation
          const rotAngle = shard.shatterRotSpeed * easeIn * Math.PI;
          shard.mesh.quaternion.setFromAxisAngle(shard.shatterRotAxis, rotAngle);
        } else {
          // NORMAL / HOVER STATE:
          // Spring parameters: k = 170, c = 19
          const springK = 170;
          const dampingC = 19;

          // Lift target: 50*S toward camera (nav 32*S)
          const targetLiftZ = shard.isHovered ? (shard.id === "nav" ? 32 * S : 50 * S) : 0;
          const targetTipX = shard.isHovered ? (p.y > 0 ? -0.15 : 0.15) : 0;
          const targetTipY = shard.isHovered ? (p.x > 0 ? 0.15 : -0.15) : 0;

          // Spring physics integration
          const forceZ = (targetLiftZ - shard.currentPos.z) * springK - shard.velocity.z * dampingC;
          shard.velocity.z += forceZ * delta;
          shard.currentPos.z += shard.velocity.z * delta;

          const forceRotX = (targetTipX - shard.currentRot.x) * springK - shard.rotVelocity.x * dampingC;
          shard.rotVelocity.x += forceRotX * delta;
          shard.currentRot.x += shard.rotVelocity.x * delta;

          const forceRotY = (targetTipY - shard.currentRot.y) * springK - shard.rotVelocity.y * dampingC;
          shard.rotVelocity.y += forceRotY * delta;
          shard.currentRot.y += shard.rotVelocity.y * delta;

          shard.mesh.position.set(shard.initialPos.x, shard.initialPos.y, shard.currentPos.z);
          shard.mesh.rotation.set(shard.currentRot.x, shard.currentRot.y, 0);
        }
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 12. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      const newCameraZ = (height / 2) / Math.tan(fovRad / 2);
      camera.position.z = newCameraZ;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener("resize", handleResize);

    // Save references
    stateRef.current.renderer = renderer;
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.pmremGenerator = pmremGenerator;
    stateRef.current.animFrameId = animId;

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      container.removeEventListener("click", onCanvasClick);
      cancelAnimationFrame(animId);
      renderer.dispose();
      pmremGenerator.dispose();
    };
  }, []);

  // Shatter Trigger ("Shatter Universe" / "Read paper →")
  const handleShatter = () => {
    stateRef.current.shattering = true;
    stateRef.current.reassembling = false;
    setIsShattered(true);
  };

  // Reassemble Trigger ("← Back")
  const handleReassemble = () => {
    stateRef.current.reassembling = true;
    stateRef.current.shattering = false;
    setIsShattered(false);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050507] select-none">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 cursor-default" />

      {/* Top Floating Glass Nav Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-14 py-5 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#20222a] to-[#121318] border border-white/15 flex items-center justify-center shadow-lg group-hover:border-[#FF6B35]/60 transition-all">
            <span className="text-sm font-black text-white group-hover:text-[#FF6B35]">D</span>
          </div>
          <div>
            <span className="font-display font-black tracking-widest text-white text-base md:text-lg">
              DEVADAS
            </span>
            <span className="block text-[10px] tracking-wider text-muted-text font-mono uppercase">
              STUDIO · HYDERABAD
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          {[
            { label: "Showreel", href: "#projects" },
            { label: "Skills", href: "#skills" },
            { label: "Experience", href: "#experience" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-medium tracking-wider text-white/65 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => {
              const contactEl = document.getElementById("contact");
              if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider bg-white/10 hover:bg-[#FF6B35] text-white border border-white/15 hover:border-[#FF6B35] transition-all duration-300 shadow-md hover:shadow-[#FF6B35]/25"
          >
            Hire Devadas
          </button>
        </div>
      </header>

      {/* Interactive Overlay Action Buttons (Overlaid on the Glass Shards) */}
      {!isShattered && (
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end pb-16 md:pb-20 px-8 md:px-20">
          <div className="max-w-6xl mx-auto w-full flex flex-wrap items-center justify-between gap-6 pointer-events-auto">
            {/* Quick Stats / Info Badges */}
            <div className="flex items-center gap-6 text-xs text-white/50 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#36d67e] animate-pulse" />
                <span className="text-white/80">Available For Work</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline text-white/60">DaVinci Resolve · Premiere Pro</span>
            </div>

            {/* Direct Interaction Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (onExploreClick) {
                    onExploreClick();
                  } else {
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                onMouseEnter={() => setHoveredButton("explore")}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative px-6 py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-lg flex items-center gap-2 bg-[#ffffff] hover:bg-[#36d67e] text-[#08090D] hover:shadow-[#36d67e]/40"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Explore Showcase</span>
              </button>

              <button
                onClick={handleShatter}
                onMouseEnter={() => setHoveredButton("shatter")}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative px-6 py-3 rounded-xl font-medium text-xs tracking-wider text-white hover:text-[#b9abff] border border-white/20 hover:border-[#b9abff]/50 bg-white/5 hover:bg-[#b9abff]/10 backdrop-blur-md transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#b9abff]" />
                <span>Shatter Page →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHATTERED VIEW: 5 Cinema Principles View (fades in when shattered) */}
      {isShattered && (
        <div className="absolute inset-0 z-30 pointer-events-auto bg-[#050507]/92 backdrop-blur-md flex flex-col justify-center items-center px-6 md:px-12 animate-in fade-in duration-500">
          {/* Back Button Floating Sliver */}
          <button
            onClick={handleReassemble}
            className="absolute top-24 left-8 md:left-24 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-[#b9abff]/20 hover:border-[#b9abff] text-white hover:text-[#b9abff] text-xs font-semibold tracking-wider flex items-center gap-2 transition-all duration-300 shadow-xl group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Reassemble Glass</span>
          </button>

          <div className="max-w-3xl w-full mx-auto space-y-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#FF6B35] uppercase">
                Facet Material Studio · Cinema Edition
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
                Real-Time Cinema, in Five Principles.
              </h2>
            </div>

            {/* Principles List */}
            <div className="space-y-5">
              {PORTFOLIO_DATA.principlesView.map((item, idx) => (
                <div
                  key={item.term}
                  onMouseEnter={() => setActiveTermIndex(idx)}
                  className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeTermIndex === idx
                      ? "bg-white/[0.08] border-[#FF6B35]/50 shadow-lg shadow-[#FF6B35]/10"
                      : "bg-white/[0.02] border-white/5 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#FF6B35]">0{idx + 1}</span>
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {item.term} <span className="font-normal text-white/50">— {item.subtitle}</span>
                    </h3>
                  </div>
                  <p className="mt-2 text-xs md:text-sm text-white/70 leading-relaxed font-sans pl-7">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-white/40 font-mono">
                Click "Reassemble Glass" to restore the hero slab
              </span>
              <button
                onClick={handleReassemble}
                className="text-xs font-medium text-[#b9abff] hover:underline"
              >
                Done Reading →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Scroll Prompt */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors cursor-pointer pointer-events-auto"
        onClick={() => {
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] tracking-widest font-mono uppercase">Scroll To Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
