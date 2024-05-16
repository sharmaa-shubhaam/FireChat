import { ReactNode, useEffect, useState } from "react";
import DefaultUserProfile from "../assets/default_user_profile.jpg";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarChat = ({ users, chat_id }: { users: string; chat_id: string }): ReactNode => {
    const [profile, setProfile] = useState("");
    const path = useLocation().pathname == `/chats/${chat_id}`;
    const router = useNavigate();

    useEffect(() => {
        const recipientSnapshot = query(collection(db, "users"), where("email", "==", users));
        getDocs(recipientSnapshot).then((snapshot) => {
            snapshot.docs.map((doc) => {
                setProfile(doc.data()?.profilePic);
            });
        });
    }, []);

    return (
        <div
            className={`hover:bg-gray-100 flex items-center space-x-3 px-4 py-1.5 cursor-pointer ${
                path && "bg-gray-100"
            }`}
            onClick={() => {
                router(`/chats/${chat_id}`);
            }}
        >
            <img
                src={profile || DefaultUserProfile}
                alt="alt"
                className="w-8 h-8 rounded-full object-cover border"
            />
            <p className="text-sm truncate flex-1">{users}</p>
        </div>
    );
};

export default SidebarChat;
