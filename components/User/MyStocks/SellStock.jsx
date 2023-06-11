import moment from 'moment';
import SellStockCard from './SellStockCard';

const SellStock = ({stock,update, setUpdate}) => {
    const products = stock?.products;

    return (
        <>
        <div className='bg-teal-100 text-teal-600 px-4 py-1 my-4'>
            <p className='text-xl font-bold'>{moment(stock.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1'>
            {
                products?.map(product=> <SellStockCard update={update} setUpdate={setUpdate} stockId={stock.id} product={product} key={product._id}/>)
            }
        </div>
        </>
    );
};

export default SellStock;