import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, getDoc, doc, setDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2'


const firebaseConfig = {
  apiKey: "AIzaSyDzsl6vctzy8NbKfAC5X8RAIlkDGRC3l1M",
  authDomain: "hassan-twitter.firebaseapp.com",
  projectId: "hassan-twitter",
  storageBucket: "hassan-twitter.appspot.com",
  messagingSenderId: "455767101687",
  appId: "1:455767101687:web:2846b22dd20cb2b48c43f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

function loginWithGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {

      handleLoginResult(result);
    })
    .catch((error) => {

      handleLoginError(error);
    });
}

function handleLoginResult(result) {

  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;

  const user = result.user;
  // console.log(user)
  localStorage.setItem('uid', user.uid)
  alert('Successful login:', user);
}

function handleLoginError(error) {

  const errorCode = error.code;
  const errorMessage = error.message;

  const email = error.customData ? error.customData.email : null;

  const credential = GoogleAuthProvider.credentialFromError(error);

  // console.error('Login error:', errorCode, errorMessage, email, credential);
}

const handleLogout = () => {
  signOut(auth).then(() => {
    localStorage.removeItem('uid')
    Swal.fire({
      title: 'Success!',
      text: 'Logged out Successfully!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }).catch((error) => {
    Swal.fire({
      title: 'Error!',
      text: 'Error Logging out!',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  });
}

// ...

export async function getAllProducts(category) {
  try {
    const adsCollection = collection(db, "ads");
    const products = [];

    if (category) {
      // console.log("CATEGORY FETCHING")
      const categoryData = query(adsCollection, where("category", "==", String(category.toLowerCase())))

      const querySnapshot = await getDocs(categoryData);
      querySnapshot.forEach((doc) => {
        const productData = { id: doc.id, ...doc.data() };
        products.push(productData);
      });

      // console.log("CATEGORY FETCHED", categoryData)


      return products;

    } else {
      // console.log("ALL DATA FETCHING")
      const querySnapshot = await getDocs(adsCollection);

      querySnapshot.forEach((doc) => {
        const productData = { id: doc.id, ...doc.data() };
        products.push(productData);
      });
      // console.log("ALL DATA FETCHED")

      return products;
    }

  } catch (error) {
    console.log('Error fetching products:', error);
    throw error;
  }
}

// ...




export async function getSingleAd(adId) {
  const docRef = doc(db, "ads", adId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const ad = docSnap.data();

    const userRef = doc(db, "users", ad.uid);
    // console.log('userRef', userRef.path);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      // console.log('userSnap data', userData);
    } else {
      console.log("No such user document!");
    }

    // console.log('ad', ad);
    return ad;
  } else {
    console.log("No such document!");
  }
}



export async function register(user) {
  // console.log(user);
  const { email, password, fullname } = user;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      fullname: fullname,
      email: email,
    });

    Swal.fire({
      title: 'Success!',
      text: 'Registered Successfully:',
      icon: 'success',
      confirmButtonText: 'Ok'
    });

  } catch (error) {
    console.error('Registration error:', error.code, error.message);
    Swal.fire({
      title: 'Error!',
      text: `Registration failed. Error: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
}


export async function login(user) {
  const { email, password } = user;

  const currentUser = await getCurrentUser();

  if (currentUser) {
    Swal.fire({
      title: 'Success!',
      text: 'User already Logged in',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    return null;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    Swal.fire({
      title: 'Success!',
      text: 'Logged in Successfully!',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    const uid = user.uid;
    localStorage.setItem('uid', uid);

    console.log(user);

    // Redirect or perform other actions after successful login

    return userCredential; // Returning the userCredential for success

  } catch (error) {
    const errorMessage = error.message;
    Swal.fire({
      title: 'Error!',
      text: `Login failed. Error: ${errorMessage}`,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    return null; // Returning null for failure
  }
}


export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}



export {
  auth,
  onAuthStateChanged,
  ref,
  uploadBytes,
  getDownloadURL,
  handleLogout,
  db,
  addDoc,
  collection,
  storage
}