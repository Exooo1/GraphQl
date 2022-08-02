import {buildSchema} from "graphql";

export const schemeQl = buildSchema(
    `type User{
    _id:ID
    name:String!
    age:Int!
    country:String!
   }
   input UserInput{
      _id:ID
    name:String!
    age:Int!
    country:String!
   }
   type Query{
   getAllUsers:[User]
   getUser(_id:ID):User
   }
   type Mutation {
   createUser(input:UserInput):User
   }
   `
)