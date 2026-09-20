import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

/* Utils ------------------------------------------ */
const textureLoader = new THREE.TextureLoader()

/* Scene Subjects ----------------------------------------- */
class PlaneSubject {
  raycaster = new THREE.Raycaster()
  scene = null

  constructor(scene, imageSrc) {
    const geometry = new THREE.PlaneGeometry(5, 7)
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        
        uniform sampler2D texture;
        uniform float imageAspectRatio;
        uniform float aspectRatio;
        uniform float opacity;
        uniform float hover;
        
        varying vec2 vUv;
        
        float exponentialInOut(float t) {
          return t == 0.0 || t == 1.0 
            ? t 
            : t < 0.5
              ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
              : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
        }
        
        void main() {
          vec2 uv = vUv;
          
          // fix aspectRatio
          float u = imageAspectRatio / aspectRatio;
          if (imageAspectRatio > aspectRatio) {
            u = 1.0 / u;
          }
          
          uv.y *= u;
          uv.y -= (u) / 2.0 - 0.5;
          
          // hover effect
          float zoomLevel = 0.2;
          float hoverLevel = exponentialInOut(
            min(1.0, (distance(vec2(0.5), uv) * hover) + hover)
          );
          
          uv *= 1.0 - zoomLevel * hoverLevel;
          uv += zoomLevel / 2.0 * hoverLevel;
          uv = clamp(uv, 0.0, 1.0);
          
          vec4 color = texture2D(texture, uv);
          
          if (hoverLevel > 0.0) {
            hoverLevel = 1.0 - abs(hoverLevel - 0.5) * 2.0;
            
            // Pixel displace
            uv.y += color.r * hoverLevel * 0.05;
            color = texture2D(texture, uv);
            
            // RGBshift
            color.r = texture2D(texture, uv + (hoverLevel) * 0.01).r;
            color.g = texture2D(texture, uv - (hoverLevel) * 0.01).g;
          }
          
          gl_FragColor = mix(vec4(1.0, 1.0, 1.0, opacity), color, opacity);
        }
      `,
      uniforms: {
        texture: {
          type: 't',
          value: textureLoader.load(
            imageSrc,
            (texture) => {
              // Update aspect ratio
              if (texture.image) {
                material.uniforms.imageAspectRatio.value = texture.image.width / texture.image.height
              }
            },
            undefined,
            (error) => {
              // Image loading error
            }
          )
        },
        imageAspectRatio: {
          type: 'f',
          value: 1.0
        },
        aspectRatio: {
          type: 'f',
          value: 1.0
        },
        opacity: {
          type: 'f',
          value: 1.0
        },
        hover: {
          type: 'f',
          value: 0.0
        }
      }
    })
    
    material.transparent = true
    
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    
    this.scene = scene
    this.mesh = mesh
  }

  update(delta, time) {}

  mouseHandler(mouse, camera) {
    const { scene, mesh, raycaster } = this
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    
    // Use GSAP for smooth animations
    gsap.to(mesh.material.uniforms.hover, {
      value: intersects.length ? 1 : 0,
      duration: 2
    })
    
    gsap.to(mesh.scale, {
      x: 1 - mouse.y * 0.1,
      y: 1 - mouse.y * 0.1,
      duration: 0.5
    })
    
    gsap.to(mesh.position, {
      x: mouse.x,
      duration: 0.5
    })
    
    gsap.to(mesh.rotation, {
      x: -mouse.y * (Math.PI / 3) * 0.3,
      y: mouse.x * (Math.PI / 3) * 0.3,
      duration: 0.5
    })
  }
}

/* Scene Manager ------------------------------------------------ */
class SceneManager {
  clock = new THREE.Clock()
  mouse = new THREE.Vector2()

  buildScene = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#111')
    return scene
  }

  buildRender = ({ width, height }) => {
    const { canvas } = this
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1
    renderer.setPixelRatio(DPR)
    renderer.setSize(width, height)
    return renderer
  }

  buildCamera = ({ width, height }) => {
    const aspectRatio = width / height
    const fieldOfView = 60
    const nearPlane = 1
    const farPlane = 100
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    camera.position.z = 8
    return camera
  }

  createSceneSubjects = (scene, imageSrc) => {
    const sceneSubjects = [new PlaneSubject(scene, imageSrc)]
    return sceneSubjects
  }

  constructor(canvas, imageSrc) {
    this.canvas = canvas
    this.screenDimensions = {
      width: this.canvas.offsetWidth,
      height: this.canvas.offsetHeight
    }
    this.scene = this.buildScene()
    this.renderer = this.buildRender(this.screenDimensions)
    this.camera = this.buildCamera(this.screenDimensions)
    this.sceneSubjects = this.createSceneSubjects(this.scene, imageSrc)
  }

  update() {
    const delta = this.clock.getDelta()
    const elapsed = this.clock.getElapsedTime()
    this.sceneSubjects.map(s => (s.update ? s.update(delta, elapsed) : null))
    this.renderer.render(this.scene, this.camera)
  }

  resizeHandler() {
    const width = this.canvas.offsetWidth
    const height = this.canvas.offsetHeight
    this.screenDimensions = { width, height }
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  mouseHandler(mousePos) {
    Object.assign(this.mouse, mousePos)
    this.sceneSubjects.map(s =>
      s.mouseHandler ? s.mouseHandler(this.mouse, this.camera) : null
    )
  }

  dispose() {
    this.renderer.dispose()
    this.sceneSubjects.forEach(s => {
      if (s.mesh) {
        s.mesh.geometry.dispose()
        s.mesh.material.dispose()
      }
    })
  }
}

/* React Component ------------------------------------------------ */
export function ThreeImage({ imageSrc, className = '' }) {
  const canvasRef = useRef(null)
  const sceneManagerRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const sceneManager = new SceneManager(canvas, imageSrc)
    sceneManagerRef.current = sceneManager

    // Resize canvas
    const resizeCanvas = () => {
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      sceneManager.resizeHandler()
    }

    // Mouse handler
    const mouseHandler = (e) => {
      const rect = canvas.getBoundingClientRect()
      sceneManager.mouseHandler({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1
      })
    }

    // Bind events
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', mouseHandler)
    
    resizeCanvas()

    // Render loop
    let animationFrameId
    const render = () => {
      animationFrameId = requestAnimationFrame(render)
      sceneManager.update()
    }
    render()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', mouseHandler)
      cancelAnimationFrame(animationFrameId)
      sceneManager.dispose()
    }
  }, [imageSrc])

  return (
    <canvas
      ref={canvasRef}
      className={`three-image-canvas ${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  )
}
