import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

class SchemaValidator {
    validateSchema (schema: ZodTypeAny) {
        return (req: Request, res: Response, next: NextFunction): void | Response => {
            const toValidate = req.body;
            const validated = schema.parse(toValidate);
            
            req.body = validated;
            return next();
        };
    }
}

export { SchemaValidator };