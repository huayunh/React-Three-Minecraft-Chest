import React, { Suspense, useState } from 'react';
//Styles
import './assets/styles/App.scss';
// Three
import { Canvas, useThree } from 'react-three-fiber';
import Lights from './components/Three/lights';
import Floor from './components/Three/floor';
import { softShadows, Loader, OrbitControls } from '@react-three/drei';
// Model
import Model from './components/Three/chest';
import { useSpring } from '@react-spring/three';

softShadows();

// on load zoom animation

const ZoomWithOrbital = () => {
    const { gl, camera } = useThree();
    useSpring({
        from: {
            z: 30,
        },
        to: {
            x: -5,
            y: 4,
            z: 4,
        },
        onFrame: ({ x, y, z }) => {
            camera.position.x = x;
            camera.position.y = y;
            camera.position.y = z;
        },
    });
    return <OrbitControls enableZoom={false} enablePan={false} target={[0, 0, 0]} args={[camera, gl.domElement]} />;
};

const App = () => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Canvas colorManagement shadowMap camera={{ position: [-5, 4, 4], fov: 40 }}>
                <Lights />
                <Suspense fallback={null}>
                    <Model open={open} setOpen={setOpen} />
                    <Floor />
                    <ZoomWithOrbital />
                </Suspense>
                <Loader />
            </Canvas>
        </>
    );
};

export default App;
