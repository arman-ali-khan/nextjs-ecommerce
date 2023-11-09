import Link from 'next/link';

const CategoryListMobile = ({categories}) => {

    return (
        <ul className=" gap-0 md:grid-cols-none">
        {categories?.map((category,i) => (
           <Link className="border-b md:border-none flex items-center rounded" key={i} href={`/category/${category.value}`}>
            <li className="md:px-4 w-full rounded-xl bg-base-100">
              <span className="flex items-center hover:underline hover:text-teal-600 md:gap-3">
                <img className="w-8 p-2 h-8" src={category.icon} alt="" />

                <p className="md:font-bold text-center text-xs leading-3 md:hidden">{category.label}</p>

                <p className="md:font-bold leading-4 hidden md:block">{category.label}</p>
              </span>
            </li>
          </Link>
         
        ))}
      </ul>
    );
};

export default CategoryListMobile;