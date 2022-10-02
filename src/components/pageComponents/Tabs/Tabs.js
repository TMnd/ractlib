/* eslint-disable max-len */
import React, {useState, useEffect, useRef, useCallback} from "react";
import Card from "../Card/Card";
import FieldSet from "../fieldSet/fieldSet";
import TabContent from "./TabContent/TabContent";
import TabNavItem from "./TabNavItem/TabNavItem";
import {PropTypes} from 'prop-types';
import './Tabs.css';

export const Tabs = ({extraInformation}) => {
  const [activeTab, setActiveTab] = useState("tab0");
  const [TabNavItemList, setTabNavItemList] = useState();

  const contentTabKeyRef = useRef();
  const tabNavSections = useRef({});

  // To be replaced with general i18n
  const dummyI18n = useCallback((key) => {
    switch (key) {
      case "windowBites":
        return "Tipo de Bites para Vidros";
      case "options":
        return "Opções";
      case "aditionalInformation":
        return "Informação adicional";
      default:
        return key;
    }
  });

  useEffect(() => {
    const contentTabKey = [];

    for (const [key] of Object.entries(extraInformation)) {
      contentTabKey.push(key);
    }

    contentTabKeyRef.current=contentTabKey;

    const setTabNavItem = contentTabKeyRef.current.map((element, index) => {
      return <TabNavItem
        key={index}
        title={dummyI18n(element)} id={`tab${index}`}
        activeTab={activeTab}
        setActiveTab={setActiveTab}/>;
    });

    const tabSection1Source = extraInformation["windowBites"];
    const tabSection1 = tabSection1Source.map((element, index) => {
      const imageRefUrl = `${(element.replaceAll(" ", "_")).toLowerCase()}.png`;
      return <Card
        key={index}
        imageRef={imageRefUrl}
        description={element}
      />;
    });

    const tabSection2Source1 = extraInformation["options"]["naturalPaper"];
    const tabSection2First = tabSection2Source1.map((element, index) => {
      return <div key={index}><li>{element}</li></div>;
    });

    const tabSection2Source2 = extraInformation["options"]["compostPaper"];
    const tabSection2Second = tabSection2Source2.map((element, index) => {
      return <div key={index}><li>{element}</li></div>;
    });


    const tabSection3Source1 = extraInformation["aditionalInformation"]["raiasTypes"];
    const tabSection3First = tabSection3Source1.map((element, index) => {
      return <div key={index}><li>{element}</li></div>;
    });

    const tabSection3Source2 = extraInformation["aditionalInformation"]["doorsType"];
    const tabSection3Second = tabSection3Source2.map((element, index) => {
      return <div key={index}><li>{element}</li></div>;
    });

    tabNavSections.current["windowBites"]=tabSection1;
    tabNavSections.current["naturalPaper"]=tabSection2First;
    tabNavSections.current["compostPaper"]=tabSection2Second;
    tabNavSections.current["raiasTypes"]=tabSection3First;
    tabNavSections.current["doorsType"]=tabSection3Second;

    setTabNavItemList(setTabNavItem);
  }, [activeTab]);

  return (
    <div className="tabs">
      <ul className="tabs--nav">
        {TabNavItemList}
      </ul>

      <div className="tab--content--body container">
        <TabContent id="tab0" activeTab={activeTab} customClass="tabSectionOne">
          {tabNavSections.current["windowBites"]}
        </TabContent>
        <TabContent id="tab1" activeTab={activeTab} customClass="tabSectionTwo">
          <FieldSet
            title="Folha Natural"
            value={tabNavSections.current["naturalPaper"]}
            customClass="tabSectionTwo_One tab--spacing"
          />
          <FieldSet
            title="Folha Composta"
            value={tabNavSections.current["compostPaper"]}
            customClass="tabSectionTwo_Two tab--spacing"
          />
        </TabContent>
        <TabContent
          id="tab2"
          activeTab={activeTab}
          customClass="tabSectionThree"
        >
          <FieldSet
            title="Tipo de Raias"
            value={tabNavSections.current["raiasTypes"]}
            customClass="tabSectionThree_One tab--spacing"
          />
          <FieldSet
            title="Tipos de Portas"
            value={tabNavSections.current["doorsType"]}
            customClass="tabSectionThree_Two tab--spacing"
          />
        </TabContent>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  extraInformation: PropTypes.object.isRequired,
};
