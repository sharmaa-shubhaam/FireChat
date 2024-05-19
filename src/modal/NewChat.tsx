import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggle } from "../redux/reducer/_toggle";
import { addDoc, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { session } from "../redux/reducer/_session";
import { useCollection } from "react-firebase-hooks/firestore";
import { recipientEmail } from "../utils/recipientEmail";
import { RotatingLines } from "react-loader-spinner";

interface InputProps {
    value?: string;
    error?: [boolean, string];
}

const NewChat = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(session);
    const [input, setInput] = useState<InputProps>({});
    const [isLoading, setIsLoading] = useState(false);

    // firebase collection REFRENCES....
    const chatsCollectionRef = collection(db, "chats");

    // firebase Collection Query....
    // Going to chats collection and get all chats of loggedIn user with friends....
    const chatsQuery = query(chatsCollectionRef, where("users", "array-contains", user.email));

    // snapshot for chat collection....
    const [chatsSnapshot] = useCollection(chatsQuery);

    // to check for is chat Already exits or not....
    const chatAlreadyExits = (input: string) => {
        return !!chatsSnapshot?.docs.find((doc) => input == recipientEmail(doc, user.email));
    };

    // create new chat with the entered recipient email...
    const CreateNewChat = async () => {
        if (
            !input.value ||
            !input?.value.includes("@gmail.com") ||
            input.value == user.email ||
            chatAlreadyExits(input.value)
        ) {
            setInput({ error: [true, "Enter valid data or chat already exits."] });
            console.log("Chat already exits with the user " + input);
            return null;
        }

        try {
            setIsLoading(true);
            setInput({ ...input, error: [false, ""] });
            await addDoc(chatsCollectionRef, {
                users: [user.email, input.value],
            });
        } catch (error) {
            setInput({ error: [true, "Something went wrong."] });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="w-full h-screen absolute top-0 left-0 bg-black/50 z-10 flex items-center justify-center"
            onClick={() => dispatch(toggle(["newChat", false]))}
        >
            <section
                className="bg-white w-[80%] sm:w-96 pt-4 pb-2 rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggle(["newChat", true]));
                }}
            >
                <h1 className="text-center pt-1 pb-4 uppercase font-medium text-lg">
                    create new chat
                </h1>
                <div className="px-3 space-y-2">
                    <input
                        type="text"
                        value={input.value}
                        onChange={(e) => setInput({ value: e.target.value.toLowerCase() })}
                        placeholder="Example@gmail.com"
                        className={`w-full py-2.5 px-4 outline-none bg-white text-sm rounded ${
                            input.error?.[0] ? "border border-red-400" : "border"
                        }`}
                        spellCheck="false"
                    />
                    {input.error && <span className="text-xs text-red-500">{input.error}</span>}
                    <button
                        className="w-full py-2 border bg-blue-600 text-white rounded text-sm active:scale-[0.99] uppercase flex items-center justify-center"
                        onClick={CreateNewChat}
                    >
                        {isLoading ? (
                            <RotatingLines
                                visible={true}
                                width="20"
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                            />
                        ) : (
                            <span>Done</span>
                        )}
                    </button>
                    <button
                        className="w-full py-2 border rounded text-sm active:scale-[0.99] hover:bg-zinc-100"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(toggle(["newChat", false]));
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    );
};

export default NewChat;
