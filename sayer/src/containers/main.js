import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {db, fireDb} from '../firebase';
import _ from 'lodash';
import {windowState, singleItem} from '../actions';

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount(){
    db.on('value', snapshot => {
      this.setState({
        items: snapshot.val()
      });
    });
      if(this.props.windowReducer.active == 'singleItem'){
        this.messagesEnd.scrollIntoView();
      }
  }
  componentDidUpdate(){
    if(this.props.windowReducer.active == 'singleItem' && this.props.itemReducer.item.comments){
      this.messagesEnd.scrollIntoView();
    }
  }

  onInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onAddItem(){
    const itemId = this.state.items ? this.state.items[this.state.items.length - 1].id + 1 : 0;
    fireDb.ref('items/' + itemId).set({
      id: itemId,
      name: this.state.newItem,
      comments: ''
    })
    this.props.windowState('items');
  }

  onChooseItem(e, item){
    if(e.target == e.currentTarget){
      this.props.windowState('singleItem');
      this.props.singleItem(item);
    }
  }
  onDeleteItem(e, item){
    if(e.target == e.currentTarget){
      fireDb.ref('items/' + item.id).remove();
    }
  }

  onAddComment(item){
    const commentId = this.state.items[item.id].comments ? this.state.items[item.id].comments[this.state.items[item.id].comments.length - 1].id + 1 : 0;
    fireDb.ref('items/' + item.id + '/comments/' + commentId).set({
      id: commentId,
      avatar: this.props.user.user.avatar,
      text: this.state.newComment
    });
  }

  render(){
    let mainContent = '';
    if(this.props.windowReducer.active == 'items' && this.state.items){
      mainContent = _.map(this.state.items, (item, i) => {
        return(
          <div key={i} className="item" item={item} onClick={(e) => this.onChooseItem(e, item)}>
            <h3>{item.name}</h3>
            <span className="counter">{item.comments.length}</span>
            <span className="delete-btn" onClick={(e) => this.onDeleteItem(e, item)}>Delete</span>
          </div>
        );
      })
    } else if(this.props.windowReducer.active == 'newItem'){
      mainContent =
        <div className="new-item-wraper">
          <input type="text"
            name="newItem"
            placeholder="New item title..."
            onChange={(e) => this.onInputChange(e)} />
          <button type="button" onClick={() => this.onAddItem()}>></button>
        </div>
      ;
    } else if(this.props.windowReducer.active == 'singleItem'){
      const coments = this.state.items[this.props.itemReducer.item.id].comments;
      mainContent = _.map(coments, (comment, i) => {
        return(
          <div key={i} className="comment" ref={ i == coments.length - 1 ? (el) => { this.messagesEnd = el; } : '' }>
            <div className="leftSide">
              <img src={comment.avatar} />
            </div>
            <div className="rightSide">
              {comment.text}
            </div>
          </div>
        );
      })
    }

    return(
      <div className="main-wraper">
        <div className={this.props.windowReducer.active == 'singleItem' ? "main-container-wraper single-page" : "main-container-wraper"}>
          <div className="main-container">
            {mainContent}
            { this.props.windowReducer.active == 'items' &&
                <div className="add-container">
                  <span
                    className="add-btn"
                    onClick={() => this.props.windowState('newItem')}
                    >+</span>
                </div>
            }
          </div>
        </div>
        {/* Comment input */}
        { this.props.windowReducer.active == 'singleItem' &&
           <div className="add-comment">
             <input type="text"
               name="newComment"
               placeholder="New Comment..."
               onChange={(e) => this.onInputChange(e)} />
             <button type="button" onClick={() => this.onAddComment(this.props.itemReducer.item)}>></button>
           </div>
        }
      </div>
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
    windowState: windowState,
    singleItem: singleItem
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
