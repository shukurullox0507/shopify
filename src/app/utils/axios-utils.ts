import axios from "axios";
import { error } from "console";

const client = axios.create({baseURL:'https://fakestoreapi.com'})

export const request = ({...options})=>{
    client.defaults.headers.common.Authorization = "Bearer Token"
    const onSuccess = (response:any)=>response
    const onError = (error:any)=> {
        return error
    }
    
    return client(options).then(onSuccess).catch(onError)
}