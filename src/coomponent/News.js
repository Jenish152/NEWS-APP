import React, { Component } from "react";
import Loading from "./Loading";
import Newsitem from "./Newsitem";
import InfiniteScroll from 'react-infinite-scroll-component';




export default class News extends Component {
    // static defaultprops={
    //   country:'in',
    //   pagesize:6
    // }
  
    constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1,
      
    };
    document.title=`${this.convertfirstlettertoupper(this.props.category)}-news`;
  }
  updatenews=async ()=>{
    this.props.setprogress(10);
    let url=`https://newsapi.org/v2/everything?q=${this.props.category}&from=2022-01-02&sortBy=publishedAt&apiKey=5cdb054255e84e8f9e66e8e6081995af&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true}); 
    let data=await fetch(url);
    this.props.setprogress(40);
    let parcedata=await data.json();
    this.props.setprogress(70);
    this.setState({articles:parcedata.articles,totalresult:parcedata.totalresult,
    loading:false});
    this.props.setprogress(100);
  }
  async componentDidMount(){
    this.updatenews();
  }
   handlenext = async ()=>{
    this.setState({page: this.state.page+1});
    this.updatenews();
  }
  handleprevious = async ()=>{
    this.setState({page: this.state.page-1});
    this.updatenews();
  }
  convertuppercase=(str)=>{
    return str.toUpperCase();
  }
  convertfirstlettertoupper=(str)=>{
    return str.charAt(0).toUpperCase()+str.slice(1);
  }
  afetchmoredata= async ()=>{
    this.setState({page:this.state.page+1});
    let url=`https://newsapi.org/v2/everything?q=${this.props.category}&from=2022-01-02&sortBy=publishedAt&apiKey=5cdb054255e84e8f9e66e8e6081995af&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true}); 
    let data=await fetch(url);
    let parcedata=await data.json();
    this.setState({articles: this.state.articles.concat(parcedata.articles),totalresult:parcedata.totalresult,
    loading:false});
  }
  render() {
    
    return (
      <>
        
          <h2 className="text-center"> <b>{this.convertuppercase(this.props.category)}</b> TOP-HEADLINE</h2>
          {/* {this.state.loading && <Loading/>} */}
          <InfiniteScroll
  dataLength={this.state.articles.length} //This is important field to render the next data
  next={this.afetchmoredata}
  hasMore={this.state.articles.length !== this.state.totalresult}
  loader={<Loading/>}>
    <div className="container">
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div  className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                  
                </div>
              );
            })}
          </div> 
          </div>
          </InfiniteScroll>
        
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1}  onClick={this.handleprevious} className="btn btn-danger">&larr; PREVIOUS</button>  
         <button type="button" disabled={this.state.page+1 > Math.ceil(this.totalresult/this.props.pagesize)} onClick={this.handlenext} className="btn btn-success">NEXT &rarr;</button> 
        </div>
      </>
    );
  }
}
