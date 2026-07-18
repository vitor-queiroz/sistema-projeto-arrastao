import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHxzGRgrRT7-2a7mZWxbWLQzJsNhRRaJQ",
  authDomain: "sistema-arrastao.firebaseapp.com",
  projectId: "sistema-arrastao",
  storageBucket: "sistema-arrastao.firebasestorage.app",
  messagingSenderId: "975331801526",
  appId: "1:975331801526:web:c18c673fe783170df12917"
};


export const app = initializeApp(firebaseConfig);