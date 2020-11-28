import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actSearchFriend, actMarkFavourite, actSortByFavourites, actDeleteFriend, actAddFriend } from "./actions/index";
import Search from './components/search';
import Pagination from "./components/pagination";
import './assets/main.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: "",
      deleteId:'',
      friend: '',
      error: '',
      sortByFavourites: false,
      deleteModal: false,
    };
  }

  componentDidMount() {
    this.setState({
      totalRecords: this.props.friends.length
    });
  }

  onSearch = keyword => {
    this.setState({
      currentPage: 1,
    });
    this.props.onSearchFriend(keyword);
    this.props.onSort(this.state.sortByFavourites);
  };

  onSort = () => {
    this.setState({
      sortByFavourites: !this.state.sortByFavourites
    },() => {
      this.props.onSort(this.state.sortByFavourites);
    });
  }

  markFavourite = (id) => {
    this.props.onMarkFavourite(id);
    this.props.onSort(this.state.sortByFavourites);
  }

  onDelete = () => {
    this.setState({
      deleteId: '',
      deleteModal: false,
    });
    this.props.onDelete(this.state.deleteId);
    this.props.onSort(this.state.sortByFavourites);
  }

  onSubmit = event => {
    event.preventDefault();
    if(this.state.friend){
      this.props.addFriend(this.state.friend);
      this.props.onSort(this.state.sortByFavourites);
      this.setState({
        friend: '',
        error: '',
      });
    }else{
      this.setState({
        error: 'Please enter a friend name'
      });
    }
  }

  onChangePage = data => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };

  render() { 
    let {
      pageLimit,
      startIndex,
      endIndex
    } = this.state;
    let { keyword, friends } = this.props;
    if(keyword.length){
      friends = friends.filter((val,i) => (
        val.name.includes(keyword.toLowerCase())
      ));
    }
    let rowsPerPage = friends.slice(startIndex, endIndex + 1);
    return (
      <div className="bg-gray-100 px-4 py-5 lg:px-0 min-h-screen sm:py-10 lg:py-15">
        <div className="max-w-md mx-auto">
          <div className="sm:flex pb-4 border-b items-center justify-between mb-4">
            <h2 className="text-md md:text-lg mb-3 sm:mb-0">My Friends List</h2>
            <Search
              onSearch={this.onSearch}
              keyword={this.props.keyword}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="sm:flex justify-between items-start my-5">
              <div className="w-full">
                <input onChange={e => this.setState({friend: e.target.value})} value={this.state.friend} type="text" className="w-full bg-purple-white shadow rounded border-0 p-3 pr-10" placeholder="Add New Friend" />
                {this.state.error ? <p className="text-red-600 text-sm mt-1">{this.state.error}</p> : null }
              </div>
              <button className="w-full sm:w-auto mt-3 sm:mt-0 px-6 py-3 sm:ml-3 bg-indigo-500 hover:bg-indigo-600 rounded border-0 shadow text-white" type="submit">Add</button>
            </div>
          </form>
          <div className="mb-5">
            <label className="cursor-pointer inline-flex items-center mt-3">
                <input checked={this.state.sortByFavourites} onChange={this.onSort} type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
                <span className="ml-2 text-gray-700">Show Favourites on top</span>
            </label>
          </div>

          {friends && friends.length ? rowsPerPage.map((friend,index) => (
            <div key={index} className="flex bg-white shadow rounded-lg mb-5">
              <div className="flex items-start px-4 py-6 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="user flex items-center justify-between">
                    <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={"https://picsum.photos/200?id="+friend.id} alt="name" />
                    <div>
                      <h2 className="text-lg capitalize font-semibold text-gray-900 -mt-1">{friend.name}</h2>
                      <p className="text-gray-400">is a friend</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button onClick={() => this.markFavourite(friend.id)} className="mr-4">
                      <svg className={`${friend.favourite ? 'fill-current' : 'fill-transparent stroke-black'} w-7`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    </button>
                    <button onClick={() => this.setState({ deleteId: friend.id, deleteModal: true })}>
                      <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )) : <div>No friends found</div>}

          <Pagination
            totalRecords={friends.length}
            pageLimit={pageLimit || 4}
            initialPage={1}
            pagesToShow={7}
            onChangePage={this.onChangePage}
          />

      </div>

      {this.state.deleteModal && <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Delete friend
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete your friend?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={this.onDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                Delete
              </button>
              <button onClick={() => this.setState({ deleteId: '', deleteModal: false })} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div> }

    </div>
    )
  }

}

App.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      favourite: PropTypes.bool
    })
  ).isRequired,
  keyword: PropTypes.string,
  onSearchFriend: PropTypes.func.isRequired,
  onMarkFavourite: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    friends: state.friends,
    keyword: state.search
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchFriend: keyword => {
      dispatch(actSearchFriend(keyword));
    },
    onMarkFavourite: id => {
      dispatch(actMarkFavourite(id));
    },
    onSort: sort => {
      dispatch(actSortByFavourites(sort));
    },
    onDelete: id => {
      dispatch(actDeleteFriend(id));
    },
    addFriend: friend => {
      dispatch(actAddFriend(friend));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);