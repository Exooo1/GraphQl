import {userModel} from "../User/userScheme";
import {Request, Response} from "express";

export const getUsers = async (req: Request, res: Response,) => {
    try {
        const result = await userModel.find()
        return  result
    } catch (err) {
        return {resultCode:0,error: err}
    }
}