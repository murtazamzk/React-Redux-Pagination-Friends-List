import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      showSearchInfo: false
    };
  }

  componentDidUpdate(prevState,prevProps) {
      if(this.props.keyword !== prevProps.keyword){
        this.setState({
            keyword: this.props.keyword,
            showSearchInfo: true
          });
      }
  }

  onHandleChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    },() => {
        this.props.onSearch(value);
    });
  };

  onSearch = e => {
    e.preventDefault();
    this.props.onSearch(this.state.keyword);
  };

  clearSearch = () => {
    this.props.onSearch("");
    this.setState({
      keyword: "",
      showSearchInfo: false
    });
  };

  render() {
    return (
        <div className="relative sm:ml-2">
            <form onSubmit={this.onSearch}>
                <input onChange={this.onHandleChange} name="keyword" type="text" value={this.state.keyword} className="shadow rounded w-full sm:w-auto border-0 p-3 pr-10" placeholder="Search by name..." />
                <button onClick={this.clearSearch} className="absolute top-1 right-0 mt-3 mr-4">
                    <svg className="h-4 text-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                </button>
            </form>
        </div>
    );
  }
}

export default Search;
