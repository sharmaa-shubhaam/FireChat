import { ReactNode, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { session } from "./redux/reducer/_session";
import Sidebar from "./components/Sidebar";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

const App = (): ReactNode => {
    const { hasSession } = useAppSelector(session);

    if (hasSession)
        return (
            <div className="flex h-screen inter">
                <Sidebar />

                <Routes>
                    <Route
                        path="/chats/*"
                        element={
                            <Suspense>
                                <Home />
                            </Suspense>
                        }
                    />
                </Routes>
            </div>
        );

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
        </Routes>
    );
};

export default App;
