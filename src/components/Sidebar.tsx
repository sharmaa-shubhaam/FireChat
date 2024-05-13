import { ReactNode } from "react";
import SidebarChat from "./SidebarChat";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { session } from "../redux/reducer/_session";
import { useAppSelector } from "../redux/hooks";
import { addDoc, collection, doc, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = (): ReactNode => {
    const { user } = useAppSelector(session);

    // snapshot for chat collection....
    const chatSnapRef = query(
        collection(db, "chats"),
        where("users", "array-contains", user.email)
    );
    const [chatsnapshot] = useCollection(chatSnapRef);

    // take the recipient email from single array.
    const recipientEmail = (doc: any) =>
        doc.data().users.filter((doc: any) => doc !== user.email)[0];

    // figure out is chat exits or not.
    const chatAlreadyExits = (input: string) =>
        !!chatsnapshot?.docs.find((doc) => input == recipientEmail(doc));

    // start a new chat and save in chat collection.
    const startNewChat = async () => {
        const input = prompt("Enter gmail account of your Friend...");
        if (
            !input ||
            !input?.includes("@gmail.com") ||
            input == user.email ||
            chatAlreadyExits(input)
        ) {
            console.log("Chat already exits with the user " + input);
            return null;
        }
        try {
            await addDoc(collection(db, "chats"), { users: [user.email, input] });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-[300px] h-full bg-white">
            <div className="py-2 px-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold sedan-sc-regular">
                        <span>Fire</span>
                        <span className="text-[var(--primary)]">Chat</span>
                    </h1>
                    <img
                        src={user?.profilePic}
                        alt="alt"
                        className="w-8 h-8 rounded-full cursor-pointer object-cover border"
                        onClick={async () => {
                            await setDoc(
                                doc(db, "users", user._id),
                                {
                                    lastSeen: serverTimestamp(),
                                },
                                { merge: true }
                            );
                            signOut(auth).then(() => (window.location.pathname = "/"));
                        }}
                    />
                </div>
                <p className="text-sm w-[80%] truncate">{user?.email}</p>
            </div>
            <div className="px-4 py-1.5">
                <button
                    className="w-full bg-gray-100 uppercase py-2 text-sm rounded-sm active:bg-gray-200"
                    onClick={startNewChat}
                >
                    start a new chat
                </button>
            </div>
            <div className="py-2">
                {chatsnapshot?.docs.map((doc, i) => (
                    <SidebarChat users={recipientEmail(doc)} chat_id={doc.id} key={i} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
