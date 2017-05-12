import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchPlanets } from 'redux/modules/info';
import { push } from 'react-router-redux';

@connect(
  state => ({
    loginData: state.info.loginData,
    login: state.info.login,
    searchData: state.info.searchData
  }), { searchPlanets, pushState: push })

export default class StarwarsSearch extends Component {
  static propTypes = {
    searchPlanets: PropTypes.func,
    loginState: PropTypes.func,
    loginData: PropTypes.object,
    login: PropTypes.bool,
    pushState: PropTypes.func.isRequired,
    searchData: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      sortedData: []
    };
  }
  componentDidMount() {
    // if (this.props.login === 'false') {
    //   this.props.pushState('/Starwars');
    // }
  }
  doSearch() {
    this.props.searchPlanets(this.refs.searchit.value).then(() => {
      this.setState({
        sortedData: this.props.searchData.results.sort((aa, bb) => {
          return parseFloat(aa.population) - parseFloat(bb.population);
        })
      });
    });
  }
  render() {
    console.log(this.state.sortedData);
    return (
      <div className="container">
        <div className="form-horizontal">
          <div className="alert alert-success text-center">Welcome <b>{'abc' || this.props.loginData.results[0].name}</b> ! </div>
          <div className="form-group">
            <label htmlFor="search" className="col-sm-4 control-label">Search Planets :</label>
            <div className="col-sm-6">
              <input ref="searchit" type="text" className="form-control" placeholder="Search here..." onKeyUp={this.doSearch.bind(this)} />
            </div>
          </div>
        </div>
        {this.state.sortedData.map((data, index) => {
          return (<div className="col-sm-offset-3 col-sm-6" style={{ fontSize: 10 + index }}>
            <h3>sfsdfsdfsdfs, {data.name}</h3>
            <p><b>Population: {data.population}</b></p>
            <p>IUKUJ SADKJBSF KJSBDFSD FKJSBFSD KJB</p>
          </div>);
        })}
      </div>
    );
  }
}
