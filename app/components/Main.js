//Importing Main React
import React from "react";

// Import sub-components
import Search from "./children/Search";
import Saved from "./children/Saved";

// Help Function
import helpers from "./utils/helpers";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      results: [],
      resultToSave: {},
      saved: []
    };
    this.setTerm = this.setTerm.bind(this);
    this.setArticleToSave = this.setArticleToSave.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

//Page rendering and article history
  componentDidMount() {
  helpers.getSaved().then(function(response) {
    console.log("These are current saved articles " + response);
    if (response !== this.state.saved) {
    console.log("Saved articles", response.data);
    this.setState({ saved: response.data });
  }
  }.bind(this));
  }

componentDidUpdate(prevProps, prevState) {
  if (prevState.searchTerm !== this.state.searchTerm) {
  console.log("Search term updated.");
  helpers.runQuery(this.state.searchTerm).then((data) => {
  if (data !== this.state.results) {
  console.log("Data looks like this: " + data[0].headline.main);
  this.setState({ results: data });
        }
      });
    }
  }

  setTerm(term) {
    this.setState({
      searchTerm: term
    });
  };