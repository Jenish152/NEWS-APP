import React, { Component } from 'react';

export default class Newsitem extends Component {
  
  render() {
    let {title,description,imageurl,newsurl,author,date}=this.props;
    return <div>
       <div className="card my-3" style={{width: "18rem"}}>
  <img src={imageurl} alt='load img'/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'>BY {author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsurl} target="_blank">READ MORE</a>
  </div>
</div>
    </div>;
  }
}
// API KEY :5cdb054255e84e8f9e66e8e6081995af
// new Date(date).getDate()