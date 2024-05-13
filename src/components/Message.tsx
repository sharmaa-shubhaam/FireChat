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
                typeOfMesssage == "sender" && "justify-end"
            } flex items-center py-1 w-full inter`}
        >
            <div
                className={`${
                    typeOfMesssage == "sender" && "!bg-white !text-black"
                } min-w-20 max-w-56 bg-green-600 text-white px-3 py-1 rounded`}
            >
                <p className="text-sm">{doc.message}</p>
                <p className="text-[10.5px] w-full text-end">
                    {doc.timestamp ? moment(doc.timestamp.toDate()).format("LT") : "..."}
                </p>
            </div>
        </div>
    );
};

export default Message;
