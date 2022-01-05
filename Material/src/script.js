import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Mesh, MeshLambertMaterial } from 'three'
import * as lil from 'lil-gui'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * GUI
 */
const gui = new lil.GUI()


/**
 * Textures
 */
const loadingManger = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManger)
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

//Cube Texture Loader => Environment, NEED TO LOAD in Pos X Neg X --> Pos Z Neg Z
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/2/px.jpg',
    '/textures/environmentMaps/2/nx.jpg',
    '/textures/environmentMaps/2/py.jpg',
    '/textures/environmentMaps/2/ny.jpg',
    '/textures/environmentMaps/2/pz.jpg',
    '/textures/environmentMaps/2/nz.jpg'
])


/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial({
// })
//material.alphaMap = doorAlphaTexture
//material.color = new THREE.Color('red')
//material.wireframe = true
//material.opacity = 0.5
//material.transparent = true
//material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
//material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()
// const material = new MeshLambertMaterial()
// const material = new THREE.MeshPhongMaterial()
// material.specular = new THREE.Color('red')
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

//Realistic door using standard which allows for lights 
// const material = new THREE.MeshStandardMaterial()

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 2
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.roughnessMap = doorRoughnessTexture
// material.metalnessMap = doorMetalnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(5, 5)
// material.alphaMap = doorAlphaTexture
// material.transparent = true

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0
material.envMap = environmentMapTexture

gui.add(material, 'metalness', 0, 1, 0.0005)
gui.add(material, 'roughness', 0, 1, 0.0005)
gui.add(material, 'aoMapIntensity', 0, 10, 0.005)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
)

const donut = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 64, 128),
    material
)
donut.position.x = 1.5

//Needs this for using ambient occlusion maps
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
donut.geometry.setAttribute('uv2', new THREE.BufferAttribute(donut.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, donut)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 2
pointLight.position.z = 3
scene.add(pointLight)

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
    const elapsedTime = clock.getElapsedTime() //Time is same for all

    //Update Objects
    sphere.rotation.y = 0.1 * elapsedTime
    //plane.rotation.y = 0.5 * elapsedTime
    donut.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    //plane.rotation.x = 0.15 * elapsedTime
    donut.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()