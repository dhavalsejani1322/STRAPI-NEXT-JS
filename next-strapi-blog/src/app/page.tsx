import { getblog, getCategories } from '@/api/services/categories';
import Categories from '@/components/Categories';

const fetchCategories = async () => {
  try {
    const data = await getCategories();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};

const fetchBlog = async () => {
  try {
    const data = await getblog();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};

export default async function Home() {
  const categoryRes = await fetchCategories();
  const blogRes = fetchBlog()
  console.log(blogRes, "blogRes")
  console.log(categoryRes, "categories")
  return (
    <div>
      <Categories cat={categoryRes.data} />
    </div>
  );
}