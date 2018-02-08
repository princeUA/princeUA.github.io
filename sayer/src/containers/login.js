import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fireDb, storageRef} from '../firebase';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      isRegister: false,
      placeholder: './placeholder.png'
    }
  }
  login(){
    const username = this.state.username;
    const password = this.state.password;
    fireDb.ref('users/' + username).once('value').then(function(snapshot) {
      if(bcrypt.compareSync(password, snapshot.val().password)){
        const user = {
          username: snapshot.val().username,
          avatar: snapshot.val().avatar
        }
        const SECRET = 'jhg2341234jg234g32h414asdf6assdfasd7f';
        const token = jwt.sign(
          {
            user: _.pick(user, ['username', 'avatar']),
          },
          SECRET,
          {
            expiresIn: '5h'
          }
        );
        localStorage.setItem('sayerToken', token);
        document.location.reload();
      }
    });

  }
  register(){
    if(this.state.username && this.state.password){
      const user = {
        username: this.state.username,
        password: this.state.password,
        avatar: this.state.placeholder
      }

      var salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);

      fireDb.ref('users/' + user.username).set(user);
      this.setState({
        isRegister: false,
        username: '',
        password: ''
      });
    }
  }

  registerPage(e){
    e.preventDefault();
    this.setState({
      isRegister: true
    });
  }

  loginPage(e){
    e.preventDefault();
    this.setState({
      isRegister: false
    });
  }
  onInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  uploadImg(e){
    e.preventDefault();
    const imageRef = storageRef.child(this.uploads.files[0].name);
    imageRef.put(this.uploads.files[0]).then((img) => {
      this.setState({placeholder: img.metadata.downloadURLs[0]});
    }).catch(function(error) {
      console.log(error);
    });
  }

  render(){
    return(
      <div>
        <div className={this.state.isRegister ? "login-wraper hidden" : "login-wraper"}>
          <div className="login-page">
            <div className="login-block">
              <input type="text" name="username" placeholder="username" onChange={(e) => this.onInputChange(e)}/>
              <input type="password" name="password" placeholder="password" onChange={(e) => this.onInputChange(e)}/>
              <button type="button" onClick={() => this.login()}>Log In</button>
              <span>OR</span>
              <a href="#" onClick={(e) => this.registerPage(e)}>Register</a>
            </div>
          </div>
        </div>
        <div className={this.state.isRegister ? "login-wraper" : "login-wraper hidden"}>
          <div className="login-page">
            <div className="login-block">
              <input type="text" name="username" placeholder="username" onChange={(e) => this.onInputChange(e)}/>
              <input type="password" name="password" placeholder="password" onChange={(e) => this.onInputChange(e)}/>
              <div className="upload-block">
                <img src={this.state.placeholder}/>
                <input
                  type="file" onChange={(e) => this.uploadImg(e)}
                  ref={input => {
                    this.uploads = input;
                  }}
                />
              </div>
              <button type="button" onClick={() => this.register()}>Register</button>
              <span>OR</span>
              <a href="#" onClick={(e) => this.loginPage(e)}>Login</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
