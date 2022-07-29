import useSWR from "swr";

import {GET_ACTIVE_BLOGS} from "../queryKeys";
import {getBlogs} from "../api/Blogs";

export const useGetBlogPosts = () => {
    const {data, error} = useSWR(GET_ACTIVE_BLOGS,()=>getBlogs());
    
    return {data, error};
}