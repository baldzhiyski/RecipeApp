import { useId } from "react";

interface FileUploadProps {
  children: React.ReactNode;
  className?: string;
  allowedTypes?: string[];
  maxSize?: number;
  dimensions?: string;
  onFileSelect: (file: File) => void;
  onValidationError?: (error: string) => void;
  disabled?: boolean;
}

export default function FileUpload({
                                     children,
                                     className = "",
                                     maxSize,
                                     allowedTypes,
                                     dimensions,
                                     disabled = false,
                                     onValidationError,
                                     onFileSelect,
                                   }: FileUploadProps) {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation checks
    if (maxSize && file.size > maxSize) {
      onValidationError?.("File is too large.");
      return;
    }

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      onValidationError?.("Invalid file type.");
      return;
    }

    if (dimensions) {
      const [expectedWidth, expectedHeight] = dimensions.split("x").map(Number);
      const img = new Image();
      img.src = URL.createObjectURL(file);

      // Asynchronous image dimension validation
      img.onload = () => {
        if (img.width !== expectedWidth || img.height !== expectedHeight) {
          onValidationError?.("Invalid image dimensions.");
        } else {
          onFileSelect(file);
        }
      };

      img.onerror = () => onValidationError?.("Error loading image.");
      return; // Don't proceed until the image dimensions are validated
    }

    // If all validations pass, pass the file to the callback
    onFileSelect(file);
  };

  return (
    <div className={`file-upload-wrapper ${className}`}>
      <label htmlFor={id} className={`cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        {children}
      </label>
      <input
        type="file"
        id={id}
        className="hidden"
        encType="multipart/form-data"
        disabled={disabled}
        onChange={handleChange}
        accept={allowedTypes?.join(",")}
        multiple={false}
      />
    </div>
  );
}
