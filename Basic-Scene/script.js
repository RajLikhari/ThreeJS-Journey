//Scene, where it renders
const scene = new THREE.Scene()

//Red cube, the actual 3D object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Camera 
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
camera.position.x = 2
scene.add(camera)


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas:  document.querySelector('.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
