import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';

export class News extends Component {
    
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page:1,
            totalResults:0
        }
    }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9bec86ac18cc4d888063062b2e49206e&pagesize=${this.props.pagesize}&page=${this.state.page}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            page:1,
            loading:false
        });
    }

    handlePrevious= async()=> {
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9bec86ac18cc4d888063062b2e49206e&pagesize=${this.props.pagesize}&page=${this.state.page-1}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({
            articles:parsedData.articles,
            page: this.state.page-1,
            loading:false
        });
    }

    handleNext=async() =>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9bec86ac18cc4d888063062b2e49206e&pagesize=${this.props.pagesize}&page=${this.state.page+1}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData= await data.json();
        this.setState({
            articles:parsedData.articles,
            page: this.state.page+1,
            loading:false
        });
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center'>NewFrog - Top Headlines</h1>
                {this.state.loading && <Loader/>}
                <div className="container my-3">
                {!this.state.loading && <div className="row md-4 my-3">
                        { this.state.articles.filter((elem)=>{ return elem.title!=="[Removed]"}).map((elem) => {
                            return <div key={elem.url} className="col md-1 my-3">
                                <NewsItem title={elem.title} desc={elem.description} image={elem.urlToImage} newsUrl={elem.url} />
                            </div>
                        })}
                    </div>}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevious} class="btn btn-outline-dark">← Previous</button>
                    <button type="button" disabled={this.state.totalResults<this.state.page*this.props.pagesize} onClick={this.handleNext} class="btn btn-outline-dark">Next →</button>
                </div>
            </div>
        )
    }
}

export default News
