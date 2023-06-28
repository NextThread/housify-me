import { db } from "../config/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { isEqual } from "lodash";

export const getAllHouses = async () => {
  const snapshot = await getDocs(collection(db, "houses"));
  const docs = snapshot.docs.map((dc) => {
    const data = dc.data();
    data.id = dc.id;
    return data;
  });
  return docs;
};

export const houseById = async (houseid) => {
  const docRef = doc(db, "houses", houseid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    data.id = docSnap.id;
    return data;
  }
};

export const housesNearBy = async (house) => {
  const houseSnaps = await getDocs(collection(db, "houses"));
  let temp = [];
  houseSnaps.docs.map((hou) => {
    const data2 = hou.data();
    if(!data2.available)return;
    data2.id = hou.id;
    if (!isEqual(data2, house)) {
      if (hou.data().location.toLowerCase() === house.location.toLowerCase()) {
        temp.push(data2);
      }
    }
  });
  return temp;
};

export const allUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  let users = [];
  snapshot.docs.map((snap) => {
    const data = snap.data();
    data.id = snap.id;
    users.push(data);
  });
  return users;
};
