# 3D_POINTS
Dev Three.js, affichage de model 3D en nuage de points.

 [Projet sans nom.webm](https://user-images.githubusercontent.com/34337152/218484636-1ccac48c-8c87-4199-ae4a-5bd5cc012769.webm)

## Sources
 - Librairie WebGL [Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Installation)
 - Outil de benchmarking [Stats.js](https://github.com/mrdoob/stats.js/)
 
## Fontionnement actuel
Model glb généré avec des éléments placés à chaque vertices et des animations. 
Chargement du fichier .glb avec [THREE.GLTFLoader()](https://threejs.org/docs/index.html?q=gltf#examples/en/loaders/GLTFLoader). 
Pour chaque vertices ajout d'un point, donc une géometrie THREE.BufferGeometry et d'un mesh THREE.Points

## Fonctionnement futur ou piste
Implémentation de [shaders](https://threejs.org/docs/index.html?q=shader#api/en/materials/ShaderMaterial) afin de modifier directement la texture de points plutôt que d'utiliser des animations générées par un logiciel 3D