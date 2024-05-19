import { ReactNode, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { session } from "./redux/reducer/_session";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Profile from "./modal/Profile";
import { toggleState } from "./redux/reducer/_toggle";
import NewChat from "./modal/NewChat";
import ChattingSVG from "./assets/chatting.svg";

const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = (): ReactNode => {
    const { hasSession } = useAppSelector(session);
    const toggle = useAppSelector(toggleState);

    console.log(toggle);

    if (!hasSession)
        return (
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Routes>
        );

    return (
        <div className="roboto h-screen overflow-hidden">
            <Header />
            <div className="flex h-full bg-zinc-100">
                <Sidebar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="flex-1 flex items-center justify-center">
                                <img
                                    src={ChattingSVG}
                                    alt="alt"
                                    className="w-[50%] sm:w-72 object-contain"
                                />
                            </div>
                        }
                    />
                    <Route
                        path="/chats/*"
                        element={
                            <Suspense>
                                <Chat />
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Suspense>
                                <NotFound />
                            </Suspense>
                        }
                    />
                </Routes>
            </div>
            {toggle.profile && <Profile />}
            {toggle.newChat && <NewChat />}
        </div>
    );
};

export default App;
