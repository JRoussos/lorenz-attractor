import React, { useEffect, useRef, useState } from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Vector3, AdditiveBlending, Euler, Quaternion } from 'three'
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { KernelSize } from 'postprocessing'

import Welcome from "./welcome"
import Music from "./music"

import "./App.css"

const Line = ({ stPoint, color }) => {
    const SIGMA = 10
    const RHO   = 28
    const BETA  = 8/3
    
    const DELTA = 0.004 // The delta time hardcoded to ensure the same result on every device
    const MAX_POINTS = 10000 // Max number of points the line consist of, after that the line collapses into itself
    let number_of_points = 0
    
    const meshRef = useRef()

    const points = []
    points.push(stPoint)

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
        <line ref={meshRef} frustumCulled={false} position={[0, 0, 0]}>
            <bufferGeometry attach="geometry" />
            <lineBasicMaterial attach="material" color={color} transparent={true} depthTest={false} depthWrite={false} blending={AdditiveBlending}/>
        </line>
    )
}

const Lines = () => {
    const rotationEuler = new Euler(0, 0, 0)
    const rotationQuaternion = new Quaternion(0, 0, 0, 0)
    let rotation = 1.5708
    
    const groupRef = useRef()
    const rotate = useRef(true)

    const line_config = [
        {starting_point: new Vector3(0.01, 0.01, 0.01), color: '#d46428'}, // #f58549 
        {starting_point: new Vector3(0.02, 0.01, 0.01), color: '#5af2b5'}, // #f2a65a 
        {starting_point: new Vector3(0.03, 0.01, 0.01), color: '#deac52'}, // #eec170 
    ]

    useFrame(({ camera }) => {
        if( rotate.current ) {
            rotation += 0.001 * (camera.position.z /200) // Slow rotation speed as the user zooms in
 
            rotationEuler.set( rotation, rotation, -0.2239 )
            rotationQuaternion.setFromEuler(rotationEuler)

            groupRef.current.quaternion.slerp(rotationQuaternion, 0.1)
        }

        // groupRef.current.rotation.x += 0.001
        // groupRef.current.rotation.y += 0.001
    })

    useEffect(() => {
        const handleRotation = () => {
            rotate.current = !rotate.current 
        }

        window.addEventListener('keypress',   handleRotation)
        window.addEventListener('touchstart', handleRotation)
        window.addEventListener('touchend',   handleRotation)
    }, [])

    return (
        <group ref={groupRef}>
            {line_config.map(line => <Line key={Math.random()} stPoint={line.starting_point} color={line.color}/> )}
        </group>   
    )
}

const App = () => {
    const [ enter, setEnter ] = useState(false)
    const postprocessing = new URLSearchParams(document.location.search.substring(1))

    const cameraProps = {
        position: [0, 0, 100],
        fov: 40,
        far: 1000,
        near: 0.01
    }

    useEffect(() => {
        console.log("%c'This is a slightly sarcastic greeting title'", "margin: 1em 0; font-style: italic;",`
        Due to performance limitations of most devices, post processing had to disabled by default. 
        If you are one of the bold ones you can enable it by using the '/?post=1' param at the end of the URL, 
        or just click this link: https://lorenz-attractor-visualization.netlify.app/?post=1 and enjoy ✨`)
        window.addEventListener('dblclick', () => {
            if(!document.fullscreenElement) document.getElementById('canvas-container').requestFullscreen()
            else document.exitFullscreen()
        })
    }, [])

    return (
        <div id="canvas-container">
            {enter ?
                <React.Fragment>
                    <Canvas dpr={[window.devicePixelRatio, 2]} camera={cameraProps}>
                        <color attach="background" args={['black']} />
                        <Lines/>
                        <EffectComposer enabled={parseInt(postprocessing.get('post'))}>
                            <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.5} />
                        </EffectComposer>
                        <OrbitControls maxDistance={200} />
                    </Canvas>
                    <Music/>
                </React.Fragment> : 
            <Welcome setEnter={setEnter}/> }
        </div>
    )
}

export default App;
