import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const collectionRef = collection(db, "products");

export const fetchProducts = async () => {
  const snapshot = await getDocs(collectionRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createProduct = async (product) => {
  const docRef = await addDoc(collectionRef, product);
  return { id: docRef.id, ...product };
};

export const updateProductById = async (id, product) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, product);
};

export const deleteProductById = async (id) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};
