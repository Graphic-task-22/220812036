import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function initScene() {
    // 初始化场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // 设置背景颜色为黑色

    // 初始化相机
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(60, aspectRatio, 1, 1000);
    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 添加光源
    // 环境光更亮
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // 点光源打在图表侧面
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(200, 150, 100);
    scene.add(pointLight);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 返回初始化后的对象
    return { scene, camera, renderer, controls };
}