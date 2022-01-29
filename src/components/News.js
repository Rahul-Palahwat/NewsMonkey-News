import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

    

    constructor(){
        super();
        console.log("Hello I am a constructor from news component");
        this.state={
            articles: [],
            loading: false
        }
    }

    // to fetch data from news api 
    // and yen render ka baad run hoga 
    // async and await yha pr promise return hone ka intazzar krenge 
    async componentDidMount(){
        console.log("componentDidMount");
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=a2b8a3da6dad40c78083bcd6c04a4443";
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
    }


  render() {
    return (
      <div className="container my-3">
        <h1>NewMonkey - Top Headlines</h1>
        
        <div className="row">
        {this.state.articles.map((element)=>{
            // console.log(element);
            return <div className="col-md-4"  key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
            
            
          
        </div>

        
      </div>
    );
  }
}

export default News;
