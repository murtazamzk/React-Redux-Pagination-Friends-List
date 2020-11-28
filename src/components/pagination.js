import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: "",
      pageLimit: "",
      totalPages: "",
      currentPage: "",
      initialPage: "",
      pagesToShow: ""
    };
  }

  componentDidMount() {
    this.setState({
      totalRecords: this.props.totalRecords,
      pageLimit: this.props.pageLimit || 4,
      totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit),
      pagesToShow: this.props.pagesToShow || 7,
      currentPage: this.props.initialPage || 1
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.totalRecords !== prevState.totalRecords || this.state.pageLimit !== prevState.pageLimit) {
      this.setPage(this.state.currentPage);
    }
    if(prevProps.totalRecords !== this.props.totalRecords){
      this.setState({
        totalRecords: this.props.totalRecords,
        pageLimit: this.props.pageLimit || 4,
        totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit),
        pagesToShow: this.props.pagesToShow || 7
      });
    }
  }

  setPage(page) {
    var { totalRecords, pageLimit, totalPages } = this.state;

    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    this.setState({
      currentPage: page
    });

    var startIndex = (page - 1) * pageLimit;
    var endIndex = Math.min(startIndex + pageLimit - 1, totalRecords - 1);

    this.props.onChangePage({
      pageLimit,
      totalPages,
      page,
      startIndex,
      endIndex
    });
  }

  getPager() {
    var { pagesToShow, currentPage, totalPages } = this.state;
    var pages = [],
      startFromNumber;

    if (totalPages <= pagesToShow) {
      startFromNumber = 1;
      pagesToShow = totalPages;
    } else {
      if (currentPage <= Math.ceil(pagesToShow / 2)) {
        startFromNumber = 1;
      } else if (
        currentPage + Math.floor((pagesToShow - 1) / 2) >=
        totalPages
      ) {
        startFromNumber = totalPages - (pagesToShow - 1);
      } else {
        startFromNumber = currentPage - Math.floor(pagesToShow / 2);
      }
    }

    for (let i = 1; i <= pagesToShow; i++) {
      pages.push(startFromNumber++);
    }

    return {
      currentPage,
      totalPages,
      pages
    };
  }

  render() {
    if (!this.state.totalRecords || this.state.totalPages === 1) return null;

    var pager = this.getPager();

    return (
        <div className="flex flex-col items-center my-12 pagination">
            <div className="flex text-gray-700">
                <div disabled={pager.currentPage === 1 ? true : false} className="h-12 w-12 mr-1 nav-btn flex justify-center items-center rounded-full bg-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left w-6 h-6">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </div>
                <div className="flex h-12 font-medium rounded-full bg-white">
                    {pager.pages.map((page, index) => (
                        <div onClick={() => this.setPage(page)} key={index} className={`w-12 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in  rounded-full ${pager.currentPage === page ? "text-indigo-500 " : "hover:text-indigo-500"}`}>{page}</div>
                    ))}
                </div>
                <div disabled={pager.currentPage === pager.totalPages ? true : false} className="h-12 w-12 nav-btn ml-1 flex justify-center items-center rounded-full bg-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right w-6 h-6">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  initialPage: PropTypes.number,
  pagesToShow: PropTypes.number,
  onChangePage: PropTypes.func
};

export default Pagination;