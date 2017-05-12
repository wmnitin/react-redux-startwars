import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { starWarsLogin, loginState } from 'redux/modules/info';
import { push } from 'react-router-redux';

@connect(
  state => ({
    loginData: state.info.loginData,
    login: state.info.login
  }), { starWarsLogin, loginState, pushState: push })

export default class StarWars extends Component {
  static propTypes = {
    starWarsLogin: PropTypes.func,
    loginState: PropTypes.func,
    loginData: PropTypes.object,
    login: PropTypes.bool,
    pushState: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
  }
  dologin() {
    this.props.starWarsLogin(this.refs.username.value).then(() => {
      if (this.props.loginData.count > 0) {
        this.props.loginData.results.map((data) => {
          if (data.birth_year === this.refs.password.value && data.name === this.refs.username.value) {
            this.props.loginState('true');
            return this.props.pushState('/StarwarsSearch');
          }
        });
      }
      if (this.props.login !== 'true') {
        this.props.loginState('error');
      }
    });
  }
  render() {
    return (
      <div className="container">
        {this.props.login !== 'true' && <div>
          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputEmail3" className="col-sm-4 control-label">CHARACTER NAME :</label>
              <div className="col-sm-6">
                <input ref="username" type="text" className="form-control" placeholder="username" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword3" className="col-sm-4 control-label">DOB :</label>
              <div className="col-sm-6">
                <input ref="password" type="password" className="form-control" name="password" id="password" placeholder="Password" required />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-4 col-sm-6">
                <button type="submit" onClick={this.dologin.bind(this)} className="btn btn-PRIMARY">Sign in</button>
              </div>
            </div>
          </div>
        </div>}
        <div>
          {this.props.login === 'error' && <div className="alert alert-danger">Incorrect Username & Password !</div>}
        </div>
      </div>
    );
  }
}
