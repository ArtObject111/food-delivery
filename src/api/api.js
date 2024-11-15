import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
}                                      from "firebase/auth";
import { auth, db }                    from "../firebase";
import { addDoc, collection, getDocs, 
    limit, query, startAfter, where }         from "firebase/firestore";
import _ from "lodash";

export const authAPI = {
    signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    },
    signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    },
    signOut() {
        return signOut(auth)
    }
}

let lastVisible

export const menuAPI = {
    async getMenu (itemsAmount, isInitial) {
        const menuRef = collection(db, "menu")
        const q = isInitial ? query(menuRef, startAfter(lastVisible), limit(itemsAmount)) : query(menuRef, limit(itemsAmount))
        const querySnapshot = await getDocs(q);
        lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        return querySnapshot
    }
}

export const checkoutAPI = {
    async requestCheckoutHistory (uid) {
            const docRef = collection(db, "checkouts")
            const q = query(docRef, where("uid", "==", uid))
            const querySnapshot = await getDocs(q);
            querySnapshot.map((doc) => {
            console.log(doc.id, " => ", doc.data());
            return querySnapshot
        });
    },
    async postCheckout (checkout) {   
        try {
           const docRef = await addDoc(collection(db, "checkouts"), checkout)
           return docRef.id
        }
        catch (error) {
            console.error("Error adding document: ", error);
        }
    }
}

const addMenu = async (bludo) => {

    try {
        const docRef = await addDoc(collection(db, "menu"), bludo);
        console.log("Document written with ID: ", docRef.id);
        console.log(bludo);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
