import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import isEmpty from "lodash.isempty";
import { apiGetBlogs } from "../../firebase/firestore/queries";
import "../../styles/blog-item.css";

const BlogItem = ({ item }) => {
  const { image, title, author, createdAt, description, time } = item;

  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="blog__item">
        <img src={image} alt="" className="w-100" />
        <div className="blog__info p-3">
          <Link to={`/blogs/${title}`} className="blog__title">
            {title}
          </Link>
          <p className="section__description mt-3">
            {description.length > 100
              ? description.substr(0, 100)
              : description}
          </p>

          <Link to={`/blogs/${title}`} className="read__more">
            Read More
          </Link>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i class="ri-user-line"></i> {author}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i class="ri-calendar-line"></i>{" "}
                {dayjs(createdAt).format("DD/MM/YYYY")}
              </span>

              <span className=" d-flex align-items-center gap-1 section__description">
                <i class="ri-time-line"></i> {dayjs(time).format("hh:mm A")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const handleGetBlogs = async () => {
    const b = await apiGetBlogs();
    setBlogs(b);
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  return (
    <>
      {isEmpty(blogs) ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <h6 className="section__subtitle">No blogs found</h6>
        </div>
      ) : (
        <>
          {blogs?.map((item) => (
            <BlogItem item={item} key={item.id} />
          ))}
        </>
      )}
    </>
  );
};

export default BlogList;
