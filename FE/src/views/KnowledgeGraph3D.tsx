'use client';
import { useRef, useEffect, useCallback } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

function getMasteryColor(score: number, attempts: number): string {
    if (attempts === 0) return '#6b7280';
    if (score >= 80) return '#22c55e';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
}

export interface Graph3DNode {
    id: string;
    name: string;
    mastery: number;
    attempts: number;
    errorRate: number;
    category: string;
}

export interface Graph3DLink {
    source: string;
    target: string;
    relation: string;
}

interface Props {
    nodes: Graph3DNode[];
    links: Graph3DLink[];
    onNodeClick: (node: Graph3DNode) => void;
    width?: number;
    height?: number;
}

export default function KnowledgeGraph3D({ nodes, links, onNodeClick, width, height = 600 }: Props) {
    const fgRef = useRef<any>(null);
    const rotationRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const fg = fgRef.current;
        if (!fg || nodes.length === 0) return;

        let angle = 0;
        const radius = 350;

        rotationRef.current = setInterval(() => {
            fg.cameraPosition({
                x: radius * Math.sin(angle),
                z: radius * Math.cos(angle),
            });
            angle += Math.PI / 400;
        }, 16);

        return () => {
            if (rotationRef.current) clearInterval(rotationRef.current);
        };
    }, [nodes]);

    const stopRotation = useCallback(() => {
        if (rotationRef.current) {
            clearInterval(rotationRef.current);
            rotationRef.current = null;
        }
    }, []);

    const handleNodeClick = useCallback(
        (node: object) => {
            stopRotation();
            onNodeClick(node as Graph3DNode);
        },
        [onNodeClick, stopRotation],
    );

    const nodeThreeObject = useCallback((node: object) => {
        const n = node as Graph3DNode;
        const color = getMasteryColor(n.mastery, n.attempts);

        const geo = new THREE.SphereGeometry(5.5, 16, 16);
        const mat = new THREE.MeshLambertMaterial({ color, transparent: true, opacity: 0.92 });
        const sphere = new THREE.Mesh(geo, mat);

        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 56;
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, 256, 56);
        ctx.font = 'bold 15px Inter, system-ui, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        const label = n.name.length > 22 ? n.name.slice(0, 20) + '…' : n.name;
        ctx.fillText(label, 128, 36);

        const texture = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
        sprite.scale.set(38, 9, 1);
        sprite.position.set(0, 10, 0);

        const group = new THREE.Group();
        group.add(sphere);
        group.add(sprite);
        return group;
    }, []);

    return (
        <div onMouseDown={stopRotation} onTouchStart={stopRotation}>
            <ForceGraph3D
                ref={fgRef}
                graphData={{ nodes, links }}
                nodeThreeObject={nodeThreeObject}
                nodeThreeObjectExtend={false}
                nodeLabel={(n: object) => {
                    const node = n as Graph3DNode;
                    return `${node.name}<br/>${node.attempts > 0 ? `Mastery: ${Math.round(node.mastery)}% · Error: ${Math.round(node.errorRate)}%` : 'Not attempted'}`;
                }}
                linkColor={(l: object) => ((l as Graph3DLink).relation === 'PREREQUISITE' ? '#6366f1' : '#374151')}
                linkWidth={(l: object) => ((l as Graph3DLink).relation === 'PREREQUISITE' ? 1.5 : 0.8)}
                linkDirectionalParticles={(l: object) => ((l as Graph3DLink).relation === 'PREREQUISITE' ? 2 : 0)}
                linkDirectionalParticleSpeed={0.005}
                linkDirectionalParticleColor={() => '#818cf8'}
                onNodeClick={handleNodeClick}
                backgroundColor="#0d1117"
                width={width}
                height={height}
                showNavInfo={false}
            />
        </div>
    );
}
