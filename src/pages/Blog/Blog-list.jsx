import { PATHS } from "@/constant/path";
import { formartDate } from "@/utils/formartDate";
import { Empty } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ listBlog }) => {
  return (
    <div className="entry-container max-col-2" data-layout="fitRows">
      {listBlog?.length === 0 ? (
        <Empty description="Not found any blog" />
      ) : (
        listBlog?.map((item, index) => {

           const {id, name, author, image, slug, updatedAt, category } = item || {}

            const detailPath = PATHS.BLOG + `/${slug}`
          return (
            <div className="entry-item col-sm-6"  key={id}>
              <article className="entry entry-grid">
                <figure className="entry-media">
                  <Link to={detailPath}>
                    
                    <img
                      src={image}
                      alt="image desc"
                    />
                  </Link>
                </figure>
                <div className="entry-body">
                  <div className="entry-meta">
                    <span>{formartDate(updatedAt,'MM,DD,YYYY')}</span>
                    <span className="meta-separator">|</span>
                    <span className="entry-author">
                      {" "}
                      by <a href="#">{author}</a>
                    </span>
                  </div>
                  <h2 className="entry-title">
                    <a href="blog-single.html">{category?.name}</a>
                  </h2>
                  <div className="entry-content">
                    <p>
                     {name}
                    </p>
                    <Link to={detailPath} className="read-more">
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BlogList;
