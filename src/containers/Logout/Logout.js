// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// class logout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       redirect: false,
//     };
//     this.logout = this.logout.bind(this);
//   }
 
//   componentDidMount() {
//     if (localStorage.getItem('token')) {
//       console.log('Call User feed');
//     } else {
//       this.setState({ redirect: false });
//     }
//   }

//   logout() {
//     localStorage.setItem('token', '');
//     localStorage.clear();
//     this.setState({ redirect: true });
//   }

//   render() {
//     if (this.state.redirect) {
//       return <Redirect to={'/login'} />;
//     }

//     return (
//       <div>
//         <button onClick={this.logout}>logout</button>
//       </div>
//     );
//   }
// }

// export default logout;
