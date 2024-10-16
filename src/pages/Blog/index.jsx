import { PATHS } from "@/constant/path";
import { useMutation } from "@/hooks/useMutation";
import { Breadcrumb } from "antd";
import queryString from "query-string";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import { blogService } from "@/services/blogService";
import BlogList from "./Blog-list";
import Pagination from "@/components/Pagination";
import BlogCate from "./Blog-cate";
import { useEffect } from "react";
import useQuery from "@/hooks/useQuery";
const BLOG_LIMIT = 6;


const Blog = () => {

  const { search } = useLocation();

  const queryObject = queryString.parse(search);

  const [_, setSearchParams] = useSearchParams();

  

  
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
    execute: fetchBlog,
  } = useMutation((query) =>
    blogService.getBlogs(query || `?limit=${BLOG_LIMIT}`)
  );

  const {
    data: cateBlogData,
    loading: cateBlogLoading,
    error: cateBlogError,
  } = useQuery(blogService.getCateBlog);
 
  

  useEffect(()=> {
    fetchBlog(search)
  },[search])

  const listBlogProps = {
    listBlog : blogData?.data.blogs || [],

  }
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: BLOG_LIMIT
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  const pagiProps = {
    onPagiChange,
      currentPage: Number(blogData?.data?.pagination?.page || queryObject.page || 1),
      limit: Number(blogData?.data?.pagination?.limit || 0),
      total: Number(blogData?.data?.pagination?.total || 0),
  };
  

  const handleCateBlogChange = (cateId,limit) => {
    updateQueryString({...queryObject,category : cateId})
  }

  const cateBlogProps = {
    handleCateBlogChange,
    listCateBlog : cateBlogData?.blogs || []
    
  }
  

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container" style={{fontWeight:400}}>
        <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}> Home </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Blog</Breadcrumb.Item>
      </Breadcrumb>
        </div>
      </nav>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <BlogList {...listBlogProps} />
              <Pagination {...pagiProps}/>
            </div>
             <BlogCate {...cateBlogProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;