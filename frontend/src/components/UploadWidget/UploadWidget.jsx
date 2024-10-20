import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "YOUR_CLOUD_NAME",
        uploadPreset: "YOUR_UPLOAD_PRESET",
        sources: ["local", "url"],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
  }, []);

  // Retornar el JSX con el botón.
  return (
    <Button
      sx={{ mt: 2 }}
      variant="contained"
      startIcon={<CloudUploadIcon />}
      onClick={() => {
        widgetRef.current.open();
      }}
    >
      Upload Image
    </Button>
  );
};
