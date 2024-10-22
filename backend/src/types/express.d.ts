import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      imageUrls?: string[]; // Agrega esta línea para extender la interfaz Request
    }
  }
}

export {};
