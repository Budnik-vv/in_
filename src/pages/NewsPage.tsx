import React, {useEffect} from "react";
import {newsAPI} from "../services/NewsService";
import {useParams} from "react-router-dom";
import TreeComments from "../components/Comments/TreeComments";
import {Button, CircularProgress} from "@mui/material";
import './index.css';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {commentSlice} from "../store/reducers/CommentSlice";
import {history} from "../App";

const NewsPage = () => {
    const { newsId } = useParams<{newsId: string}>();
    const { openedComments } = useAppSelector(state => state.commentReducer);
    const [trigger, {data: item, error, isFetching}] =  newsAPI.endpoints.fetchOneNews.useLazyQuery();
    const dispatch = useAppDispatch();
    const {clear} = commentSlice.actions;

    useEffect(() => {
        trigger(newsId);
        return () => {
            dispatch(clear());
        }
    }, []);

    if (isFetching) return <div className="progress">
        <CircularProgress></CircularProgress>
    </div>;
    if (error) return <div>Ошибка при загрузке данных</div>;

    return <div>
    <div className="button">
    <Button onClick={() => history.push('/news')}>список новостей</Button>
    <Button onClick={() => trigger(newsId)}>Обновить комментарии</Button>
    </div>
    <div className="comment">
        <h3 style={{margin: 0}}>{item?.title}</h3>
        <div className="post-bottom-info">
            {`${item?.score} points by ${item?.by} ${item?.time} | ${item?.kids?.length || 0} comments`}
        </div>
        <a style={{marginTop: '10px', display: 'block'}} href={item?.url}>{item?.url}</a>
        <h4>Комментарии {item?.kids ? `(${item.kids.length})` : ''}</h4>
        {item?.kids ?
            <TreeComments active={openedComments} data={item.kids}/> :
            <div>Нет комментариев</div>}
    </div>
    </div>
}

export default NewsPage;
