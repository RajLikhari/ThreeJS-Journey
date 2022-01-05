import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import typefacefont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCap = textureLoader.load('/textures/matcaps/1.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        console.log('font loaded')
        const textGeometry = new TextGeometry(
            'Hi Mom',
            {
                font: font,
                size: 2,
                height: 1,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //    - (textGeometry.boundingBox.max.x - 0.02)  * 0.5,
        //    - (textGeometry.boundingBox.max.y - 0.02)  * 0.5,
        //    - (textGeometry.boundingBox.max.z - 0.03)  * 0.5,

        // )
        textGeometry.center()
        const textMaterial = new THREE.MeshNormalMaterial({})
        const mesh = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(mesh)
        
        const donut = new THREE.TorusGeometry(0.3, 0.2, 16, 32)
        for(let i = 0; i < 200; i++){
            const mesh = new THREE.Mesh(donut, textMaterial)
            mesh.position.x = (Math.random() - 0.5) * 50
            mesh.position.y = (Math.random() - 0.5) * 50
            mesh.position.z = (Math.random() - 0.5) * 50

            mesh.rotation.x = (Math.random() - 0.5) * 4
            mesh.rotation.y = (Math.random() - 0.5) * 4
            mesh.rotation.z = (Math.random() - 0.5) * 4
            
            scene.add(mesh)

        }

        const cube = new THREE.BoxGeometry(1, 1, 1)
        for(let i = 0; i < 200; i++){
            const mesh = new THREE.Mesh(cube, textMaterial)
            mesh.position.x = (Math.random() - 0.5) * 50
            mesh.position.y = (Math.random() - 0.5) * 50
            mesh.position.z = (Math.random() - 0.5) * 50

            mesh.rotation.x = (Math.random() - 0.5) * 4
            mesh.rotation.y = (Math.random() - 0.5) * 4
            mesh.rotation.z = (Math.random() - 0.5) * 4
            
            scene.add(mesh)

        }

        const cone = new THREE.ConeGeometry(0.4, 1, 16, 16)
        for(let i = 0; i < 200; i++){
            const mesh = new THREE.Mesh(cone, textMaterial)
            mesh.position.x = (Math.random() - 0.5) * 50
            mesh.position.y = (Math.random() - 0.5) * 50
            mesh.position.z = (Math.random() - 0.5) * 50

            mesh.rotation.x = (Math.random() - 0.5) * 4
            mesh.rotation.y = (Math.random() - 0.5) * 4
            mesh.rotation.z = (Math.random() - 0.5) * 4
            
            scene.add(mesh)

        }

        const cyc = new THREE.CylinderGeometry(1, 1)
        for(let i = 0; i < 200; i++){
            const mesh = new THREE.Mesh(cyc, textMaterial)
            mesh.position.x = (Math.random() - 0.5) * 50
            mesh.position.y = (Math.random() - 0.5) * 50
            mesh.position.z = (Math.random() - 0.5) * 50

            mesh.rotation.x = (Math.random() - 0.5) * 4
            mesh.rotation.y = (Math.random() - 0.5) * 4
            mesh.rotation.z = (Math.random() - 0.5) * 4
            
            scene.add(mesh)

        }
    }
)


/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()