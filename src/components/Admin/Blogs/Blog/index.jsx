import React from "react";
import dayjs from "dayjs";
import "./index.css";
import { trimText } from "../../../../utils";

export const Blog = ({
  title,
  image,
  description,
  author,
  createdAt,
  onSelect,
  onDelete,
}) => (
  <div className="blog">
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 4, right: 4 }}>
        <div
          style={{
            background: "#ef233c",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: 4,
            width: 32,
            height: 32,
            borderRadius: 8,
          }}
        >
          <i
            class="ri-delete-bin-line"
            style={{ color: "#ffffff" }}
            onClick={onDelete}
          />
        </div>
      </div>
    </div>

    <div onClick={onSelect}>
      <img src={image} alt={title} className="blog-image" />

      <div className="blog-details">
        <h4 className="blog-title">{trimText(title, 80)}</h4>
        <p className="blog-description">{trimText(description)}</p>
      </div>

      <div
        style={{
          height: "1px",
          width: "100%",
          background: "#ced4da",
          marginTop: "1rem",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "3rem",
          gap: "10px",
        }}
      >
        <h6 style={{ margin: 0 }}>{author}</h6>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
            marginLeft: "auto",
          }}
        >
          <i class="ri-calendar-line spec-item-icon" />
          <span className="spec-item">
            {dayjs(createdAt).format("DD-MM-YYYY")}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <i class="ri-time-line spec-item-icon" />
          <span className="spec-item">{dayjs(createdAt).format("HH:mm")}</span>
        </div>
      </div>
    </div>
  </div>
);
