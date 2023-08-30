
const ResultCard = ({result}) => {
    return (
        <div className=" w-full border-teal-600 border rounded-md">
            <div className="w-full py-2 px-2 bg-teal-600 text-white rounded-t-md"><p>Name: {result?.draw?.title}</p></div>
            <div className="sm:p-2 px-1 sm:font-bold text-teal-600">
                Winner: {result?.winner?.name}
            </div>
               
            <div className="p-2">
                Ticket: {result?.windTicket}
            </div>
        </div>
    );
};

export default ResultCard;