import { ReactNode } from "react";
import SidebarChat from "./SidebarChat";
import { db } from "../firebase";
import { session } from "../redux/reducer/_session";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { recipientEmail } from "../utils/recipientEmail";
import { toggleState, toggle } from "../redux/reducer/_toggle";

const Sidebar = (): ReactNode => {
    const { user } = useAppSelector(session);
    const isSidebarOpen = useAppSelector(toggleState).sidebar;
    const dispatch = useAppDispatch();

    // snapshot for chat collection....
    const chatsCollectionRef = collection(db, "chats");
    const chatSnapRef = query(chatsCollectionRef, where("users", "array-contains", user.email));
    const [chatsnapshot] = useCollection(chatSnapRef);

    return (
        <section
            className={`h-full w-full sm:w-[320px] absolute sm:relative sm:left-0 
                            top-0 bg-white/15 transition-all ease-in-out ${
                                isSidebarOpen ? "left-0" : "left-[-1000px]"
                            }`}
            onClick={() => dispatch(toggle(["sidebar", false]))}
        >
            <div className="w-[65%] sm:w-full h-full bg-white">
                <div className="px-5 pl-5 pt-4 flex items-center justify-between sm:hidden">
                    <h1 className="text-2xl font-bold capitalize">firechat</h1>
                </div>
                <div className="px-5 pt-2 pb-2 border-b">
                    <h1 className="text-lg font-medium capitalize">Chats</h1>
                </div>
                <div className="pb-2">
                    {chatsnapshot?.docs.map((doc, i) => (
                        <SidebarChat
                            users={recipientEmail(doc, user.email)}
                            chat_id={doc.id}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sidebar;
