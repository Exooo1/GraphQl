import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {arrayRoutes, corsConfig} from './indexConfig';
import vhost from 'vhost'
import {graphqlHTTP} from 'express-graphql'
import {apiVhost} from './Components/Vhost/vhost';
import {NextFunction} from "express/ts4.0";
import {schemeQl} from "./Components/Graphql/GraphqlScheme";
import {root} from "./Components/Graphql/GraphqlMutation";

dotenv.config();
const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schemeQl,
        graphiql: true,
        rootValue: root
    })
)
const api = express()
app.use(express.json())
app.use(vhost('api.*', api))
api.use(apiVhost)
app.use(corsConfig)
arrayRoutes.some(item => {
    app.use(item)
})
const PORT = process.env.PORT || 3000;


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useFindAndModify: true})
        app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.hostname !== 'localhost') res.redirect(303, 'http://localhost:8080/')
            next()

        })
        app.get('/', (req: Request, res: Response) => {
            res.send('This main page in GraphQl');
        });
        app.listen(PORT, () => {
            console.log('Start is start!');
        });
        app.use((req: Request, res: Response) => res.status(500))
    } catch (err) {
        throw new Error('Server don\'t work...' + err)
    }
}

start()
