import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Thumbnail = styled.div`
  padding: 0;
  img {
    width: 100%;
    height: 200px;
    padding-top: 10px;
  }
  .caption(padding: 9px;);
`;


class Body extends Component {
  render() {
    // const token = localStorage.getItem('token');
    // if (!token)
    return (
      <div className="col-md-3 col-sm-6">
          <Thumbnail>
            <img alt="" src={this.props.obj.image} />
            <div>
              <h4>{this.props.obj.name}</h4>
            </div>

            <p>
                <Link
                  to={'/campgrounds/' + this.props.obj._id + '/show'}
                  className="btn btn-purple"
                >
                  More info
                </Link>
              </p>
          </Thumbnail>    
        </div>    
    );
  }
}

export default Body;

