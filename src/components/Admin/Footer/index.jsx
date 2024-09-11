import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { InfoTab } from "./Information";
import { QuickLinksTab } from "./QuickLinks";
import { AddressTab } from "./Address";
import {LocationTab} from "./Location";

const tabs = [
  { id: 0, label: "Information" },
  { id: 1, label: "Quick Links" },
  { id: 2, label: "Address" },
  { id: 3, label: "Location" },
];

export const FooterSettings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <InfoTab />;
      case 1:
        return <QuickLinksTab />;
      case 2:
        return <AddressTab />;
	  case 3:
		return <LocationTab/>;
      default:
        return null;
    }
  };

  return (
    <div>
      <Nav tabs>
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
