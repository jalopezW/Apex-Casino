import { auth, db } from "../Services/firebaseConfig.js";
import {
  loggedInUserDisplayName,
  loggedInUserID,
  useAuthentication,
} from "./authService";
import {
  collection,
  getDoc,
  setDoc,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  increment,
  updateDoc,
} from "firebase/firestore";

export async function newUser() {
  const userID = loggedInUserID();

  const docRef = doc(db, "user_scores", userID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(doc(db, "user_scores", userID), {
      LionBucks: 10000,
      Name: loggedInUserDisplayName(),
    });
  }
}

export async function getScore() {
  const userID = loggedInUserID();

  const docRef = doc(db, "user_scores", userID);
  const docSnap = await getDoc(docRef);

  return docSnap.data().LionBucks;
}

export async function getPosition() {
  //fix
  const userID = loggedInUserID();

  const docRef = doc(db, "user_scores", userID);
  const docSnap = await getDoc(docRef);

  const querySnapshot = await getDocs(collection(db, "user_scores"));

  console.log(querySnapshot.indexOf(docSnap));

  return querySnapshot.indexOf(docSnap) + 1;
}

export async function incrementScore(amount) {
  const userID = loggedInUserID();

  const docRef = doc(db, "user_scores", userID);

  await updateDoc(docRef, {
    LionBucks: increment(amount),
  });
}

export async function getTopFive() {
  const scoreRef = collection(db, "user_scores");

  const q = query(scoreRef, orderBy("LionBucks", "desc"), limit(5));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
