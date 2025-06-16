import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

// 创建平面几何体
const geometry = new THREE.PlaneGeometry(300, 300, 50, 60); // 设置分段

// 创建颜色属性
const colors = [];
const positionAttr = geometry.attributes.position;

for (let i = 0; i < positionAttr.count; i++) {
    const y = positionAttr.getY(i);
    
    // 渐变色逻辑：根据 y 值计算
    const t = (y + 250) / 500; // 将 y 映射到 0~1 范围
    const r = 0.5 - 0.5 * t;   // 红色分量渐变，从高到低
    const g = 0.2 + 0.2 * t;   // 绿色分量渐变，保持较低值
    const b = 0.8 + 0.3 * t;   // 蓝色分量渐变，从低到高

    colors.push(r, g, b);
}

geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

// 创建材质
const material = new THREE.MeshBasicMaterial({
    vertexColors: true, // 启用顶点颜色
    wireframe: true, // 显示网格线
});

// 创建网格
const planeMesh = new THREE.Mesh(geometry, material);

// 动画更新函数
export function updatePosition() {
    const positions = geometry.attributes.position;
    const time = Date.now() * 0.002; // 缓存时间变量，减少重复计算
    
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        // 使用噪声和正弦波组合生成高度
        const z = noise2D(x / 100, y / 100) * 50 + Math.sin(time + x * 0.05) * 10;
        positions.setZ(i, z);
    }
    
    positions.needsUpdate = true; // 更新缓冲区
}

// 旋转平面
planeMesh.rotateX(Math.PI / 2); // 绕x轴旋转90度

export default planeMesh;
