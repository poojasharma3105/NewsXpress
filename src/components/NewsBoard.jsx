import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = `http://api.mediastack.com/v1/news?access_key=${import.meta.env.VITE_NEWS_API_KEY}&keywords=${category}&languages=en&sort=published_desc`;

                const res = await fetch(url);
                const data = await res.json();

                if (data.data) {
                    setArticles(data.data); // Mediastack returns 'data', not 'articles'
                } else {
                    console.error("Error fetching news:", data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [category]);

    return (
        <div>
            <h2 className="text-center mb-4">
                Latest <span className="badge bg-danger">News</span>
            </h2>

            {loading ? (
                <p className="text-center">Loading news...</p>
            ) : articles.length > 0 ? (
                articles.map((news, index) => (
                    <NewsItem
                        key={index}
                        title={news.title}
                        description={news.description}
                        url={news.url}
                        urlToImage={news.image}
                    />
                ))
            ) : (
                <p className="text-center text-muted">No articles found.</p>
            )}
        </div>
    );
};

export default NewsBoard;
