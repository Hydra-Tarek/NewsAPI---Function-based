import React, { useEffect , useState } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  
  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

   
  
  const updateNews = async()=>{
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data=await fetch(url);
    let parsedData=await data.json();
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
  }
  useEffect(() => {
     document.title=`${capitalizeFirstLetter(props.category)}-Newsmonkey`
    updateNews()
  }, [])
  
  
   const fetchMoreData = async () => {
     const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
     
     setpage(page+1)
    let data=await fetch(url);
    let parsedData=await data.json();
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)

    };
  
  

    return (
      
      <div className="container my-3">
        <h2 className="text-center my-6" style={{ marginTop: "80px" }}>NewsTarek- {capitalizeFirstLetter(props.category)} Top Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}
        > 
        <div className="container">
        <div className="row">
          {articles.map((element,index)=>{
            return <div className="col-md-4"  key={index} >
             <Newsitems title={element.title?element.title.slice(0,20):""} description={element.description?element.description.slice(0,85):""} imageUrl={element.urlToImage} newsUrl={element.url}
             author={element.author} date={element.publishedAt} source={element.source.name}/>
           </div>
          })}
          
          </div>
          </div>
          </InfiniteScroll>  
        </div>
      
        
    );
  }



News.defaultProps={
  country:'us',
  pageSize:3,
  category:'general'

}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News;
