import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";

interface UploadFormHook {
  isSuccess: boolean;
  progress: number;
  uploadForm: (formData: FormData) => Promise<void>;
}

export const useUploadForm = (url: string): UploadFormHook => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadForm = async (formData: FormData): Promise<void> => {
    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        /**
         * This function is called when there is progress in the file upload.
         * It calculates the progress percentage and updates the state variable.
         * @param {ProgressEvent} progressEvent - The progress event object.
         */
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (
            progressEvent.total !== null &&
            progressEvent.total !== undefined
          ) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(progress);
          }
        },
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if (
            progressEvent.total !== null &&
            progressEvent.total !== undefined
          ) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(progress);
          }
        },
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error occurred during form upload:", error);
    }
  };

  return { uploadForm, isSuccess, progress };
};
