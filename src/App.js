/*import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'*/
import * as THREE from 'three'
import { useLayoutEffect, useRef, useState } from 'react'
import { applyProps, Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useBoxProjectedEnv, CubeCamera, Environment, OrbitControls, BakeShadows } from '@react-three/drei'
//import { useControls } from 'leva'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Floor(props) {
  const ref = useRef()
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}>
      <boxGeometry args={[25, 0.1, 25]} />
      <meshStandardMaterial color={'black'} />
    </mesh>
  )
}

/*function Court(props) {
  const { scene, nodes } = useGLTF('/court-transformed.glb')
  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        if (o === nodes.GymFloor_ParquetShader_0) o.parent.remove(o)
        else applyProps(o, { castShadow: true, receiveShadow: true, 'material-envMapIntensity': 0.1 })
      }
    })
  }, [])
  return <primitive object={scene} {...props} />
}

function Floor(props) {
  const { nodes, materials } = useGLTF('/court-transformed.glb')
  const { up, scale, ...config } = useControls({
    up: { value: -0.5, min: -10, max: 10 },
    scale: { value: 27, min: 0, max: 50 },
    roughness: { value: 0.06, min: 0, max: 0.15, step: 0.001 },
    envMapIntensity: { value: 1, min: 0, max: 5 }
  })
  const projection = useBoxProjectedEnv([0, up, 0], [scale, scale, scale])
  return (
    <CubeCamera frames={1} position={[0, 0.5, 0]} rotation={[0, 0, 0]} resolution={2048} near={1} far={1000} {...props}>
      {(texture) => (
        <mesh receiveShadow position={[-13.68, -0.467, 17.52]} scale={0.02} geometry={nodes.GymFloor_ParquetShader_0.geometry} dispose={null}>
          <meshStandardMaterial
            map={materials.ParquetShader.map}
            normalMap={materials.ParquetShader.normalMap}
            normalMap-encoding={THREE.LinearEncoding}
            envMap={texture}
            metalness={0.0}
            normalScale={[0.25, -0.25]}
            color="#aaa"
            {...projection}
            {...config}
          />
        </mesh>
      )}
    </CubeCamera>
  )
}*/

export default function App() {
  /*return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )*/
  return (
    <Canvas frameloop="demand" dpr={[1, 1.5]} shadows camera={{ near: 0.1, far: 40, fov: 75 }}>
      <fog attach="fog" args={['purple', 0, 130]} />
      <ambientLight intensity={0.1} />
      <group position={[0, -1, 0]}>
        <spotLight castShadow intensity={10} angle={0.1} position={[-200, 220, -100]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.000001} />
        <spotLight angle={0.1} position={[-250, 120, -200]} intensity={1} castShadow shadow-mapSize={[50, 50]} shadow-bias={-0.000001} />
        <spotLight angle={0.1} position={[250, 120, 200]} intensity={1} castShadow shadow-mapSize={[50, 50]} shadow-bias={-0.000001} />
        {/*<Court />
        <Floor />*/}
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Floor position={[0, -2, 0]} rotation={[0, 0, 0]} />
      </group>
      <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
      {/*<Environment files="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/noon-grass/noon_grass_1k.hdr" background />*/}
      <BakeShadows />
    </Canvas>
  )
}
