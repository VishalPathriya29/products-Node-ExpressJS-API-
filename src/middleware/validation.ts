import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import * as apiResponse from '../helper/response'

const validationCheck = async (value: any) => {
    let msg = value.error.details[0].message;
    console.log(msg);

    msg = msg.replace(/"/g, "");
    msg = msg.replace('_', " ");
    msg = msg.replace('.', " ");

    const errorMessage = "Validation error : " + msg;
    return errorMessage;
}

// ===========================================================================

export const addProductValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        price: Joi.number().min(1).required(),
        description: Joi.string().required(),
    });
    const value = schema.validate(req.body);

    if (value.error) {
        const errMsg = await validationCheck(value);
        return await apiResponse.validationErrorWithData(res, errMsg);
    }
    next();
};

// ===========================================================================
// ===========================================================================

export const updateProductValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().min(2).required(),
        price: Joi.number().min(1).required(),
        description: Joi.string().required(),
    });
    const value = schema.validate(req.body);

    if (value.error) {
        const errMsg = await validationCheck(value);
        return await apiResponse.validationErrorWithData(res, errMsg);
    }
    next();
};

// ===========================================================================
// ===========================================================================

