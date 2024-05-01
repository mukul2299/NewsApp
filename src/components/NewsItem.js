import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(){
        super();
        console.log("NewsItem Component constructor")
    }
    render() {
     let {title,image,desc,newsUrl}=this.props;
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src={image?image:"https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"} height="150px" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 height="80px" className="card-title">{title===null? "Untitled":title.length>55 ? title.slice(0,55)+"...":title}</h5>
                        <p height="100px" className="card-text">{desc===null? "No Description":desc.length>83 ? desc.slice(0,83)+"...":desc}</p>
                        <a href={newsUrl} ref="noreferrer" target='_blank' className="btn btn-sm btn-primary">more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
