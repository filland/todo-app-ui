import React, { Component } from "react";
import "./Pagination.css";

class Pagination extends Component {
  render() {
    let current = this.props.settings.current;
    let total = this.props.settings.total;

    // pages are counted starting from zero
    // but 1 should be the first number in the pagination
    let actualCurrent = current + 1;

    let handlePaginationClick = number => {
      this.props.settings.updateCurrentPageHandler(number);
    };

    return (
      <div className="pagination">
        <div className="pagination-container">
          {current >= 3 ? (
            <>
              <div className="pagination__page">
                <span onClick={() => handlePaginationClick(0)}>First</span>
              </div>
              <div className="pagination__page">
                <span>...</span>
              </div>
            </>
          ) : null}
          {current >= 2 ? (
            <div className="pagination__page">
              <span onClick={() => handlePaginationClick(current - 2)}>
                {actualCurrent - 2}
              </span>
            </div>
          ) : null}
          {current >= 1 ? (
            <div className="pagination__page">
              <span onClick={() => handlePaginationClick(current - 1)}>
                {actualCurrent - 1}
              </span>
            </div>
          ) : null}
          <div className="pagination__current">
            <span>{actualCurrent}</span>
          </div>
          {total - actualCurrent >= 1 ? (
            <div className="pagination__page">
              <span onClick={() => handlePaginationClick(current + 1)}>
                {actualCurrent + 1}
              </span>
            </div>
          ) : null}
          {total - actualCurrent >= 2 ? (
            <div className="pagination__page">
              <span onClick={() => handlePaginationClick(current + 2)}>
                {actualCurrent + 2}
              </span>
            </div>
          ) : null}
          {total - actualCurrent >= 3 ? (
            <>
              <div className="pagination__page">
                <span>...</span>
              </div>
              <div className="pagination__page">
                <span onClick={() => handlePaginationClick(total - 1)}>
                  Last
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Pagination;
