import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { session } from "../redux/reducer/_session";
import moment from "moment";

const Message = ({ doc }: { doc: any }): ReactNode => {
    const { user } = useAppSelector(session);
    const typeOfMesssage = doc.from == user.email ? "sender" : "reciver";

    return (
        <div
            className={`${
                typeOfMesssage === "sender" && "justify-end"
            } flex items-center py-1 w-full`}
        >
            <div
                className={`${
                    typeOfMesssage == "sender" && "!bg-white !text-black"
                } min-w-24 max-w-56 bg-blue-500 text-white px-2 py-1 rounded-lg shadow`}
            >
                <p className="text-sm">{doc.message}</p>
                <p className="text-[10px] w-full text-end mt-0.5">
                    {doc.timestamp ? moment(doc.timestamp.toDate()).format("LT") : "..."}
                </p>
            </div>
        </div>
    );
};

export default Message;
