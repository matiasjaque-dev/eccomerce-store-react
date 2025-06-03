import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  console.log(snapshot.docs.map((doc) => doc.data()));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
