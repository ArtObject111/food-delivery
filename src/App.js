import { 
  Navigate,
  Route,
  Routes }                   from 'react-router-dom';
import                       './App.scss';
import Header                from './components/Header/Header';
import Login                 from './components/Login/Login';
import Registration          from './components/Registration/Registration';
import Menu                  from './components/Menu/Menu';
import { Checkout }          from './components/Checkout/Checkout';
import { connect }           from 'react-redux';
import { initializeAppTC }   from './redux/app-reducer';
import { Component }         from 'react';
import { Preloader }         from './common/Preloader/Preloader';
import { getAuthUserDataTC } from './redux/auth-reducer';


class App extends Component {

  componentDidMount() {
    this.props.initializeApp()
    // this.props.getAuthUserData()
  }

  render () {

    if (!this.props.isInitialized) {
      return (
        <Preloader/>
      )
    }

    return (
      <div className="app">
        <Header/>
        {this.props.isFetching ? <Preloader/> :
        <div className="app__content">
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="*" element={<div>404 NOT FOUND</div>}/>
          </Routes>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isInitialized: state.app.isInitialized,
  isFetching:    state.app.isFetching
})

export default connect(mapStateToProps, {
  initializeApp:   initializeAppTC,
  getAuthUserData: getAuthUserDataTC
})(App)
