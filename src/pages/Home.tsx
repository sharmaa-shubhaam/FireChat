import { ReactNode, useEffect, useRef, useState } from "react";
import DefaultProfilePic from "../assets/default_user_profile.jpg";
import { useLocation } from "react-router-dom";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useAppSelector } from "../redux/hooks";
import { session } from "../redux/reducer/_session";
import TimeAgo from "timeago-react";
import Message from "../components/Message";

const Home = (): ReactNode => {
    const { user } = useAppSelector(session);
    const [recipientEmail, setRecipientEmail] = useState("");
    const [lastSeen, setLastSeen] = useState("");
    const [profile, setProfile] = useState("");
    const [message, setMessage] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showMessage, setShowMessage] = useState<any>([]);
    const chat_id = useLocation().pathname.slice(7);

    // Message ref collection
    const messageRef = query(
        collection(doc(db, "chats", chat_id), "messages"),
        where("chat_id", "==", chat_id),
        orderBy("timestamp", "asc")
    );
    const [messageSnapshot] = useCollection(messageRef);

    // chat ref collection
    const chatRef = doc(db, "chats", chat_id);
    const [chatSnapshot] = useDocument(chatRef);

    // user ref collection
    const userRef = query(collection(db, "users"), where("email", "==", recipientEmail || ""));
    const [userSnapshot] = useCollection(userRef);

    const sendMessage = async () => {
        if (!message) return null;

        // adding a document in message collection inside the chat coolection...
        try {
            await addDoc(collection(doc(db, "chats", chat_id), "messages"), {
                timestamp: serverTimestamp(),
                message: message,
                from: user.email,
                chat_id: chat_id,
            });
            setMessage("");
            if (scrollRef?.current)
                scrollRef?.current.scroll({
                    behavior: "smooth",
                    top: 600,
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // get recipient email and last seen with chat_id....
        setRecipientEmail(chatSnapshot?.data()?.users.filter((doc: any) => doc !== user.email)[0]);

        userSnapshot?.docs.map((doc) => {
            setProfile(doc.data()?.profilePic);
            setLastSeen(doc.data()?.lastSeen.toDate());
        });

        // arrangin data according to asc...
        onSnapshot(messageRef, (doc) => {
            const messageSnap = doc.docs.map((doc) => doc.data());
            setShowMessage(messageSnap);
        });
    }, [chatSnapshot, userSnapshot, recipientEmail, messageSnapshot]);

    return (
        <div className="flex-1 flex flex-col">
            <header className="bg-white h-14 px-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src={profile || DefaultProfilePic}
                        alt="alt"
                        className="w-9 h-9 rounded-full border"
                    />
                    <div className="">
                        <h1 className="text-sm font-semibold truncate">{recipientEmail}</h1>
                        {lastSeen ? (
                            <p className="text-xs">
                                last seen:
                                <TimeAgo datetime={lastSeen} />
                            </p>
                        ) : (
                            <p className="text-xs">unavailable</p>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto py-3 px-6" ref={scrollRef}>
                {showMessage.map((data: any, i: any) => {
                    return <Message doc={data} key={i} />;
                })}
            </div>

            <div className="bg-white h-14 flex items-center px-10 space-x-2">
                <input
                    type="text"
                    value={message}
                    className="w-full text-sm border px-4 py-2.5 rounded"
                    placeholder="Send a Message..."
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <button
                    className="text-sm py-2.5 px-6 bg-[var(--primary)] text-white rounded active:scale-[0.99]"
                    onClick={sendMessage}
                >
                    send
                </button>
            </div>
        </div>
    );
};

export default Home;
