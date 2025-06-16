// main.js
import { initScene } from './sceneSetup.js';
import mountain, { updatePosition } from './mountain.js';

const { scene, camera, renderer, controls } = initScene();
scene.add(mountain);

function animate() {
    requestAnimationFrame(animate);
    updatePosition(); // 动态更新山脉顶点
    renderer.render(scene, camera);
    controls.update();
}

animate();
//src/main.js


