import React, { Component } from "react";

export class NewsItem extends Component {

    

  render() {
      
    let {title,description,imageUrl,newsUrl}=this.props;

    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={imageUrl?imageUrl:"https://cdn.pixabay.com/photo/2022/01/25/16/01/sky-6966721_1280.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
