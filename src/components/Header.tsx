import { TbMenu2 } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { session } from "../redux/reducer/_session";
import { LuPlus } from "react-icons/lu";
import { toggle } from "../redux/reducer/_toggle";
import { Link } from "react-router-dom";

const Header = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(session);

    return (
        <header className="h-14 bg-white px-4 flex justify-between items-center border-b">
            <div className="flex items-center space-x-3 sm:space-x-1">
                <button
                    className="text-2xl p-1 rounded-full hover:bg-zinc-100 active:scale-[0.98] sm:hidden"
                    onClick={() => dispatch(toggle(["sidebar", true]))}
                >
                    <TbMenu2 />
                </button>
                <Link to="/">
                    <h1 className="text-2xl font-bold capitalize">firechat</h1>
                </Link>
            </div>

            <div className="flex space-x-3">
                <button
                    className="flex items-center space-x-1.5 border px-2 py-1.5 rounded-md hover:bg-zinc-100 active:scale-[0.99]"
                    onClick={() => dispatch(toggle(["newChat", true]))}
                >
                    <LuPlus />
                    <span className="text-sm">New Chat</span>
                </button>

                <button
                    className="rounded-full flex items-center sm:border sm:py-1 sm:pl-1.5 sm:pr-2 sm:space-x-2 hover:bg-zinc-100 active:scale-[0.99]"
                    onClick={() => dispatch(toggle(["profile", true]))}
                >
                    <img
                        src={user.profilePic}
                        alt="user-profile"
                        className="w-8 sm:w-7 h-8 sm:h-7 rounded-full object-cover"
                    />
                    <span className="text-sm !truncate max-w-48 hidden sm:block">{user.email}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
