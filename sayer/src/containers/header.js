import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {windowState} from '../actions';


class Header extends PureComponent{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <header>
        {this.props.windowReducer.active == 'items' ? (
          <div className="header-wraper">
            <h1>Sayer</h1>
            <h3>{"World's most used time waster"}</h3>
          </div>
        ) : this.props.windowReducer.active == 'newItem' ? (
          <div className="header-wraper">
            <button type="button" onClick={() => this.props.windowState('items')}>←</button>
            <h2>Create New Item</h2>
          </div>
        ) : (
          <div className="header-wraper">
            <button type="button" onClick={() => this.props.windowState('items')}>←</button>
            <h2>{this.props.itemReducer.item.name}</h2>
          </div>
        )}
      </header>
    );
  }
}

function mapStateToProps(state){
  return {
    windowReducer: state.windowReducer,
    itemReducer: state.itemReducer
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    windowState: windowState
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
