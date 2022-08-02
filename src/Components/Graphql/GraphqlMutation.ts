import {userModel} from "../User/userScheme";
import {getUsers} from "../Controll/User";


export const root = {
    getAllUsers: getUsers,
    // getUser: async (_id: string) => {
    //     console.log(_id)
    //     const result = await userModel.find({_id})
    //     console.log(result)
    //     return result[0]
    // },
    // createUser: async ({input}) => {
    //     const user = new userModel(input);
    //     await user.save();
    //     return user
    // }
}

