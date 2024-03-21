import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export const authAPI = {
    signUp (email, password) {
        debugger
        return createUserWithEmailAndPassword(auth, email, password)
    },
    signIn (email, password) {
        debugger
        return signInWithEmailAndPassword(auth, email, password)
    },
    signOut () {
        debugger
        return signOut(auth)
    }
}
