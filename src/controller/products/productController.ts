import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import * as apiResponse from '../../helper/response';
import { utcDate } from '../../helper/utility';
import * as utility from "../../helper/utility";

//modelas
import productModel from '../../models/productModel';

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description } = req.body;
        const product = await productModel.create({
            name: name,
            price: price,
            description: description
        });
        if (product) {
            return apiResponse.successResponse(res, "Product added successfully", {});
        } else {
            return apiResponse.errorMessage(res, 400, "Failed to add product, please try again");
        }
    } catch (error) {
        return apiResponse.somethingWentWrongMsg(res);
    }
}

// ===========================================================================
// ===========================================================================

// get all products with pagination
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const getPage: any = req.query.page;
        let page: number = parseInt(getPage);
        if (page === null || page <= 1 || !page) page = 1;

        const limit: number = 10;
        const skipData = (page - 1) * limit;

        const products = await productModel.find()
            .select('name price description')
            .skip(skipData)
            .limit(limit);
        if (products) {
            const totalProducts = await productModel.countDocuments();

            const totalPages = Math.ceil(totalProducts / limit);
            const resData = {
                productData: products,
                totalPages, page, totalProducts
            }
            return apiResponse.successResponse(res, "Data Retrieved Successfully", resData);
        } else {
            return apiResponse.errorMessage(res, 404, "Products not found");
        }
    } catch (error) {
        return apiResponse.somethingWentWrongMsg(res);
    }
}

// ===========================================================================
// ===========================================================================

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        if (!id || id === null) return apiResponse.errorMessage(res, 400, "Product id is required");

        const product = await productModel.findById(id).select('_id name price description');
        if (product) {
            return apiResponse.successResponse(res, "Product found", product);
        } else {
            return apiResponse.errorMessage(res, 404, "Product not found");
        }
    } catch (error) {
        return apiResponse.somethingWentWrongMsg(res);
    }
}

// ===========================================================================
// ===========================================================================

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { _id, name, price, description } = req.body;

        const product = await productModel.findOne({ _id: _id });
        if (!product) return apiResponse.errorMessage(res, 404, "Product not found");

        const updateProduct = await productModel.findByIdAndUpdate({ _id: _id }, {
            name: name,
            price: price,
            description: description
        });

        if (updateProduct) {
            return apiResponse.successResponse(res, "Product updated successfully", {});
        } else {
            return apiResponse.errorMessage(res, 400, "Failed to update product, please try again");
        }

    } catch (e) {
        console.log(e);
        return apiResponse.somethingWentWrongMsg(res);
    }
}

// ===========================================================================
// ===========================================================================

export const searchProduct = async (req: Request, res: Response) => { 
    try {
        // also do searching in getProducts api
        const { search } = req.query;

        const products = await productModel.find({ name: { $regex: String(search), $options: 'i' } }).select('name price description');
        if (products) {
            return apiResponse.successResponse(res, "Product found", products);
        } else {
            return apiResponse.successResponse(res, "No Data Found", products)
        }
    } catch (error) {
        return apiResponse.somethingWentWrongMsg(res);
    }
}

// ===========================================================================
// ===========================================================================
