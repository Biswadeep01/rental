import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const StyledListItem = ({ label, link, isActive, isFirstItem, isLastItem }) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <ListGroupItem
        style={{
          background: isActive ? "#03959430" : "inherit",
          fontWeight: isActive ? "700" : "300",
          ...(isFirstItem && {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }),
          ...(isLastItem && {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }),
        }}
      >
        {label}
      </ListGroupItem>
    </Link>
  );
};

const navLinks = [
  { id: 1, label: "Home", link: "/admin/home" },
  { id: 2, label: "About", link: "/admin/about" },
  { id: 3, label: "Fleet", link: "/admin/fleet" },
  { id: 4, label: "Services", link: "/admin/services" },
  { id: 5, label: "Blog", link: "/admin/blog" },
  { id: 6, label: "Testimonials", link: "/admin/testimonials" },
  { id: 5, label: "Footer", link: "/admin/footer" },
];

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <ListGroup style={{ background: "#f8f9fa", position: "relative" }}>
      {navLinks.map((link, index) => (
        <StyledListItem
          key={link.id}
          label={link.label}
          link={link.link}
          isActive={pathname.includes(link.link)}
          isFirstItem={index === 0}
          isLastItem={index === navLinks.length - 1}
        />
      ))}
    </ListGroup>
  );
}
