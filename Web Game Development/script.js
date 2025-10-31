import * as THREE from "three";
import { OrbitControls } from 'https://unpkg.com/three@0.169.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://unpkg.com/three@0.169.0/examples/jsm/loaders/GLTFLoader.js";
 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader().setPath("Resources/Models");
let upstate = false;
let downstate = false;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );  //Create a box geometry
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );    //Create a basic material
const cube = new THREE.Mesh( geometry, material );  //Create mesh
cube.position.x = 5;
cube.position.y = 15;
scene.add( cube );  //Add mesh to the scene

const enemyCube = new THREE.Mesh(geometry, material);
enemyCube.position.x = -10;
scene.add(enemyCube);

const geometry2 = new THREE.BoxGeometry( 3, 1, 1 );  //Create a box geometry
const material2 = new THREE.MeshPhongMaterial( { color: 0xff6666 } );    //Create a basic material
const cube2 = new THREE.Mesh( geometry2, material2 );  //Create mesh
cube2.position.x = 0;
cube2.position.y = 3;
scene.add(cube2);  //Add mesh to the scene

/*const geometry3 = new THREE.CylinderGeometry( 1, 1, 4, 6 ); 
const material3 = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const cylinder = new THREE.Mesh( geometry3, material3 ); 
scene.add( cylinder );
cylinder.position.x = 8;*/

let group = new THREE.Group();
group.add(cube);
group.add(cube2);

scene.add(group);


//GLTF Loader
    let heliObj;
    loader.load(
      '/low_poly_helicopter.glb'

      ,
      
      (gltf)=>
        {
          heliObj = gltf.scene;
          heliObj.scale.set(0.3, 0.3, 0.3);
          scene.add(heliObj);
        }
      
      ,

      (xhr)=>
        {
          console.log((xhr.loaded/xhr.total *100) + '%loaded');
        }
        
      ,

      (error)=>
        {
          console.log("There is an error when loading GLTF" + error);
        }
    )

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

let controls;
camera.position.set( 0, 0, 10 );

const updateCoords=()=>
  {
    document.getElementById("coords").innerText = "(" + (group.position.x).toFixed(2) + "," + (group.position.y).toFixed(2) + "," + (group.position.z).toFixed(2) + ")";
    document.getElementById("coords").innerText = "(" + (heliObj.position.x).toFixed(2) + "," + (heliObj.position.y).toFixed(2) + "," + (heliObj.position.z).toFixed(2) + ")";
  }


function animate()  //An animation loop will create a loop that causes the 
                    //renderer to draw the scene every time the screen is 
                    //refreshed (on a typical screen this means 60 times per second). 
 {
  group.rotation.x += 0.01;
  group.rotation.y += 0.01;
 

  /*if(group.position.y <=5)
    {
      if(upstate)
        {
          group.position.y += 0.02;
        }
        
      if(downstate)
        {
          group.position.y -= 0.02;
        }
    }*/
   if(heliObj != null)
   { 
    updateCoords();
    if(heliObj.position.y <=5)
    {
      if(upstate)
        {
          heliObj.position.y += 0.02;
        }
        
      if(downstate)
        {
          heliObj.position.y -= 0.02;
        }
    }
  }
  
  controls.update();
  renderer.render( scene, camera ); //We need to render the scene to make everything visible
 }


function onWindowResize()           //A function that will be called every time the window gets resized
{
  camera.aspect = window.innerWidth / window.innerHeight;   //Sets the aspect ration to match the new browser window aspect ratio
  camera.updateProjectionMatrix();                          //Update the camera's frustum
  renderer.setSize(window.innerWidth, window.innerHeight)   //Update size of renderer and canvas
}

window.addEventListener( 'resize', onWindowResize);


//create skybox function
const createskybox = ()=>
  {
    let bgMesh;
    
    const loader  = new THREE.TextureLoader();
    loader.load('Resources/Images/skybox.jpg',function(texture)
    {
      let sphereGeometry = new THREE.SphereGeometry(100, 60, 40);     //Create a sphere
      let sphereMaterial  = new THREE.MeshBasicMaterial               //Set up the sphere texture and make sure it is double sided
      ({
        map: texture,
        side: THREE.DoubleSide
      })
      
      sphereGeometry.scale(-1, 1, 1);                                 //Scale the sphere
      
      bgMesh = new THREE.Mesh(sphereGeometry,sphereMaterial );
      scene.add(bgMesh);
      bgMesh.position.set(0,0,0);
    })
  }
  
  createskybox();                                                     //Call the skybox fuction

  const createControls=()=>                                           //Create control function
  {
    controls = new OrbitControls(camera, renderer.domElement);         //Initiate the control
    controls.update()                                                 //Update the control
  }

  createControls();

  const moveUp=()=>
    {
      upstate = true;
      downstate = false;
    }
  
  const moveDown=()=>
    {
      upstate = false;
      downstate = true;
    }

    document.getElementById("upbutton").addEventListener("click", moveUp);
    document.getElementById("downbutton").addEventListener("click", moveDown);

    