import NotFound404 from "../assets/404NotFound.png";

const NotFound = () => {
    return (
        <div className="flex-1 flex items-center justify-center flex-col">
            <img src={NotFound404} alt="" className="w-80 object-contain" />
            <h1 className="text-2xl mt-3">Not Found</h1>
        </div>
    );
};

export default NotFound;
