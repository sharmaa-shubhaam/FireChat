import { ReactNode } from "react";
import FireChat from "../assets/firechat.jpg";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

const Login = (): ReactNode => {
    const loginWithGoogle = async () => {
        try {
            // sign in with google login.
            const { user } = await signInWithPopup(auth, provider);

            // saving user to database.
            // Initialize collection, doc, and setDoc to firebase.
            const collectionRef_users = collection(db, "users");
            const docRef_users = doc(collectionRef_users, user.uid);
            const data_users = {
                email: user.email,
                profilePic: user.photoURL,
                lastSeen: serverTimestamp(),
            };
            await setDoc(docRef_users, data_users, { merge: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen roboto">
            <div className="bg-white py-4 px-8 rounded-md space-y-3 shadow w-[80%] sm:w-[350px]">
                <div className="flex items-center justify-center flex-col">
                    <img
                        src={FireChat}
                        alt="firechat_login_logo"
                        className="aspect-square w-auto sm:w-[200px]"
                    />
                    <h1 className="text-center text-3xl font-semibold sedan-sc-regular">
                        <span>Fire</span>
                        <span className="text-[var(--primary)]">Chat</span>
                    </h1>
                </div>
                <button
                    className="inter w-full bg-white border py-2 rounded-full uppercase text-sm active:scale-95 hover:bg-slate-50 space-x-4 flex items-center justify-center"
                    onClick={loginWithGoogle}
                >
                    <FcGoogle className="text-2xl" />
                    <span>sign in with Google</span>
                </button>
                <div className="text-[10px] text-center text-gray-400 uppercase pt-1">
                    Copyright all rights reserved.
                    <br />
                    shubham sharma
                </div>
            </div>
        </div>
    );
};

export default Login;
