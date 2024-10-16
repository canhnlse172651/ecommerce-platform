

import React from 'react'
import { Empty } from 'antd'
import { Link } from 'react-router-dom'
import { PATHS } from '@/constant/path'

const BlogCate = ({listCateBlog,handleCateBlogChange }) => {
  return (
    <aside className="col-lg-3">
    <div className="sidebar">
      <div className="widget widget-search">
        <h3 className="widget-title">Search</h3>
        <form action="#">
          <label htmlFor="ws" className="sr-only">
            Search in blog
          </label>
          <input
            type="search"
            className="form-control"
            name="ws"
            id="ws"
            placeholder="Search in blog"
            required
          />
          <button type="submit" className="btn">
            <i className="icon-search" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <div className="widget widget-cats">
        <h3 className="widget-title">Categories</h3>
        <ul>
          {
           listCateBlog?.length === 0 ? (<Empty/>) : (
             listCateBlog?.map((item,index) => {
                
                return (
                    <li key={index}>
                    <a style={{ cursor: 'pointer', textDecoration: 'none' }} onClick={()=> handleCateBlogChange(item.id)} >
                     {item?.name}
                    </a>
                  </li>
                )
             })
           )
          }
        
        </ul>
      </div>
     
      <div className="widget widget-banner-sidebar">
        <div className="banner-sidebar-title">ad box 280 x 280</div>
        <div className="banner-sidebar banner-overlay">
          <Link to={PATHS.PRODUCTS}>
            <img
              src="assets/images/blog/sidebar/banner.jpg"
              alt="banner"
            />
          </Link>
        </div>
      </div>
      {/* <div className="widget">
        <h3 className="widget-title">Browse Tags</h3>
        <div className="tagcloud">
          <a href="#">fashion</a>
          <a href="#">style</a>
          <a href="#">women</a>
          <a href="#">photography</a>
          <a href="#">travel</a>
          <a href="#">shopping</a>
          <a href="#">hobbies</a>
        </div>
      </div> */}
    </div>
  </aside>
  )
}

export default BlogCate