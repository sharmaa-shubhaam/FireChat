import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggle } from "../redux/reducer/_toggle";
import { IoIosLogOut } from "react-icons/io";
import { auth, db } from "../firebase";
import { session } from "../redux/reducer/_session";
import { signOut } from "firebase/auth";

const Profile = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(session);

    // sign out user from firechat...
    const userSignOut = async () => {
        try {
            await setDoc(
                doc(db, "users", user._id),
                {
                    lastSeen: serverTimestamp(),
                },
                { merge: true }
            );
            await signOut(auth);
            dispatch(toggle(["profile", false]));
            window.location.pathname = "/";
        } catch (error) {
            console.log("error while user attempt to signOut: " + error);
        }
    };

    return (
        <div
            className="w-full h-screen absolute top-0 left-0 bg-black/50 z-10 flex items-center justify-center"
            onClick={() => dispatch(toggle(["profile", false]))}
        >
            <section
                className="bg-white w-[70%] sm:w-96 pt-4 pb-2 rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggle(["profile", true]));
                }}
            >
                <h1 className="text-center pb-3 pt-1 uppercase font-semibold border-b">Profile</h1>
                <button
                    className="w-full py-2.5 px-6 text-sm uppercase hover:bg-zinc-100 border-b flex items-center space-x-3"
                    onClick={userSignOut}
                >
                    <IoIosLogOut className="text-2xl" />
                    <span>Sign Out</span>
                </button>
                <div className="px-6 py-2 text-sm">
                    Don't worry your account will be deleted automaticaly after 3 days, when in
                    testing mode.
                </div>
            </section>
        </div>
    );
};

export default Profile;
