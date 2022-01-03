import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 600,
    height: 400
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Clock
const clock = new THREE.Clock()




const tick = () => {
    // Clock
    const elapsedTime = clock.getElapsedTime()

    //Update Object, Multiplying rotation by PI * 2 can do in one second
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.rotation.x = elapsedTime 
    // mesh.rotation.y = elapsedTime

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)


}

tick()