import React, {useCallback, useEffect} from "react";
import {newsAPI} from "../services/NewsService";
import {history} from "../App";
import {Button} from "@mui/material";
import {CircularProgress} from "@mui/material";
import './index.css';
import {REFRESH_NEWS_TIME_INTERVAL} from "../config";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {newsSlice} from "../store/reducers/NewsSlice";


const NewsListPage = () => {
    const [trigger, { isFetching, isError, data: news, error } ] = newsAPI.endpoints.fetchAllNews.useLazyQuery({
        pollingInterval: REFRESH_NEWS_TIME_INTERVAL
    });
    const { news: newsCache } = useAppSelector(state => state.newsReducer);
    const dispatch = useAppDispatch();
    const {set} = newsSlice.actions;

    const refresh = useCallback(() => trigger(100), []);

    useEffect(() => {
        !newsCache.length && refresh()
    }, []);

    useEffect(() => {
        news && dispatch(set(news));
    }, [news])

    if (isFetching) return <div className="progress">
        <CircularProgress></CircularProgress>
    </div>
    if (error) return <div>Ошибка при загрузке данных</div>

    return <div>
        <div className="button">
            <Button onClick={refresh}>Обновить новости</Button>
        </div>
        <ol className="post">
            {
                newsCache?.map(item => (<li
                    key={item.id}
                    onClick={() => {
                        history.push(`/news/${item.id}`)
                    }}>
                    <div style={{padding: "5px 10px", marginBottom: '10px'}}>
                        <div className="post-top-info">
                            {item.title}
                        </div>
                        <div className="post-bottom-info">
                            {`${item.score} points by ${item.by} ${item.time} | ${item.kids?.length || 0} comments`}
                        </div>
                    </div>
                </li>))
            }
            </ol>
    </div>
}

export default NewsListPage;
