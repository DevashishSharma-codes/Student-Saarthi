"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Procedural Raymarched 3D Pastel Dunes & Wildflower Meadow Shader (Rich & Vibrant)
const FRAGMENT_SHADER_SOURCE = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  // Multi-octave undulating meadow dunes
  float terrain(vec2 p) {
    float t = u_time * 0.08;
    float h = 0.0;
    
    // Primary rolling swells
    h += sin(p.x * 0.55 + p.y * 0.40 + t * 0.45) * 0.70;
    h += cos(p.x * 1.05 - p.y * 0.75 - t * 0.35) * 0.40;
    
    // Velvety dune undulations
    h += sin(p.x * 2.1 + p.y * 1.5 + t * 0.25) * 0.20;
    h += cos(p.x * 3.6 - p.y * 2.4) * 0.10;
    
    // Subtle organic grass texture ripple
    h += sin(p.x * 6.5 + p.y * 5.0) * 0.035;
    return h * 0.95;
  }

  // Calculate surface normal
  vec3 getNormal(vec3 p) {
    float eps = 0.012;
    float h = terrain(p.xz);
    float hx = terrain(vec2(p.x + eps, p.z)) - terrain(vec2(p.x - eps, p.z));
    float hz = terrain(vec2(p.x, p.z + eps)) - terrain(vec2(p.x - eps, p.z));
    return normalize(vec3(-hx, 2.0 * eps, -hz));
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // Subtle interactive camera tilt
    vec2 m = (u_mouse - 0.5) * 0.3;
    vec3 ro = vec3(m.x * 0.9, 1.35 + m.y * 0.3, 3.6);
    vec3 ta = vec3(0.0, 0.45, -1.8);

    // Camera ray matrix
    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = normalize(cross(uu, ww));
    vec3 rd = normalize(st.x * uu + st.y * vv + 1.2 * ww);

    // Deep Obsidian / Twilight Atmospheric Sky (Completely Dark & Sleek)
    float skyGrad = clamp(0.5 * (rd.y + 0.10), 0.0, 1.0);
    vec3 skyHorizon = vec3(0.06, 0.05, 0.07); // Deep Obsidian Charcoal
    vec3 skyZenith  = vec3(0.02, 0.018, 0.025); // Deep Midnight
    vec3 col = mix(skyHorizon, skyZenith, skyGrad);

    // Subtle warm amber-peach dusk horizon glow (Zero Purple)
    vec3 horizonGlow = vec3(0.18, 0.12, 0.08);
    col += horizonGlow * pow(1.0 - abs(rd.y), 4.0) * 0.45;

    // Raymarching terrain loop
    float tmin = 0.5;
    float tmax = 14.0;
    float t = tmin;
    float hitT = -1.0;

    for (int i = 0; i < 60; i++) {
      vec3 p = ro + rd * t;
      float h = terrain(p.xz);
      if (p.y < h) {
        hitT = t;
        break;
      }
      t += max(0.035, (p.y - h) * 0.42);
      if (t > tmax) break;
    }

    if (hitT > 0.0) {
      vec3 p = ro + rd * hitT;
      vec3 n = getNormal(p);

      // Mood lighting: directional warm key light + dark ambient
      vec3 lDir = normalize(vec3(0.65, 0.60, 0.40));
      float diff = clamp(dot(n, lDir), 0.15, 1.0);
      float rim = pow(clamp(1.0 - dot(n, -rd), 0.0, 1.0), 2.2);

      // =========================================================
      // REFINED PASTEL MEADOW PALETTE (Zero Purple - Rich & Pure)
      // =========================================================
      vec3 cDarkBedrock    = vec3(0.05, 0.045, 0.06); // Deep Obsidian base
      vec3 cMeadowGreen    = vec3(0.25, 0.78, 0.45); // Lush Fresh Mint Meadow
      vec3 cBlushPink      = vec3(0.96, 0.52, 0.65); // Soft Pastel Blush Rose
      vec3 cGoldenAmber    = vec3(0.98, 0.76, 0.32); // Warm Buttercup Amber
      vec3 cSoftPeach      = vec3(0.98, 0.64, 0.48); // Gentle Pastel Peach
      vec3 cCoralRose      = vec3(0.96, 0.44, 0.48); // Soft Coral Wildflower
      vec3 cMintSage       = vec3(0.35, 0.82, 0.60); // Clean Mint Highlight

      // Contoured color striations following the rolling slopes
      float bandCoord = p.x * 0.75 + p.z * 1.15 + p.y * 1.35;
      float band = sin(bandCoord * 1.6 + u_time * 0.04) * 0.5 + 0.5;
      float band2 = cos(p.x * 1.35 - p.z * 0.85) * 0.5 + 0.5;

      // Multi-zone color mapping with smooth, pure pastel transitions
      vec3 ribbonCol = cMeadowGreen;
      if (band < 0.25) {
        ribbonCol = mix(cMeadowGreen, cBlushPink, band / 0.25);
      } else if (band < 0.50) {
        ribbonCol = mix(cBlushPink, cGoldenAmber, (band - 0.25) / 0.25);
      } else if (band < 0.75) {
        ribbonCol = mix(cGoldenAmber, cSoftPeach, (band - 0.50) / 0.25);
      } else {
        ribbonCol = mix(cSoftPeach, cCoralRose, (band - 0.75) / 0.25);
      }

      // Weave in fresh mint highlights
      ribbonCol = mix(ribbonCol, cMintSage, band2 * 0.35);

      // Blend ribbon colors with deep dark bedrock
      float slopeFactor = clamp(n.y, 0.0, 1.0);
      vec3 matCol = mix(cDarkBedrock, ribbonCol, 0.55 + 0.45 * slopeFactor);

      // Shaded valleys retain deep dark velvet
      float heightFactor = clamp((p.y + 0.5) * 0.8, 0.0, 1.0);
      matCol = mix(cDarkBedrock, matCol, 0.40 + 0.60 * heightFactor);

      // Direct lighting with soft colored ambient
      vec3 keyLight = vec3(1.0, 0.95, 0.85) * diff * 0.95;
      vec3 darkAmbient = vec3(0.12, 0.10, 0.15) * 0.4;
      vec3 litCol = matCol * (keyLight + darkAmbient);

      // Luminous velvet rim glow along crests
      litCol += ribbonCol * rim * 0.55;

      // Distance fog: gracefully fades far hills into obsidian sky
      float fog = clamp((hitT - 5.0) / 8.5, 0.0, 0.85);
      col = mix(litCol, col, fog);
    }

    // Rich cinematic contrast & vibrance lift
    col = clamp(col, 0.0, 1.0);
    gl_FragColor = vec4(col, 1.0);
  }
`;

interface PastoralShaderProps {
  className?: string;
}

export const PastoralShader = ({ className = "" }: PastoralShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const animFrameId = useRef<number>(0);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL
    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
      }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setIsSupported(false);
      return;
    }

    // Compile Shader Helper
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vertShader || !fragShader) {
      setIsSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Shader link error:", gl.getProgramInfoLog(program));
      setIsSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full-screen Quad Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    // Dynamic Sizing with High-DPI Retina Support
    let isVisible = true;
    const updateSize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Mouse Parallax tracking
    const handleMouseMove = (e: MouseEvent) => {
      targetMousePos.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Intersection Observer to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation Loop
    const startTime = performance.now();
    const render = () => {
      if (isVisible) {
        const currentTime = (performance.now() - startTime) / 1000;

        // Smooth mouse lerp
        mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05;
        mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05;

        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, currentTime);
        gl.uniform2f(uMouse, mousePos.current.x, mousePos.current.y);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (program) gl.deleteProgram(program);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block pointer-events-none ${className}`}
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    />
  );
};

export default PastoralShader;
