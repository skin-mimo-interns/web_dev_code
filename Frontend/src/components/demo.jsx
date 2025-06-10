// SkinPredictor.jsx
import React, { useState } from "react";
import { Client } from "@gradio/client";

const SkinPredictor = () => {
  const [predictedClass, setPredictedClass] = useState("");
  const [confidence, setConfidence] = useState("");
  const [gradCamImage, setGradCamImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setPredictedClass("");
    setConfidence("");
    setGradCamImage("");

    try {
      const client = await Client.connect("tanish090905/new-app-rajavi-code");

      const result = await client.predict("/predict", {
        img: file,
      });

      const [predClass, conf, gradCamBase64] = result.data;

      setPredictedClass(predClass);
      setConfidence(conf);
      setGradCamImage(`data:image/png;base64,${gradCamBase64}`);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Skin Disease Predictor</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>Loading...</p>}

      {!loading && predictedClass && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Predicted Class:</strong> {predictedClass}</p>
          <p><strong>Confidence:</strong> {confidence}</p>
          {gradCamImage && (
            <div>
              <p><strong>GradCAM Image:</strong></p>
              <img
                src={gradCamImage}
                alt="GradCAM"
                style={{ maxWidth: "500px", border: "1px solid #ccc" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkinPredictor;
