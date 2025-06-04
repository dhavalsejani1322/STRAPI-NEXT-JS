/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

const Categories = (cat: any) => {
    console.log(cat.cat, "categoriescategoriescategories")
    return <div>
        <div>
            <select id="states" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {cat?.cat?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                        {category.Title}
                    </option>
                ))}
            </select>
        </div>
    </div>;
};

export default Categories;
