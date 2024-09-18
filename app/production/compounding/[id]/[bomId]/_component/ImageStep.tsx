"use client"
import React, { useRef, useState } from 'react'
import { Camera } from "react-camera-pro";


const ImageStep = () => {

  const camera = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <div>ImageStep

      <Camera errorMessages={{
        noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
        permissionDenied: 'Permission denied. Please refresh and give camera permission.',
        switchCamera:
          'It is not possible to switch camera to different one because there is only one video device accessible.',
        canvas: 'Canvas is not supported.',
      }} ref={camera} />
      <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
      { image && 
      <img src={image} alt='Taken photo' />
      }
    </div>
  )
}

export default ImageStep 
