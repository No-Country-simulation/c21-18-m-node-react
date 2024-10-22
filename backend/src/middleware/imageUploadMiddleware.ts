import multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import { cloudinary } from "../config/cloudinaryConfig";

// import { cloudinary } from "@/config/cloudinaryConfig";

// Configurar multer para la carga de fotos
const uploadPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20_000_000 },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images"));
    }
  },
});

// Función para subir a Cloudinary usando un buffer
const uploadToCloudinary = (
  buffer: Buffer,
  options: Record<string, unknown> = {}
): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
};

// Middleware para redimensionar y subir imágenes
const resizeAndUploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.file) return next();
  try {
    const result = await uploadToCloudinary(req.file.buffer, {
      transformation: [
        { width: 800, height: 800, crop: "fill", quality: "auto:good" },
      ],
    });
    req.imageUrls = [result.url];
    next();
  } catch (error) {
    next(error);
  }
};

export { uploadPhoto, resizeAndUploadImage };
