import { db } from "../Services/firebaseConfig.js";
import { loggedInUserDisplayName, loggedInUserID } from "./authService";
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
  const userID = loggedInUserID();

  const docRef = doc(db, "user_scores", userID);
  const docSnap = await getDoc(docRef);

  const scoreRef = collection(db, "user_scores");
  const q = query(scoreRef, orderBy("LionBucks", "desc"));
  const querySnapshot = await getDocs(q);

  const queryList = querySnapshot.docs
    .map((doc) => ({
      ...doc.data(),
    }))
    .map((doc) => JSON.stringify(doc));

  return queryList.indexOf(JSON.stringify(docSnap.data())) + 1;
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
