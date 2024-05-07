import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static propTypes = {
        pagesize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    }
    static defaultProps = {
        pagesize: 21,
        country: "in",
        category: "general"
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bec86ac18cc4d888063062b2e49206e&pagesize=${this.props.pagesize}&page=${this.state.page}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevious = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center'>NewFrog - Top Headlines</h1>
                {/* {this.state.loading && <Loader/>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.totalResults!==this.state.articles.length}
                    loader={<Loader/>}
                >
                    <div className="container my-3">
                        {<div className="row md-4 my-3">
                            {this.state.articles.filter((elem) => { return elem.title !== "[Removed]" }).map((elem) => {
                                return <div key={elem.url} className="col md-1 my-3">
                                    <NewsItem title={elem.title} desc={elem.description} image={elem.urlToImage} newsUrl={elem.url} publishedAt={elem.publishedAt} author={elem.author} />
                                </div>
                            })}
                        </div>}
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevious} class="btn btn-outline-dark">← Previous</button>
                    <button type="button" disabled={this.state.totalResults<this.state.page*this.props.pagesize} onClick={this.handleNext} class="btn btn-outline-dark">Next →</button>
                </div> */}
            </div>
        )
    }
}

export default News
