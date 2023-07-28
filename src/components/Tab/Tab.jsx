import ProductDetailReview from "@/pages/ProductDetail/ProductDetailReview";
import React, { createContext, useContext, useState } from "react";

const TabContext = createContext({});
const Tab = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const onChangeActiveTab = (index) => {
    setActiveTab(index);
  };
  console.log("activeTab", activeTab);
  return (
    <TabContext.Provider value={{ activeTab, onChangeActiveTab }}>
      <div className="product-details-tab">{children}</div>
    </TabContext.Provider>
  );
};
const TabHeader = ({ children }) => {
  const { activeTab, onChangeActiveTab } = useContext(TabContext);
  return (
    <ul className="nav nav-pills justify-content-center" role="tablist">
      {React.Children.map(children, (item, index) => {
        if (item?.type?.name === "TabHeaderItem") {
          return React.cloneElement(item, {
            isActive: activeTab === index,
            onClick: () => {
              onChangeActiveTab(index);
            },
          });
        }
      })}
    </ul>
  );
};
const TabHeaderItem = ({ children, isActive, onClick }) => {
  return (
    <li onClick={onClick} className="nav-item">
      <a className={`nav-link   ${isActive ? "active" : ""}`}>{children}</a>
    </li>
  );
};
const TabContent = ({ children }) => {
  const { activeTab } = useContext(TabContext);
  return (
    <div className="tab-content">
      {React.Children.map(children, (item, index) => {
        if (item?.type?.name === "TabContentItem") {
          return React.cloneElement(item, {
            isActive: activeTab === index,
          });
        }
      })}
    </div>
  );
};
const TabContentItem = ({ children, isActive }) => {
  return (
    <div className={`tab-pane fade ${isActive ? "show active" : ""}`}>
      {children}
    </div>
  );
};
Tab.Header = TabHeader;
Tab.HeaderItem = TabHeaderItem;
Tab.Content = TabContent;
Tab.ContentItem = TabContentItem;
export default Tab;
