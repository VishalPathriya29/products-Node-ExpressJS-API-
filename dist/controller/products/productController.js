"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProduct = exports.updateProduct = exports.getProduct = exports.getAllProducts = exports.addProduct = void 0;
const apiResponse = __importStar(require("../../helper/response"));
//modelas
const productModel_1 = __importDefault(require("../../models/productModel"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description } = req.body;
        const product = yield productModel_1.default.create({
            name: name,
            price: price,
            description: description
        });
        if (product) {
            return apiResponse.successResponse(res, "Product added successfully", {});
        }
        else {
            return apiResponse.errorMessage(res, 400, "Failed to add product, please try again");
        }
    }
    catch (error) {
        return apiResponse.somethingWentWrongMsg(res);
    }
});
exports.addProduct = addProduct;
// ===========================================================================
// ===========================================================================
// get all products with pagination
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPage = req.query.page;
        let page = parseInt(getPage);
        if (page === null || page <= 1 || !page)
            page = 1;
        const limit = 10;
        const skipData = (page - 1) * limit;
        const products = yield productModel_1.default.find()
            .select('name price description')
            .skip(skipData)
            .limit(limit);
        if (products) {
            const totalProducts = yield productModel_1.default.countDocuments();
            const totalPages = Math.ceil(totalProducts / limit);
            const resData = {
                productData: products,
                totalPages, page, totalProducts
            };
            return apiResponse.successResponse(res, "Data Retrieved Successfully", resData);
        }
        else {
            return apiResponse.errorMessage(res, 404, "Products not found");
        }
    }
    catch (error) {
        return apiResponse.somethingWentWrongMsg(res);
    }
});
exports.getAllProducts = getAllProducts;
// ===========================================================================
// ===========================================================================
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (!id || id === null)
            return apiResponse.errorMessage(res, 400, "Product id is required");
        const product = yield productModel_1.default.findById(id).select('_id name price description');
        if (product) {
            return apiResponse.successResponse(res, "Product found", product);
        }
        else {
            return apiResponse.errorMessage(res, 404, "Product not found");
        }
    }
    catch (error) {
        return apiResponse.somethingWentWrongMsg(res);
    }
});
exports.getProduct = getProduct;
// ===========================================================================
// ===========================================================================
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, price, description } = req.body;
        const product = yield productModel_1.default.findOne({ _id: _id });
        if (!product)
            return apiResponse.errorMessage(res, 404, "Product not found");
        const updateProduct = yield productModel_1.default.findByIdAndUpdate({ _id: _id }, {
            name: name,
            price: price,
            description: description
        });
        if (updateProduct) {
            return apiResponse.successResponse(res, "Product updated successfully", {});
        }
        else {
            return apiResponse.errorMessage(res, 400, "Failed to update product, please try again");
        }
    }
    catch (e) {
        console.log(e);
        return apiResponse.somethingWentWrongMsg(res);
    }
});
exports.updateProduct = updateProduct;
// ===========================================================================
// ===========================================================================
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // also do searching in getProducts api
        const { search } = req.query;
        const products = yield productModel_1.default.find({ name: { $regex: String(search), $options: 'i' } }).select('name price description');
        if (products) {
            return apiResponse.successResponse(res, "Product found", products);
        }
        else {
            return apiResponse.successResponse(res, "No Data Found", products);
        }
    }
    catch (error) {
        return apiResponse.somethingWentWrongMsg(res);
    }
});
exports.searchProduct = searchProduct;
// ===========================================================================
// ===========================================================================
