import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { FleetSettings as FleetLayout } from "./FleetLayout";
import { OptionsLayout } from "./OptionsLayout";

const tabs = [
  { id: 0, label: "Fleet" },
  { id: 1, label: "Addtional Options" },
];

export const FleetSettings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <FleetLayout />;
      case 1:
        return <OptionsLayout />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Nav tabs className="mb-2">
        {tabs.map((tab) => (
          <NavItem key={tab.id}>
            <NavLink
              active={activeTab === tab.id}
              onClick={() => toggleTab(tab.id)}
              style={{ cursor: "pointer" }}
            >
              {tab.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      {renderTabContent()}
    </div>
  );
};
