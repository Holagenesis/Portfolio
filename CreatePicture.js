import * as THREE from 'three';

export function createPainting(image, width, height, position, name){
    const textureLoader = new THREE.TextureLoader();
    const paintTexture = textureLoader.load(image);
    const paintMaterial = new THREE.MeshBasicMaterial({ map: paintTexture});
    const paintGeometry = new THREE.PlaneGeometry(width, height);
    const Painting = new THREE.Mesh(paintGeometry, paintMaterial);
    Painting.position.set(position.x, position.y, position.z);
    Painting.name = name;
   
    return Painting;
 
 }