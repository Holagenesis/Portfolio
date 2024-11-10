import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createPainting }   from "./CreatePicture";
import { showPaint, showPaint2, showPaint3, showPaint4, showPaint5, showPaint6,
         hidePaint, hidePaint2, hidePaint3, hidePaint4, hidePaint5, hidePaint6 } from "./ShowAndHide";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

let room;

scene.add(camera);
camera.position.set(-1,3,3);



const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white',3);
directionalLight.position.set(-3, 5, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({alpha: true, antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('white', 1);
document.body.appendChild(renderer.domElement);


const planeGeometry = new THREE.PlaneGeometry(45,45);
const planeMaterial = new THREE.MeshBasicMaterial({
    color:'gray',
    side: THREE.DoubleSide
});

const floor = new THREE.Mesh(planeGeometry,planeMaterial);

floor.rotation.x = -Math.PI / 2; // 90 grados
// floor.rotation.y = -Math.PI; 
scene.add(floor);

const wallGroup = new THREE.Group();
scene.add(wallGroup);

const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({color:'white'})
);

frontWall.position.z = -3.5;

const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({color:'white'})
);

leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -4;


const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 20, 0.001),
    new THREE.MeshBasicMaterial({color:'white'})
);

rightWall.rotation.y = Math.PI / 2;
rightWall.position.x = 5;

const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(85, 20, 0.001),
    new THREE.MeshBasicMaterial({color:'white'})
);

backWall.position.z = 7;

wallGroup.add(frontWall, leftWall, rightWall, backWall);

for(let i = 0; i < wallGroup.children.length; i++){
    wallGroup.children[i].BoundingBox = new THREE.Box3();
    wallGroup.children[i].BoundingBox.setFromObject(wallGroup.children[i]);
 
 }
 
 function checkCollision(){
     const playerBoundingBox = new THREE.Box3();
     const cameraWorldPosition = new THREE.Vector3();
 
     camera.getWorldPosition(cameraWorldPosition);
 
     playerBoundingBox.setFromCenterAndSize(
         cameraWorldPosition,
         new THREE.Vector3(1, 1, 1) 
     );
 
     for(let i = 0; i < wallGroup.children.length; i++){
         const wall = wallGroup.children[i];
         if(playerBoundingBox.intersectsBox(wall.BoundingBox)){
           return true;
         }
      }
      return false;
 }

const loader = new GLTFLoader();

loader.load(
	// resource URL
	'scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {
         room = gltf.scene;
		
		scene.add( room);
	},

	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {

		console.log( 'An error happened' );

	}
);


const controls = new PointerLockControls( camera, document.body );
const playButton = document.getElementById('play_button');
const Button = document.getElementById('play_button3');

function hideMenu(){
      
    const container = document.getElementById('container');
    container.style.display= 'none';
    Button.style.opacity= 1;
}

function showMenu(){
    const menu = document.getElementById('container');
    menu.style.display = 'flex';
    Button.style.opacity= 0;
   
}

function startExperience(){
  controls.lock();
  hideMenu();
  
}


playButton.addEventListener('click', startExperience);

  Button.addEventListener('click', showMenu);
  

const paint1 = createPainting(
    '/1.png',
    0.82,
    0.85,
    new THREE.Vector3(-0.65, 5.3, -3.2),
    'pintura'
);

const paint2 = createPainting(
    '/3.png',
    1.15,
    1.15,
    new THREE.Vector3(1.9, 4.6, -3.2),
    'pintura2'
);
const paint3 = createPainting(
    '/2.png',
    1.15,
    1.15,
    new THREE.Vector3(0.5, 6.0, -3.2),
    'pintura3'
);
const paint4 = createPainting(
    '/4.png',
    1.15,
    1.15,
    new THREE.Vector3(1.9, 6.0, -3.2),
    'pintura4'
); // experiencia

const paint5 = createPainting(
    '/5.png',
    1.15,
    1.15,
    new THREE.Vector3(0.55, 4.6, -3.2),
    'pintura5'
); // educacion
const paint6 = createPainting(
    '/6.png',
    0.82,
    0.85,
    new THREE.Vector3(3.15, 5.3, -3.2),
    'pintura6'
); //contacto
scene.add(paint1, paint2, paint3, paint4, paint5, paint6);


const playButton2 = document.getElementById('play_button2');
playButton2.addEventListener('click', hidePaint);

const playButton4 = document.getElementById('play_button4');
playButton4.addEventListener('click', hidePaint2);

const playButton5 = document.getElementById('play_button5');
playButton5.addEventListener('click', hidePaint3);

const playButton7 = document.getElementById('play_button7');
playButton7.addEventListener('click', hidePaint4);

const playButton8 = document.getElementById('play_button8');
playButton8.addEventListener('click', hidePaint5);

const playButton9 = document.getElementById('play_button9');
playButton9.addEventListener('click', hidePaint6);

  const keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
  };
  
  document.addEventListener(
      'keydown',
      (event) =>{
          if(event.key in keysPressed){
              keysPressed[event.key] = true;
          }
      },
      false
  );
  
  document.addEventListener( 
      'keyup',
      (event) => {
          if(event.key in keysPressed){
              keysPressed[event.key] = false;
          }
      },
     false
  );
  
  
  const clock = new THREE.Clock();
  
  function updateMovement(delta){
    const moveSpeed = 3 * delta;
  
    const previousPosition = camera.position.clone();
  
    if(keysPressed.ArrowRight || keysPressed.d){
        controls.moveRight(moveSpeed);
    }
    if(keysPressed.ArrowLeft || keysPressed.a){
      controls.moveRight(-moveSpeed);
    }
    if(keysPressed.ArrowUp || keysPressed.w){
      controls.moveForward(moveSpeed);
    }
    if(keysPressed.ArrowDown || keysPressed.s){
      controls.moveForward(-moveSpeed);
    }
  
  
    if(checkCollision()){
      camera.position.copy(previousPosition);
   }
  
  
  }


const raycaster = new THREE.Raycaster();

document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event){
    const coords = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
    );

raycaster.setFromCamera(coords, camera);

  const intersections = raycaster.intersectObjects(scene.children, true);
  
  if(intersections.length > 0){
    console.log(intersections);
    const selectedObject = intersections[0].object;
    
     console.log(`${selectedObject.name} was clicked`);
     if(selectedObject.name == "pintura"){
        console.log('htmlll');
        showPaint();
     }
     if(selectedObject.name == "pintura2"){
        console.log('skills');
        showPaint2();
     }
     if(selectedObject.name == "pintura3"){
        console.log('project');
        showPaint3();
     }
     if(selectedObject.name == "pintura4"){
        console.log('experience');
        showPaint4();
     }
     if(selectedObject.name == "pintura5"){
        console.log('study');
        showPaint5();
     }
     if(selectedObject.name == "pintura6"){
        console.log('contact');
        showPaint6();
     }
   }
}


renderer.shadowMap.enabled = true;

function animate() {
	const delta = clock.getDelta();
    updateMovement(delta);

  

    requestAnimationFrame(animate);
    renderer.render(scene, camera);  

}

animate();