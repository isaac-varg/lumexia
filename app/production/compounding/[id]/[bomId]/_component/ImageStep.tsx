"use client"
import React, { useRef, useState } from 'react'
import { Camera, CameraType } from "react-camera-pro";


const ImageStep = () => {

  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<null | string>(null);

  const handleCameraClick = () => {
    if (!camera || !camera.current) {
      return
    }

    const image = camera.current.takePhoto() as any
    setImage(image)
  }

  return (
    <div>ImageStep

      <Camera errorMessages={{
        noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
        permissionDenied: 'Permission denied. Please refresh and give camera permission.',
        switchCamera:
          'It is not possible to switch camera to different one because there is only one video device accessible.',
        canvas: 'Canvas is not supported.',
      }} ref={camera} />


      <button onClick={() => handleCameraClick()}>Take photo</button>
      {image &&
        <img src={image} alt='Taken photo' />
      }

    </div>
  )
}

export default ImageStep 
