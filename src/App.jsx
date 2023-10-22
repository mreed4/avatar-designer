import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const defaultImages = ["https://picsum.photos/id/237/300", "https://picsum.photos/id/238/300", "https://picsum.photos/id/239/300"];
  const [image, setImage] = useState("https://placehold.co/300");
  const [borderColor, setBorderColor] = useState("#ff0000");
  const [borderRadius, setBorderRadius] = useState(1);

  useEffect(() => {
    const storedBorderRadius = localStorage.getItem("borderRadius");
    const storedBorderColor = localStorage.getItem("borderColor");
    const storedImage = localStorage.getItem("image");
    if (storedBorderRadius) {
      setBorderRadius(storedBorderRadius);
    }
    if (storedBorderColor) {
      setBorderColor(storedBorderColor);
    }
    if (storedImage !== "https://placehold.co/300") {
      setImage(storedImage);
    }
  }, []);

  function handleImageChange(n) {
    setImage(defaultImages[n]);
    storeImage();
  }

  function storeBorderRadius() {
    localStorage.setItem("borderRadius", borderRadius);
  }

  function storeBorderColor() {
    localStorage.setItem("borderColor", borderColor);
  }

  function storeImage() {
    localStorage.setItem("image", image);
  }

  return (
    <>
      <h1>Avatar Designer</h1>
      <p>Upload your image or try one of the provided options:</p>
      <img
        src={image}
        className="avatar"
        alt="avatar"
        style={{ borderColor, borderWidth: 4, borderStyle: "solid", borderRadius: `${borderRadius}rem` }}
      />
      <div>
        <button onClick={() => handleImageChange(0)}>Image 1</button>
        <button onClick={() => handleImageChange(1)}>Image 2</button>
        <button onClick={() => handleImageChange(2)}>Image 3</button>
      </div>
      <input type="file" accept="image/*" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
      <label htmlFor="borderColor">Choose border color:</label>
      <input type="color" onChange={(e) => setBorderColor(e.target.value)} value={borderColor} onBlur={storeBorderColor} />
      <label htmlFor="borderRadius">Adjust border radius:</label>
      <input
        type="range"
        min="1"
        max="3"
        step="0.25"
        onChange={(e) => setBorderRadius(e.target.value)}
        onBlur={storeBorderRadius}
        value={borderRadius}
      />{" "}
      <input
        type="number"
        onChange={(e) => setBorderRadius(e.target.value)}
        onBlur={storeBorderRadius}
        value={borderRadius}
        min="1"
        max="3"
        step="0.25"
      />{" "}
      rem
    </>
  );
}

export default App;
