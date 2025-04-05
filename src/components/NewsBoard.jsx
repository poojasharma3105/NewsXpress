import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const today = new Date();
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                const fromDate = sevenDaysAgo.toISOString().split('T')[0];
                const proxyUrl = "https://cors-anywhere.herokuapp.com/";
                const url = `${proxyUrl}https://newsapi.org/v2/everything?q=${category}&from=${fromDate}&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;                

                const res = await fetch(url);
                const data = await res.json();
                if (data.status === 'ok') {
                    setArticles(data.articles);
                } else {
                    console.error("Error fetching news:", data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchNews();
    }, [category]);

    return (
        <div>
            <h2 className="text-center mb-4">
                Latest <span className=" badge bg-danger"> News</span>
            </h2>
            {articles.map((news, index) => (
                <NewsItem
                    key={index}
                    title={news.title}
                    description={news.description}
                    url={news.url}
                    urlToImage={news.urlToImage}
                />
            ))}
        </div>
    );
};

export default NewsBoard;
