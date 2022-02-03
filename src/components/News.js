import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps={
      country: 'in',
      pageSize:8,
      category:'general'
    }

    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }

    capitalFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props){
        super(props);
        console.log("Hello I am a constructor from news component");
        this.state={
            articles: [],
            loading: true,
            page:1,
            totalResults:0
        }
        document.title=`NewsMonkey - ${this.capitalFirstLetter(this.props.category)}`;
    }

    // this is to remove al the extra lines of code from next prev and mount functions 
    async updateNews(){
      // console.log("componentDidMount");
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2b8a3da6dad40c78083bcd6c04a4443&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({
          loading:true
        });
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles , totalArticles:parsedData.totalResults, loading:false})
    }



    // to fetch data from news api 
    // and yen render ka baad run hoga 
    // async and await yha pr promise return hone ka intazzar krenge 
    async componentDidMount(){
        this.updateNews();
    }

    fetchMoreData = async () => {
      this.setState({page: this.state.page+1});
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2b8a3da6dad40c78083bcd6c04a4443&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: this.state.articles.concat(parsedData.articles) , totalArticles:parsedData.totalResults})
        
    };


    // // functions to handle clicks
    // handleNextClick = async ()=>{
    // this.setState({page: this.state.page + 1});
    // this.updateNews();

    // } 
    // handlePrevClick=async()=>{
    //   this.setState({page: this.state.page - 1});
    //   this.updateNews();
    // }

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewMonkey - Top {this.capitalFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

          
        <div className="row">
        {this.state.articles.map((element)=>{
            // console.log(element);
            return <div className="col-md-4"  key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page +1 >Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div> */}
        
      </>
    );
  }
}

export default News;
