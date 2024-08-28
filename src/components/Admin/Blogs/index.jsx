import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { v4 as uuid } from "uuid";
import {
  apiGetBlogs,
  apiPostCreateBlog,
  apiPutUpdateBlog,
  apiDeleteBlog,
} from "../../../firebase/firestore/queries";
import { Blog } from "./Blog";
import { BlogActionDrawer } from "./BlogActionDrawer";
import { Dialog } from "../../Dialog";
import { Loader } from "../../Loader";

export const BlogsSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    setIsEditing(true);
  };

  const handleCreateBlog = async (values) => {
    await apiPostCreateBlog({
      id: uuid(),
      title: values.title,
      description: values.description,
      image: values.image,
      author: values.author,
      createdAt: new Date().toISOString(),
    });
    handleGetBlogs();
    setIsCreating(false);
  };

  const handleUpdateCar = async (values) => {
    await apiPutUpdateBlog({ id: selectedBlog.id, ...values });
    handleGetBlogs();
    setIsEditing(false);
  };

  const handleDeleteBlog = async () => {
    await apiDeleteBlog(selectedBlog.id);
    handleGetBlogs();
    setIsDeleting(false);
  };

  const handleGetBlogs = async () => {
    setIsLoading(true);
    const b = await apiGetBlogs();
    setBlogs(b);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}

      <Row>
        <Col lg="3" md="4" sm="6">
          <div
            style={{
              borderRadius: 10,
              borderStyle: "dotted",
              borderColor: "#49505750",
              height: "380px",
              background: "#f8f9fa",
              cursor: "pointer",
            }}
            onClick={() => setIsCreating(true)}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                <i class="ri-add-circle-line ri-lg"></i> <br /> Add new blog
              </p>
            </div>
          </div>
        </Col>

        {blogs?.map((blog) => (
          <Col key={blog.id} lg="4" md="4" sm="12">
            <Blog
              {...blog}
              onSelect={() => handleSelectBlog(blog)}
              onDelete={() => {
                setIsDeleting(true);
                setSelectedBlog(blog);
              }}
            />
          </Col>
        ))}
      </Row>

      {isEditing && (
        <BlogActionDrawer
          header="Edit Blog"
          action="update"
          blog={selectedBlog}
          onSubmit={handleUpdateCar}
          onClose={() => {
            setSelectedBlog(null);
            setIsEditing(false);
          }}
        />
      )}

      {isCreating && (
        <BlogActionDrawer
          header="Add New Blog"
          action="create"
          onSubmit={handleCreateBlog}
          onClose={() => setIsCreating(false)}
        />
      )}

      {isDeleting && (
        <Dialog
          open={isDeleting}
          header={
            <p style={{ textAlign: "center" }}>
              Are you sure you want to delete the blog <br />{" "}
              <b>{selectedBlog?.id}</b> ?
            </p>
          }
          onConfirm={handleDeleteBlog}
          onClose={() => {
            setSelectedBlog(null);
            setIsDeleting(false);
          }}
          confirmBtnText={"Delete"}
          closeBtnText={"Cancel"}
        />
      )}
    </div>
  );
};
