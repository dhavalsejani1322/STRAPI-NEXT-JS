import strapiApi from '@/lib/strapiAxios';
import QueryString from 'qs';


export const getCategories = async (payload?: Record<string, any>) => {
  try {
    const response = await strapiApi.get('/categories?pagination[pageSize]=100');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Unexpected error occurred' };
  }
};


//export const getblog = async (payload?: Record<string, any>) => {
//  try {
//    const response = await strapiApi.get('/blogs?populate=*');
//    return response.data;
//  } catch (error: any) {
//    throw error.response?.data || { message: 'Unexpected error occurred' };
//  }
//};

export const getblog = async (categoryId?: string): Promise<{ data: any }> => {
  try {
    let url = '/blogs?populate=*&pagination[pageSize]=100'; // Adjust endpoint and populate as needed
    if (categoryId) {
      url += `&filters[categories][id][$eq]=${categoryId}`;
    }
    
    const response = await strapiApi.get(url);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Unexpected error occurred' };
  }
};


export const getSingleblog = async (payload?: { slug?: string }) => {
  try {
    const query = QueryString.stringify({
      filters: {
        slug: {
          $eq: payload?.slug || '',
        },
      },
      populate: '*',
    });

    const response = await strapiApi.get(`/blogs?${query}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Unexpected error occurred' };
  }
};




export const getBlogsByCategory = async (categoryId: number) => {
  try {
    const response = await strapiApi.get('/blogs?populate=categories&filters[categories][id][$eq]=${categoryId}');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Unexpected error occurred' };
  }
};

export const getHirePageSeo = async (urlPath: string) => {
  try {
    const response = await strapiApi.get(
      `/hire-developers?filters[url][$eq]=${urlPath}&populate=*`
    );

    const item = response.data?.data?.[0];
    if (!item) return null;

    return item;
  } catch (error: any) {
    throw error.response?.data || {
      message: 'Unexpected error occurred while fetching hire page SEO.',
    };
  }
};