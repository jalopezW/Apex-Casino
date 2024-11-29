import { auth } from "../firebaseConfig"
import { loggedInUserDisplayName, loggedInUserID } from "./authService"
import { collection, getDoc } from "firebase/firestore";

export async function newUser() {
    const userID = loggedInUserID()
    const docRef = doc(db, "user_scores", userID)
    const docSnap = await getDoc(docRef)

    if (not (docSnap.exists())) {
        await setDoc(doc(db, "user_scores", userID), {
            LionBucks: 10000,
            Name: loggedInUserDisplayName()
          })
    }
}



export async function increment({amount}) {
    
}

export async function getTopFive() {
    
}