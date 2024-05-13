import { ReactNode } from "react";
import FireChat from "../assets/firechat.jpg";
import { BarLoader } from "react-spinners";

const Loading = (): ReactNode => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="space-y-5">
                <img
                    src={FireChat}
                    alt="firechat_loading_logo"
                    className="w-[100px] aspect-square rounded-full"
                />

                <BarLoader color="#ff3b14" height={5} width={100} />
            </div>
        </div>
    );
};

export default Loading;
