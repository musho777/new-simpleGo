import React, { useCallback, useEffect, useRef, useState } from 'react';

import Cropper from 'react-easy-crop';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { notifyError } from 'utils/notifyConfig';

import {
  CameraContainer,
  ChildWrapper,
  Controls,
  CropContainer,
  Dropdown,
  DropdownItem,
  HiddenInput,
  Icon,
  PlusMinus,
  Row,
  Slider,
  SliderWrapper,
  Video,
} from './ImageUpload.styles';
import attach from './attach.svg';
import camera from './camera.svg';
import minus from './minus.svg';
import plus from './plus.svg';

const ImageUpload = ({ children, onUpload, isDropdownOpen, setIsDropdownOpen }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const userIconRef = useRef(null);
  const fileInputRef = useRef(null);

  const [stream, setStream] = useState(null);

  const onFileChange = (e) => {
    const file = e.target?.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        notifyError('Only image files are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imageElement = new Image();

    imageElement.src = image;

    imageElement.onload = () => {
      const { width, height } = croppedAreaPixels;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        imageElement,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        width,
        height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          notifyError('Failed to create image blob');
          return;
        }

        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });

        onUpload(file);

        setIsModalOpen(false);
        setImage(null);
      }, 'image/jpeg');
    };
  };

  const handleAttachPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setCameraMode(true);
    } catch (error) {
      notifyError('Camera access denied or unavailable');
    }
  };

  useEffect(() => {
    if (cameraMode && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [cameraMode, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraMode(false);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/jpeg');
    setImage(dataURL);
    stopCamera();
    setIsModalOpen(true);
  };

  const handleClickOutside = useCallback((event) => {
    if (!event.target.closest('#dropdown-container')) {
      setIsDropdownOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, handleClickOutside, handleKeyDown]);

  const renderDropdown = () => (
    <Dropdown>
      <DropdownItem id="dropdown-container" onClick={handleAttachPhotoClick}>
        <Icon src={attach} alt="Attach icon" className="menu-icon" />
        Attach Photo
        <HiddenInput
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
      </DropdownItem>
      <DropdownItem id="dropdown-container" onClick={startCamera}>
        <Icon src={camera} alt="l" className="menu-icon" />
        Take a photo
      </DropdownItem>
    </Dropdown>
  );

  return (
    <>
      <ChildWrapper ref={userIconRef}>
        {children}
        {isDropdownOpen && renderDropdown()}
      </ChildWrapper>

      {isModalOpen && !cameraMode && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="693px">
          <CropContainer>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </CropContainer>
          <Controls>
            <SliderWrapper>
              <PlusMinus src={minus} alt="m" />
              <Slider
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />
              <PlusMinus src={plus} alt="p" />
            </SliderWrapper>
            <Row>
              <Button outlined onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button secondary onClick={cropImage}>
                Save
              </Button>
            </Row>
          </Controls>
        </Modal>
      )}

      {cameraMode && (
        <Modal isOpen={cameraMode} onClose={stopCamera} width="693px">
          <CameraContainer>
            <Video ref={videoRef} autoPlay playsInline />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <Row>
              <Button outlined onClick={stopCamera}>
                Cancel
              </Button>
              <Button secondary onClick={capturePhoto}>
                Capture
              </Button>
            </Row>
          </CameraContainer>
        </Modal>
      )}
    </>
  );
};

export default ImageUpload;
