import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Obtener rol y otros datos desde Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No se encontró el usuario en Firestore");
    }

    const userData = docSnap.data();

    return {
      uid: user.uid,
      email: user.email,
      role: userData.role,
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
    throw error;
  }
};
