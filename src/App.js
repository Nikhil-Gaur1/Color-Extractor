import React, { useState } from 'react';
import DisplayImage from './components/DisplayImage';
import ColorThief from 'colorthief';
import './styles/Home.module.css'; // Import component-specific styles

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [colorPalette, setColorPalette] = useState(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const img = new Image();
      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 6);
        setUploadedImage(event.target.result);
        setColorPalette(colorPalette);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <header>
        <h1>Palette Color </h1>
        <div className="input">
          <label htmlFor="file">
            <i className="fas fa-images"></i> Upload Image
          </label>
          <input type="file" id="file" hidden onChange={uploadImage} />
        </div>
      </header>
      <main>
        <DisplayImage
          uploadedImage={uploadedImage}
          colorPalette={colorPalette}
        />
      </main>
    </>
  );
}

export default App;