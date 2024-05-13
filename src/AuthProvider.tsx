import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "./firebase";
import { useAppDispatch } from "./redux/hooks";
import { createSession } from "./redux/reducer/_session";
import Loading from "./components/Loading";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatch(
                        createSession({
                            hasSession: true,
                            user: {
                                _id: user.uid,
                                email: user.email || "",
                                profilePic: user.photoURL || "",
                            },
                        })
                    );
                }
                setIsLoading(false);
            }),
        [auth]
    );

    if (isLoading) return <Loading />;
    return children;
};

export default AuthProvider;
