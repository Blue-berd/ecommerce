import { validationResult } from "express-validator";
import Product from "./ProductModel.js";
export const validateProductSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const result = Product.validateSync(req.body);
  if (result.error) {
    return res.status(400).json({ message: validationResult.error.details });
  }

  next();
};
