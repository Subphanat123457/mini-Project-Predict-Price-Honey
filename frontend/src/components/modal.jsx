import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [formData, setFormData] = useState({}); // replace {} with your initial form data
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    // Send values to the model
    const response = await axios.post(
      "http://localhost:5000/predict",
      formData
    );

    // Receive values that the model sends back
    const prediction = response.data;

    setPrediction(prediction);

    // Do something with the prediction
    console.log(prediction);
  };

  const sizes = ["3xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const handleReset = () => {
    // reset all form data
    setFormData({});
    setPrediction(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 ">
        {sizes.map((size) => (
          <Button
            className="capitalize font-bold"
            key={size}
            onPress={() => handleOpen(size)}
            color="success"
          >
            Use Model
          </Button>
        ))}
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        {/* feature 'CS', 'Density', 'WC', 'pH', 'EC', 'F', 'G', 'Pollen_analysis', 'Viscosity', 'Purity' */}

        <ModalContent>
          <ModalBody>
            <ModalHeader>Model Input</ModalHeader>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="CS"
                onChange={(e) =>
                  setFormData({ ...formData, CS: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Density"
                onChange={(e) =>
                  setFormData({ ...formData, Density: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="WC"
                onChange={(e) =>
                  setFormData({ ...formData, WC: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="pH"
                onChange={(e) =>
                  setFormData({ ...formData, pH: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="EC"
                onChange={(e) =>
                  setFormData({ ...formData, EC: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="F"
                onChange={(e) =>
                  setFormData({ ...formData, F: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="G"
                onChange={(e) =>
                  setFormData({ ...formData, G: e.target.value })
                }
              />
              {/* create select Clover, Wildflower, Orange Blossom, Alfalfa, Acacia, Lavender, Eucalyptus, Buckwheat, Manuka, Sage, Sunflower, Borage, Rosemary, Thyme, Heather, Tupelo, Blueberry, Chestnut, and Avocado. */}
              <select
                onChange={(e) =>
                  setFormData({ ...formData, Pollen_analysis: e.target.value })
                }
                value={formData.Pollen_analysis || ""}
              >
                <option value="" disabled>
                  Select pollen analysis
                </option>
                <option value="Clover">Clover</option>
                <option value="Wildflower">Wildflower</option>
                <option value="Orange Blossom">Orange Blossom</option>
                <option value="Alfalfa">Alfalfa</option>
                <option value="Acacia">Acacia</option>
                <option value="Lavender">Lavender</option>
                <option value="Eucalyptus">Eucalyptus</option>
                <option value="Buckwheat">Buckwheat</option>
                <option value="Manuka">Manuka</option>
                <option value="Sage">Sage</option>
                <option value="Sunflower">Sunflower</option>
                <option value="Borage">Borage</option>
                <option value="Rosemary">Rosemary</option>
                <option value="Thyme">Thyme</option>
                <option value="Heather">Heather</option>
                <option value="Tupelo">Tupelo</option>
                <option value="Blueberry">Blueberry</option>
                <option value="Chestnut">Chestnut</option>
                <option value="Avocado">Avocado</option>
              </select>

              <input
                type="text"
                placeholder="Viscosity"
                onChange={(e) =>
                  setFormData({ ...formData, Viscosity: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Purity"
                onChange={(e) =>
                  setFormData({ ...formData, Purity: e.target.value })
                }
              />
            </div>
            {/* Show prediction when available */}
            {prediction && <div>Prediction: {prediction}</div>}
          </ModalBody>
          <ModalFooter>
            <Button color="error" onPress={handleReset}>
              Reset
            </Button>
            <Button color="error" onPress={onClose}>
              Cancel
            </Button>
            <Button color="success" onPress={handlePredict}>
              Predict
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
