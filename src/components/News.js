import React, { Component } from 'react'
import NewsItem from './NewsItem';

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false

        }
    }

    async componentDidMount() {
        console.log('cdm')
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=bd5a9ea496aa420da9c3b7fcc9411673"
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResult: parsedData.totalResult })
        // this.setState({articals : parsedata.articals})
    }

    handleperviousclick = async () => {
        console.log("previous   ")
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bd5a9ea496aa420da9c3b7fcc9411673&page=${this.state.page - 1}pageSize=20`
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handlenextclick = async () => {
        console.log("next   ")
        if (this.state.page + 1 > Math.ceil(this.state.totalResult / 20)) {

        } else {

            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bd5a9ea496aa420da9c3b7fcc9411673&page=${this.state.page + 1}&pageSize=20`
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData)
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h2>Top Headlines</h2>

                    <div className="row my-3">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsurl={element.url} />
                            </div>
                        })}
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button type="button" class="btn btn-dark" onClick={this.handleperviousclick}>Previous</button>
                        <button type="button" class="btn btn-dark" onClick={this.handlenextclick}>Next</button>


                    </div>

                </div>
            </>
        )
    }
}

export default News
