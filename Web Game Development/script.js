import * as THREE from "three";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );  //Create a box geometry
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );    //Create a basic material
const cube = new THREE.Mesh( geometry, material );  //Create mesh
cube.position.x = 0;
scene.add( cube );  //Add mesh to the scene

const geometry2 = new THREE.BoxGeometry( 3, 1, 1 );  //Create a box geometry
const material2 = new THREE.MeshBasicMaterial( { color: 0xff6666 } );    //Create a basic material
const cube2 = new THREE.Mesh( geometry2, material2 );  //Create mesh
cube2.position.x = 5;
scene.add(cube2);  //Add mesh to the scene

/*const geometry3 = new THREE.CylinderGeometry( 1, 1, 4, 6 ); 
const material3 = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const cylinder = new THREE.Mesh( geometry3, material3 ); 
scene.add( cylinder );
cylinder.position.x = 8;*/

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

camera.position.z = 10;   //Change camera position

function animate()  //An animation loop will create a loop that causes the 
                    //renderer to draw the scene every time the screen is 
                    //refreshed (on a typical screen this means 60 times per second). 

 {

  cube.rotation.x += 0.01;  //Rotate on x axis
  cube.rotation.y += 0.01;  //Rotate on y axis
  cube2.rotation.x += 0.03;  //Rotate on x axis
  cube2.rotation.y += 0.03;  //Rotate on y axis
  //cylinder.rotation.x += 0.05;  //Rotate on x axis
  //cylinder.rotation.y += 0.05;  //Rotate on y axis
  
  if(cube.position.x <=8)
    {
        cube.position.x +=0.5;
    }

    if(cube2.position.x <=8)
    {
        cube2.position.x +=0.5;
    }
    
    /*if(cylinder.position.x <=10)
    {
        cylinder.position.x +=0.5;
    }*/
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
    controls = new OrbitControl(camera, renderer.domElement);         //Initiate the control
    controls.update()                                                 //Update the control
  }

  createControls();