import React, { useEffect, useRef, useState, useCallback } from "react"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Line } from "@react-three/drei"
import { Vector3, AdditiveBlending } from 'three'

import "./App.css"

const Lines = ({ stPoint, color }) => {
    // const [ lorenzSystem, setLorenzSystem ] = useState([stPoint])
    const SIGMA = 10
    const RHO   = 28
    const BETA  = 8/3
    
    const DELTA = 0.005 // The delta time to ensure the same result on every device
    const MAX_POINTS = 10000 // Max number of points the line consist of, after that the line collapses into itself
    let number_of_points = 0
    
    const meshRef = useRef()
    const { camera } = useThree()

    const points = []
    points.push(stPoint)

    useEffect(() => {
        meshRef.current.geometry.setFromPoints(points)
        // if(!meshRef.current) return

        // const points = []
        // points.push(stPoint)
    
        // let point = stPoint
    
        //     for (var i=0; i<15000; i++) {
        //         point = new Vector3(
        //             point.x + SIGMA * (point.y - point.x) * DELTA,
        //             point.y + ( (RHO * point.x) - point.y - (point.x * point.z) ) * DELTA,
        //             point.z + ( (point.x * point.y) - (BETA * point.z) ) * DELTA
        //         );
        //         points.push(point);
        //     }
        //     setLorenzSystem(points)

    }, [])

    useFrame(() => {
        const { x, y, z } = points[number_of_points]

        points.push(new Vector3 (
            x + SIGMA * ( y - x ) * DELTA,
            y + (( RHO * x) - y - ( x * z )) * DELTA,
            z + (( x * y ) - ( BETA * z )) * DELTA
        ))
        
        meshRef.current.geometry.setFromPoints(points)

        if(number_of_points > MAX_POINTS) points.splice(0, 1)
        else number_of_points ++
    })

    return (
        // <mesh ref={meshRef}>
        //     <Line ref={meshRef} color={color} lineWidth={1} points={lorenzSystem} transparent={true} depthTest={false} depthWrite={false}/>
        //     <lineBasicMaterial attach="material"/>
        // </mesh>
        <line ref={meshRef} frustumCulled={false} position={[0, 0, 0]}>
            <bufferGeometry attach="geometry"/>
            <lineBasicMaterial attach="material" color={color} transparent={true} depthTest={false} depthWrite={false} blending={AdditiveBlending}/>
        </line>
    )
}

function App() {
    const cameraProps = {
        position: [-100, 0, 50],
        fov: 40,
        far: 1000,
        near: 0.01
    }

    const line_config = [
        {starting_point: new Vector3(0.01, 0.01, 0.01), color: '#d46428'}, // #f58549 
        {starting_point: new Vector3(0.02, 0.01, 0.01), color: '#5af2b5'}, // #f2a65a 
        {starting_point: new Vector3(0.03, 0.01, 0.01), color: '#deac52'}, // #eec170 
    ]

    return (
        <div className="canvas-container">
            <Canvas dpr={[window.devicePixelRatio, 2]} camera={cameraProps}>
                {line_config.map(line => <Lines key={Math.random()} stPoint={line.starting_point} color={line.color}/> )}
                <OrbitControls autoRotate autoRotateSpeed={0.3}/>
            </Canvas>
        </div>
    )
}

export default App;
