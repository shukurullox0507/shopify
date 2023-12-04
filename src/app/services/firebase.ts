import {initializeApp} from "firebase/app"
import "firebase/auth"
import "firebase/analytics"
import { initializeAppCheck } from "firebase/app-check";
import { getAuth } from "firebase/auth";

const config ={
    apiKey: "AIzaSyCeLVvbYYEACkXla0UVH0SFW_S02dpj9r4",
    authDomain: "smart-shop-3f0e1.firebaseapp.com",
    projectId: "smart-shop-3f0e1",
    storageBucket: "smart-shop-3f0e1.appspot.com",
    messagingSenderId: "861367623147",
    appId: "1:861367623147:web:78c924cd3303470e290dae",
    measurementId: "G-7K05XDTEJ3"
}

export const app = initializeApp(config);

export default function initFirebase(){
    return app;
}
export const auth = getAuth()