import React, { Component } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios';
import Spinner from './Spinner';

export class New extends Component {

    articles =  []
    
    constructor(){
        super();
        console.log("hello im constructor from Newscomponent");
        this.state = {
            articles : this.articles,
            loading: false,
            page:1

        }
    }

   async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4ea1d27f77374aecb3fb231d0204a4ad&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let response = await axios.get(url);
        // let parsedData = await data.json();
        console.log(response);

        this.setState({articles: response.data.articles, 
            totalResults: response.data.totalResults,
            loading: false})
    }

     handlePrev = async ()=> {
        console.log("previous");

        
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4ea1d27f77374aecb3fb231d0204a4ad&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let response = await axios.get(url);
        // let parsedData = await data.json();
        console.log(response);

        
        this.setState({
            page : this.state.page - 1,
            articles: response.data.articles,
            loading: false
        })
    }

     handleNext = async ()=> {
        console.log("Next");
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4ea1d27f77374aecb3fb231d0204a4ad&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let response = await axios.get(url);
        // let parsedData = await data.json();
        console.log(response);
        
        this.setState({
            page : this.state.page + 1,
            articles: response.data.articles,
            loading: false
        })
    }
    }

  render() {
    return (
        <>
        <div className="container">
            <h1>News Monkey - Top Headlines</h1>

           {this.state.loading && <Spinner/>}
            <div className="row">
            { !this.state.loading && this.state.articles.map((element)=>{
                
               return <div className="col-md-4" key={element.url}>
                    <NewsItem  title ={element.title?element.title:""} description = {element.description?element.description:""} imageUrl= {element.urlToImage?element.urlToImage:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"}
                    newsUrl={element.url}/>
                </div>
                })}
            </div>
            <div className="container d-flex justify-content-between my-3">
                <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext} >Next &rarr;</button>
            </div>
        </div>
        </>
    )
  }
}

export default New