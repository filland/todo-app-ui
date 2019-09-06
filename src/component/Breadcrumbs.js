import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Breadcrumbs extends React.Component {
  handleBreadcrumbClick = (linkID, linkUrl) => {
    console.log("breadcrumb clicked, id" + linkID + " url=" + linkUrl);
  };

  linksTemplate = () => {
    const { links } = this.props;

    let template = links.map((link, index) => {
      return (
        <span key={link.id}>
          <Link
            id={link.id}
            to={link.url}
            onClick={e => {
              //   e.preventDefault();
              this.handleBreadcrumbClick(link.id, link.url);
            }}
          >
            {link.text}
          </Link>
          {links.length - 1 != index ? (
            <this.arrowComponent></this.arrowComponent>
          ) : (
              ""
            )}
        </span>
      );
    });

    return template;
  };

  arrowComponent = () => {
    return <span> > </span>;
  };

  render() {
    return <div id="breadcrumbs" className="common">{this.linksTemplate()}</div>;
  }
}

export default Breadcrumbs;
