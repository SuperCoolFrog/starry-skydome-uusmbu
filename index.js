import * as THREE from "three";
import { OrbitControls } from "./js/OrbitControls";
import StarrySkyShader from './StarrySkyShader';

var scene = new THREE.Scene();
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
var cameraMain = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
cameraMain.position.z = 1;
var controls = new OrbitControls(cameraMain);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*  ::Starry SkyDome ShaderMaterial :: 
 * 
 * The parameters on this shader can be played around with for different effects. 
 * 
 * Use the offset parameter to shift the noise pattern, avoiding large clusters in places you don't want them. The rest of the parameters are better described visually.
 * 
 */

var skyDomeRadius = 500.01;
var sphereMaterial = new THREE.ShaderMaterial({
  uniforms: {
    skyRadius: { value: skyDomeRadius },
    env_c1: { value: new THREE.Color("#0d1a2f") },
    env_c2: { value: new THREE.Color("#0f8682") },
    noiseOffset: { value: new THREE.Vector3(100.01, 100.01, 100.01) },
    starSize: { value: 0.01 },
    starDensity: { value: 0.09 },
    clusterStrength: { value: 0.2 },
    clusterSize: { value: 0.2 },
  },
  vertexShader: StarrySkyShader.vertexShader,
  fragmentShader: StarrySkyShader.fragmentShader,
  side: THREE.DoubleSide,
})
var sphereGeometry = new THREE.SphereGeometry(skyDomeRadius, 20, 20);
var skyDome = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(skyDome);

function render() {

  requestAnimationFrame(render);
  controls.update()
  renderer.render(scene, cameraMain);

}
render();