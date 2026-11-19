"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { ArrowLeft, Play, Sparkles, ChevronDown } from "lucide-react";
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
    shatterProgress: number;
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

    // 1. Scene & Camera Setup (FOV 30°, 1 world unit = 1 CSS px at z = 0)
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
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. PMREM RoomEnvironment & Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;
    scene.environmentIntensity = 0.42;

    // Soft white-blue key light from top-left (color #E0F1F1 tint)
    const keyLight = new THREE.DirectionalLight(0xe0f1f1, 1.9);
    keyLight.position.set(-width * 0.4, height * 0.5, 450);
    scene.add(keyLight);

    // Signature Red fill light from bottom-right (#FF0000)
    const fillLight = new THREE.DirectionalLight(0xff0000, 1.5);
    fillLight.position.set(width * 0.45, -height * 0.4, 320);
    scene.add(fillLight);

    // Soft cyan-slate ambient light (#BCD6DB)
    const ambientLight = new THREE.AmbientLight(0x1a2028, 1.3);
    scene.add(ambientLight);

    // 4. Floating Cinema Background Elements (Red Embers & Aperture Torus)
    const filmReelsGroup = new THREE.Group();
    scene.add(filmReelsGroup);

    const ringGeo = new THREE.TorusGeometry(140, 5, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x1a1c24,
      roughness: 0.3,
      metalness: 0.8
    });
    const apertureRing = new THREE.Mesh(ringGeo, ringMat);
    apertureRing.position.set(width * 0.38, -height * 0.12, -140);
    apertureRing.rotation.set(0.4, -0.6, 0.2);
    filmReelsGroup.add(apertureRing);

    const innerRingGeo = new THREE.TorusGeometry(95, 2.5, 8, 32);
    const innerRingMat = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.3, metalness: 0.6 });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.copy(apertureRing.position);
    innerRing.rotation.copy(apertureRing.rotation);
    filmReelsGroup.add(innerRing);

    // Vibrant Red & Ice Dust Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * width * 1.5;
      particlePos[i + 1] = (Math.random() - 0.5) * height * 1.5;
      particlePos[i + 2] = (Math.random() - 0.5) * 450 - 120;

      // Randomly crimson red (#FF0000) or ice tint (#E0F1F1)
      if (Math.random() > 0.4) {
        particleColors[i] = 1.0;
        particleColors[i + 1] = 0.05;
        particleColors[i + 2] = 0.05;
      } else {
        particleColors[i] = 0.88;
        particleColors[i + 1] = 0.95;
        particleColors[i + 2] = 0.95;
      }
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 3.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const bgParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(bgParticles);

    // 5. Glass Shaders & Material Construction
    // Page block: centered, side margins 5.5%, top/bottom 8.5%
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

    // Glass Material with Cursor Glow (Lavender / Slate Emission vec3(.42,.37,.62))
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
      transmission: 0.06,
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

      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <dithering_fragment>`,
        `
        #include <dithering_fragment>
        float distToCursor = length(vWorldPosition - uPointerPos);
        float glowRadius = 320.0 * max(0.5, uScale);
        float glowFactor = exp(-1.6 * pow(distToCursor / glowRadius, 2.0)) * uGlowIntensity;
        vec3 lavenderGlow = vec3(0.42, 0.37, 0.62) * 0.22 * glowFactor;
        vec3 redRim = vec3(1.0, 0.05, 0.05) * 0.25 * glowFactor;
        gl_FragColor.rgb += lavenderGlow + redRim;
        `
      );
    };
    stateRef.current.glassMaterial = glassMaterial;

    // 6. Full-Screen Canvas Texture (Printed Page & Fullscreen Hero Image)
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

    // Load full-screen hero image requested by user!
    const heroImg = new Image();
    heroImg.crossOrigin = "anonymous";
    heroImg.src = "/images/profile/devadas-hero-full.jpg";
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

      // FULL SCREEN HERO IMAGE DRAWING ACROSS SLAB
      if (stateRef.current.heroImage) {
        ctx.save();
        const img = stateRef.current.heroImage;
        const imgRatio = img.width / img.height;
        const canvasRatio = cw / ch;

        // Render full image covering or positioned on right-center with dark gradient integration
        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (canvasRatio > 1.2) {
          // Desktop landscape: Feature full portrait on the right half with seamless gradient bleed
          drawH = ch * 0.98;
          drawW = drawH * imgRatio;
          drawX = cw - drawW - cw * 0.02;
          drawY = (ch - drawH) / 2;
        } else {
          // Portrait/Tablet: Fill upper center
          drawW = cw * 0.9;
          drawH = drawW / imgRatio;
          drawX = (cw - drawW) / 2;
          drawY = ch * 0.08;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Cinematic soft gradient overlay so text stays readable on left while image shines on right
        const gradL = ctx.createLinearGradient(0, 0, cw * 0.65, 0);
        gradL.addColorStop(0, "rgba(5, 5, 7, 0.95)");
        gradL.addColorStop(0.5, "rgba(5, 5, 7, 0.7)");
        gradL.addColorStop(1, "rgba(5, 5, 7, 0.0)");
        ctx.fillStyle = gradL;
        ctx.fillRect(0, 0, cw, ch);

        const gradB = ctx.createLinearGradient(0, ch * 0.7, 0, ch);
        gradB.addColorStop(0, "rgba(5, 5, 7, 0.0)");
        gradB.addColorStop(1, "rgba(5, 5, 7, 0.85)");
        ctx.fillStyle = gradB;
        ctx.fillRect(0, ch * 0.7, cw, ch * 0.3);

        ctx.restore();
      }

      // Printed Content with Sora Font & Color Palette (#F5F5F5, #E0F1F1, #BCD6DB, #FF0000)
      const textLeft = cw * 0.08;

      // 1. Eyebrow: "REAL-TIME MATERIAL STUDIO" / "REAL-TIME CINEMATIC STORYTELLER"
      ctx.fillStyle = "#BCD6DB";
      ctx.font = `600 ${Math.max(12, 12 * s)}px Sora, sans-serif`;
      ctx.letterSpacing = "0.22em";
      ctx.fillText("MEESALA DEVADAS · CINEMATIC REALM", textLeft, ch * 0.28);
      ctx.letterSpacing = "0px";

      // 2. Headline: "Designed in glass. Every frame a story."
      const headlineSize = Math.max(28, Math.min(cw * 0.055, ch * 0.13));
      ctx.font = `700 ${headlineSize}px Sora, sans-serif`;
      const headlineGrad = ctx.createLinearGradient(0, ch * 0.32, 0, ch * 0.52);
      headlineGrad.addColorStop(0, "#F5F5F5");
      headlineGrad.addColorStop(0.6, "#E0F1F1");
      headlineGrad.addColorStop(1, "#BCD6DB");
      ctx.fillStyle = headlineGrad;

      ctx.fillText("Designed in glass.", textLeft, ch * 0.38);
      ctx.fillText("Every frame a story.", textLeft, ch * 0.38 + headlineSize * 1.05);

      // 3. Two-line subtitle
      ctx.fillStyle = "rgba(224, 241, 241, 0.85)";
      const subSize = Math.max(14, 15 * s);
      ctx.font = `400 ${subSize}px Sora, sans-serif`;
      ctx.fillText(
        "Visual Storyteller & Lead Video Editor. Crafting cinematic rhythm,",
        textLeft,
        ch * 0.56
      );
      ctx.fillText(
        "DaVinci color science, and evocative narratives in the browser.",
        textLeft,
        ch * 0.56 + subSize * 1.45
      );

      // 4. "Open Studio / Explore Work" Light Pill (Turning #FF0000 on hover)
      const pillW = Math.max(130, 160 * s);
      const pillH = Math.max(40, 46 * s);
      const pillX = textLeft;
      const pillY = ch * 0.71;
      const pradius = 8 * s;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pillX + pradius, pillY);
      ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, pradius);
      ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, pradius);
      ctx.arcTo(pillX, pillY + pillH, pillX, pillY, pradius);
      ctx.arcTo(pillX, pillY, pillX + pillW, pillY, pradius);
      ctx.closePath();
      ctx.fillStyle = "#FF0000";
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = `600 ${Math.max(13, 14 * s)}px Sora, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Explore Work", pillX + pillW / 2, pillY + pillH / 2);
      ctx.restore();

      // 5. "Read paper →" / "Shatter Page →"
      const linkX = pillX + pillW + 30 * s;
      const linkY = pillY + pillH / 2;
      ctx.save();
      ctx.fillStyle = "#E0F1F1";
      ctx.font = `500 ${Math.max(13, 14 * s)}px Sora, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillText("Shatter universe  →", linkX, linkY);
      ctx.restore();

      // 6. Bottom tags: "© DEVADAS STUDIO" & "KHR_materials_dispersion"
      ctx.fillStyle = "rgba(188, 214, 219, 0.6)";
      ctx.font = `500 ${Math.max(10, 11 * s)}px Sora, sans-serif`;
      ctx.fillText("© MEESALA DEVADAS · HYDERABAD", cw * 0.06, ch * 0.94);
      ctx.textAlign = "right";
      ctx.fillText("4K_PRORES_DAVINCI_CINEMA", cw * 0.94, ch * 0.94);
      ctx.textAlign = "left";

      textTexture.needsUpdate = true;
    }

    drawPrintedCanvas();

    // 7. Glass Geometry Builder & Cut Pattern
    const navHeight = blockHeight * 0.108;
    const gap = 14 * S;
    const panelHeight = blockHeight - navHeight - gap;
    const cornerRadius = 20 * S;
    const depth = 13 * S;
    const bevel = 2.6 * S;

    const glassGroup = new THREE.Group();
    scene.add(glassGroup);
    stateRef.current.glassGroup = glassGroup;

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

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel
    };

    // Nav Slab
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

    const navTextGeo = new THREE.PlaneGeometry(blockWidth, navHeight);
    const navTextMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.95,
      map: textTexture
    });
    const navTextMesh = new THREE.Mesh(navTextGeo, navTextMat);
    navTextMesh.position.set(0, 0, depth + bevel + 0.5);

    glassGroup.add(navMesh);

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

    // 8. Five Shards Cut Pattern (A, B, C, D, E)
    const panelHalfW = blockWidth / 2;
    const panelHalfH = panelHeight / 2;
    const panelCenterY = -blockHeight / 2 + panelHalfH;

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
      { id: "A", pts: [TL, tAB, J0, bAD, BL], stagger: 0.05, velX: -360, velY: -200, velZ: 650 },
      { id: "B", pts: [tAB, tBC, J1, J0], stagger: 0.09, velX: -110, velY: 380, velZ: 550 },
      { id: "C", pts: [tBC, tCE, J2, J1], stagger: 0.12, velX: 200, velY: 330, velZ: 700 },
      { id: "D", pts: [J0, J1, J2, bDE, bAD], stagger: 0.08, velX: -90, velY: -450, velZ: 750 },
      { id: "E", pts: [tCE, TR, BR, bDE, J2], stagger: 0.15, velX: 430, velY: -150, velZ: 800 }
    ];

    cellDefs.forEach((cell) => {
      const shape = createRoundedShape(cell.pts, cornerRadius);
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      const posAttr = geo.attributes.position;
      const uvs = new Float32Array(posAttr.count * 2);
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);
        const u = (x + panelHalfW) / blockWidth;
        const v = (y + panelHalfH) / blockHeight;
        uvs[i * 2] = Math.max(0, Math.min(1, u));
        uvs[i * 2 + 1] = Math.max(0, Math.min(1, v));
      }
      geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

      const mesh = new THREE.Mesh(geo, glassMaterial);
      mesh.position.set(0, panelCenterY, 0);

      // Printed surface text shape
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
        opacity: 0.95
      });
      const textMesh = new THREE.Mesh(textShapeGeo, textMat);
      textMesh.position.set(0, 0, depth + bevel + 0.3);
      mesh.add(textMesh);

      glassGroup.add(mesh);

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

    // 9. "← Back" Glass Sliver (Viewport fractions: .147,.243 / .252,.169 / .287,.277 / .151,.258)
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
    sliverMesh.scale.set(0.001, 0.001, 0.001);
    scene.add(sliverMesh);

    stateRef.current.backSliver = {
      mesh: sliverMesh,
      initialPos: new THREE.Vector3(0, 0, 80),
      wobbleTime: 0,
      isHovered: false
    };

    // 10. Pointer Tracking & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / width) * 2 - 1;
      const normY = -(clientY / height) * 2 + 1;

      mouseNorm.set(normX, normY);

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

      // Atmospheric rotation
      if (bgParticles) {
        bgParticles.rotation.y = elapsed * 0.035;
        bgParticles.rotation.x = Math.sin(elapsed * 0.06) * 0.05;
      }
      if (apertureRing) {
        apertureRing.rotation.z = elapsed * 0.12;
      }

      // Pointer Raycast
      raycaster.setFromCamera(mouseNorm, camera);
      const meshesToTest = stateRef.current.shards.map((s) => s.mesh);
      if (stateRef.current.backSliver?.mesh.visible) {
        meshesToTest.push(stateRef.current.backSliver.mesh);
      }
      const intersects = raycaster.intersectObjects(meshesToTest, false);
      const hoveredMesh = intersects.length > 0 ? intersects[0].object : null;

      // Handle Back Sliver
      if (stateRef.current.backSliver) {
        const sliver = stateRef.current.backSliver;
        sliver.isHovered = hoveredMesh === sliver.mesh;
        sliver.wobbleTime += delta;
        const wobble = Math.sin(sliver.wobbleTime * 2.0) * 0.035;

        if (stateRef.current.shatterProgress > 0.5) {
          sliver.mesh.visible = true;
          sliver.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 6);
          sliver.mesh.rotation.y = -0.16 + wobble + (sliver.isHovered ? 0.14 : 0);
          sliver.mesh.rotation.x = 0.08 + (sliver.isHovered ? 0.06 : 0);
        } else {
          sliver.mesh.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), delta * 8);
          if (sliver.mesh.scale.x < 0.01) sliver.mesh.visible = false;
        }
      }

      // Global Tilt of Glass Group (rotateY = x·7° - 1.2°, rotateX = -y·5.5° + .8°)
      const p = stateRef.current.pointer;
      const targetTiltY = p.isInside ? (p.x * 7 - 1.2) * (Math.PI / 180) : -1.2 * (Math.PI / 180);
      const targetTiltX = p.isInside ? (-p.y * 5.5 + 0.8) * (Math.PI / 180) : 0.8 * (Math.PI / 180);

      glassGroup.rotation.y += (targetTiltY - glassGroup.rotation.y) * Math.min(1, delta * 3.5);
      glassGroup.rotation.x += (targetTiltX - glassGroup.rotation.x) * Math.min(1, delta * 3.5);

      // Shatter / Reassemble Progress
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

        // Hover sheen
        if (shard.isHovered) {
          glassMaterial.iridescence = THREE.MathUtils.lerp(glassMaterial.iridescence, 1.0, delta * 8);
          scene.environmentIntensity = THREE.MathUtils.lerp(scene.environmentIntensity, 1.9, delta * 6);
        } else if (!intersects.some((i) => i.object === shard.mesh)) {
          glassMaterial.iridescence = THREE.MathUtils.lerp(glassMaterial.iridescence, 0.55, delta * 2);
          scene.environmentIntensity = THREE.MathUtils.lerp(scene.environmentIntensity, 0.42, delta * 2);
        }

        if (sp > 0) {
          // SHATTERED STATE: ease-in cubic fly-off
          const staggeredP = Math.max(0, Math.min(1, (sp - shard.stagger) / (1 - shard.stagger)));
          const easeIn = staggeredP * staggeredP * staggeredP;

          const flightX = shard.initialPos.x + shard.shatterVel.x * easeIn * 2.2;
          const flightY = shard.initialPos.y + shard.shatterVel.y * easeIn * 1.8 - 400 * S * easeIn * easeIn;
          const flightZ = shard.initialPos.z + shard.shatterVel.z * easeIn * 1.5;

          shard.mesh.position.set(flightX, flightY, flightZ);

          const rotAngle = shard.shatterRotSpeed * easeIn * Math.PI;
          shard.mesh.quaternion.setFromAxisAngle(shard.shatterRotAxis, rotAngle);
        } else {
          // NORMAL / HOVER SPRING PHYSICS: k = 170, c = 19
          const springK = 170;
          const dampingC = 19;

          const targetLiftZ = shard.isHovered ? (shard.id === "nav" ? 32 * S : 50 * S) : 0;
          const targetTipX = shard.isHovered ? (p.y > 0 ? -0.15 : 0.15) : 0;
          const targetTipY = shard.isHovered ? (p.x > 0 ? 0.15 : -0.15) : 0;

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

  const handleShatter = () => {
    stateRef.current.shattering = true;
    stateRef.current.reassembling = false;
    setIsShattered(true);
  };

  const handleReassemble = () => {
    stateRef.current.reassembling = true;
    stateRef.current.shattering = false;
    setIsShattered(false);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050507] select-none font-sans">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 cursor-default" />

      {/* Top Floating Nav Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-14 py-6 flex items-center justify-between pointer-events-none font-sans">
        <div className="flex items-center gap-3.5 pointer-events-auto cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E2028] to-[#101217] border border-[#BCD6DB]/20 flex items-center justify-center shadow-lg group-hover:border-[#FF0000] transition-all">
            <span className="text-sm font-black text-white group-hover:text-[#FF0000]">D</span>
          </div>
          <div>
            <span className="font-display font-black tracking-wider text-white text-base md:text-lg">
              DEVADAS
            </span>
            <span className="block text-[10px] tracking-wider text-[#BCD6DB]/70 font-mono uppercase">
              STUDIO · HYDERABAD
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-9 pointer-events-auto">
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
              className="text-xs font-semibold tracking-wider text-[#BCD6DB]/80 hover:text-white transition-colors duration-200"
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
            className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider bg-[#FF0000] hover:bg-[#E60000] text-white border border-[#FF0000] transition-all duration-300 shadow-lg shadow-[#FF0000]/30"
          >
            Hire Devadas
          </button>
        </div>
      </header>

      {/* Interactive Overlay Action Buttons */}
      {!isShattered && (
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end pb-16 md:pb-20 px-8 md:px-20 font-sans">
          <div className="max-w-6xl mx-auto w-full flex flex-wrap items-center justify-between gap-6 pointer-events-auto">
            {/* Quick Badges */}
            <div className="flex items-center gap-6 text-xs text-[#BCD6DB]/70 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000] animate-pulse" />
                <span className="text-white font-medium">Available For Productions</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline text-[#BCD6DB]">DaVinci Resolve · Premiere Pro · CapCut</span>
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
                className="group relative px-7 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center gap-2 bg-[#FF0000] hover:bg-[#E60000] text-white shadow-[#FF0000]/35 hover:-translate-y-0.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Explore Showcase</span>
              </button>

              <button
                onClick={handleShatter}
                onMouseEnter={() => setHoveredButton("shatter")}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative px-7 py-3 rounded-xl font-semibold text-xs tracking-wider text-white hover:text-[#BCD6DB] border border-[#BCD6DB]/30 hover:border-[#BCD6DB] bg-white/5 hover:bg-[#BCD6DB]/10 backdrop-blur-md transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>Shatter Universe →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHATTERED VIEW: 5 Cinema Principles View */}
      {isShattered && (
        <div className="absolute inset-0 z-30 pointer-events-auto bg-[#050507]/94 backdrop-blur-md flex flex-col justify-center items-center px-6 md:px-12 animate-in fade-in duration-500 font-sans">
          {/* Back Button Floating Sliver */}
          <button
            onClick={handleReassemble}
            className="absolute top-24 left-8 md:left-24 px-5 py-2.5 rounded-full border border-[#BCD6DB]/30 bg-white/10 hover:bg-[#BCD6DB]/20 hover:border-[#BCD6DB] text-white hover:text-[#E0F1F1] text-xs font-bold tracking-wider flex items-center gap-2 transition-all duration-300 shadow-xl group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Reassemble Glass</span>
          </button>

          <div className="max-w-3xl w-full mx-auto space-y-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#FF0000] uppercase font-bold">
                Facet Material Studio · Cinema Edition
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
                Real-Time Glass & Cinema, in Five Principles.
              </h2>
            </div>

            {/* Principles List */}
            <div className="space-y-4">
              {PORTFOLIO_DATA.principlesView.map((item, idx) => (
                <div
                  key={item.term}
                  onMouseEnter={() => setActiveTermIndex(idx)}
                  className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeTermIndex === idx
                      ? "bg-white/[0.08] border-[#FF0000]/60 shadow-lg shadow-[#FF0000]/15"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#FF0000]">0{idx + 1}</span>
                    <h3 className="text-base md:text-lg font-bold text-white">
                      {item.term} <span className="font-normal text-[#BCD6DB]/70">— {item.subtitle}</span>
                    </h3>
                  </div>
                  <p className="mt-2 text-xs md:text-sm text-[#E0F1F1]/80 leading-relaxed font-sans pl-7">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-[#BCD6DB]/50 font-mono">
                Click &ldquo;Reassemble Glass&rdquo; to restore the hero slab
              </span>
              <button
                onClick={handleReassemble}
                className="text-xs font-semibold text-[#FF0000] hover:underline"
              >
                Done Reading →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Scroll Prompt */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[#BCD6DB]/50 hover:text-white transition-colors cursor-pointer pointer-events-auto"
        onClick={() => {
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] tracking-widest font-mono uppercase">Scroll To Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#FF0000]" />
      </div>
    </section>
  );
}
