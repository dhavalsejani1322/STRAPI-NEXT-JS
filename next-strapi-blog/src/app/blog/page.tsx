import { getblog, getCategories } from '@/api/services/categories';
import BlogList from '@/components/Common/BlogList';
import CategoryFilter from '@/components/Common/CategoryFilter';

export default async function BlogPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const selectedCategory =
        typeof searchParams?.category === 'string'
            ? searchParams.category
            : null;

    const [blogResponse, categoryResponse] = await Promise.all([
        getblog(selectedCategory || undefined),
        getCategories(),
    ]);

    const blogs = blogResponse?.data || [];
    const categories = categoryResponse?.data || [];

    return (
        <div>
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
            />
            {blogs?.length > 0 ? (
                <BlogList blogs={{ data: blogs }} />
            ) : (
                <div className='flex mx-auto w-full h-full justify-center items-center py-36'>
                    No blog found
                </div>
            )}
        </div>
    );
}
