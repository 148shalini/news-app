import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize: 7,
    category:'general'
  }
  static propsType={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
  }
 
  constructor(props) {
    super(props);
    console.log("hello");
    this.state = {
      articles: [],
      page:1,
      loading:true,
      totalResults:0
    };
    document.title=`${this.props.category} - NewsMonkey`;
 }
  async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parsedData= await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({articles:parsedData.articles, totalArticles: parsedData.totalResults, loading:false})
    this.props.setProgress(100);

  }

  async componentDidMount(){
    // console.log('cdm');
// let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff86060394e34d96bcebfa6b81e4ab68&page=1&pageSize=${this.props.pageSize}`
// this.setState({loading:true});
// let data= await fetch(url);
// let parsedData= await data.json();
// console.log(parsedData);
// this.setState({articles:parsedData.articles, totalArticles: parsedData.totalResults, loading:false})
this.updateNews()

};
//  handlePreviousClick= async()=>{
    // console.log("previous");

    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff86060394e34d96bcebfa6b81e4ab68&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedData= await data.json();
    // console.log(parsedData);
    
    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
  //   this.setState({page:this.state.page-1})
  //   this.updateNews()
  // };

//  handleNextClick=async()=>{
    // console.log("next");
    // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff86060394e34d96bcebfa6b81e4ab68&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    //   this.setState({loading:true});
    //   let data= await fetch(url);
    //   let parsedData= await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     page:this.state.page+1,
    //     articles:parsedData.articles,
    //     loading:false
  
    //   })
    
    // }
  //   this.setState({page:this.state.page+1})
  //   this.updateNews()
  // };
 fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
       // this.setState({loading:true});
    let data= await fetch(url);
    let parsedData= await data.json();
        console.log(parsedData);
    this.setState({articles:this.state.articles.concat(parsedData.articles), totalArticles: parsedData.totalResults})
    

    
  };

     
     


  render() {
    console.log("render");
    return (
      <>
        <h1 className="text-center" style={{margin: '40px 0px', marginTop:'90px'}}>NewsMonkey-Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map ((element,index) => {
            return <div className="col-md-4" key={index}>
                <Newsitem newsUrl={element.url} title={element.title ? element.title.slice(0, 45) : ""} description={ element.description ? element.description.slice(0, 88) : ""}
                  imgUrl={element.urlToImage} author={element.author} date={element.publishedAt}
                />
              </div>
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between" >
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
  }
 