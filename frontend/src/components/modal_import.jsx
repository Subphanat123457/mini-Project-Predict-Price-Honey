import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
} from "@nextui-org/react";
import axios from "axios";
import Papa from "papaparse";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [serverResponse, setServerResponse] = useState([]);
  const [isPredicting, setIsPredicting] = useState(false);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileRead = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      // Parse CSV file
      Papa.parse(event.target.result, {
        header: true,
        complete: function (results) {
          // Remove last row
          results.data.pop();

          // Convert data to desired format
          const convertedData = results.data.map((item, index) => {
            return {
              index: index, // Add index to each item
              CS: parseFloat(item.CS),
              Density: parseFloat(item.Density),
              WC: parseFloat(item.WC),
              pH: parseFloat(item.pH),
              EC: parseFloat(item.EC),
              F: parseFloat(item.F),
              G: parseFloat(item.G),
              Pollen_analysis: item.Pollen_analysis,
              Viscosity: parseFloat(item.Viscosity),
              Purity: parseFloat(item.Purity),
            };
          });

          // Set selected file name
          setFileName(file.name);

          // Set the server response to empty array
          setServerResponse([]);

          // Start predicting
          setIsPredicting(true);

          // Create an array of promises for each prediction request
          const predictionPromises = convertedData.map((dataItem) => {
            return axios.post("http://localhost:5000/predict", dataItem);
          });

          // Wait for all prediction requests to complete
          Promise.all(predictionPromises)
            .then((responses) => {
              // Process each response
              const responseData = responses.map((response) => response.data);
              setServerResponse(responseData); // Store the server responses
            })
            .catch((error) => {
              console.error("Error sending data to server:", error);
            })
            .finally(() => {
              setIsPredicting(false); // Stop predicting
            });

          console.log("Converted data:", convertedData);
        },
      });
    };

    reader.readAsText(file);
  };

  const handlePredict = async () => {
    try {
      if (!selectedFile) {
        console.log("No file selected.");
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Retrieve JSON data from file
      const jsonData = await axios.get("http://localhost:5000/get_data");
      console.log("JSON Data:", jsonData.data);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const sizes = ["3xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileName("");
    setServerResponse([]);
    onClose();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Button
            className="capitalize font-bold"
            key={size}
            onPress={() => handleOpen(size)}
            color="success"
          >
            Choose file(.csv)
          </Button>
        ))}
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody>
            <ModalHeader>Input file .csv</ModalHeader>
            <div className="flex flex-wrap md:inline-grid md:grid-cols-1 gap-4">
              {["left-end"].map((placement) => (
                <Popover key={placement} placement={placement} color="warning">
                  <PopoverTrigger>
                    <div>
                      <Button
                        color="warning"
                        className="capitalize font-bold"
                        onClick={handleButtonClick}
                      >
                        Choose file(.csv)
                      </Button>
                      <input
                        type="file"
                        onChange={(event) => {
                          handleFileRead(event);
                        }}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        accept=".csv"
                      />
                    </div>
                  </PopoverTrigger>
                </Popover>
              ))}
              {fileName && <p>Selected file: {fileName}</p>}
            </div>
            {isPredicting && <p>Predicting...</p>}
            {serverResponse.map((item, index) => (
              <p key={index}>{JSON.stringify(item)}</p> // Display each item as a string
            ))}
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
