import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Navbar, Form, Button } from 'react-bootstrap';
import HomeBar from './HomeBar';
import Search from './Search';
import ItemTemplate from './ItemTemplate'

export default class SearchResults extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: '',
      results: []
    }
  }

  componentDidMount() {
    if (this.props.match.params.query)
      this.setState({ query: this.props.match.params.query }, () => console.log('query: ' + this.state.query))
    axios.get(`/items/${this.props.match.params.query}`)
    .then(({ data }) => {
      console.log(data.items)
      this.setState({
        results: data.items
      })
    })
  }

  render() {
    for (var i = 0; i < this.state.results.length; i++)
      console.log(this.state.results[i].name)
    return (
      <div>
        <HomeBar />
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Spartan Sells</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form   inline>
              <Search />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        Results for '{this.state.query}' <br /><br />
        <div id="itemContainer">
        {this.state.results.map(result => (
          <Link key={result.name} to={{
            pathname: '/SearchResult', 
            state: { 
              result : result
            }
          }}>
            {/* <label> 
              name: {result.name} <br />
              description: {result.description} <br />
              price: ${result.price}
            </label> */}
            <ItemTemplate {...result} />
          </Link>
        ))}
        </div>
      </div>
    );
  }
}