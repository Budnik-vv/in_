import React, {useEffect} from "react";
import {commentSlice} from "../../store/reducers/CommentSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {newsAPI} from "../../services/NewsService";
import {Button} from "@mui/material";
import {CircularProgress} from "@mui/material";
interface ITreeComments {
    data: any[],
    active: number[];
    level?: number;
    load?: boolean;
}

const TreeComments = (props: ITreeComments) => {
    const {data, active, level = 1, load} = props;
    const {toggle, saveComments} = commentSlice.actions;
    const dispatch = useAppDispatch();
    const { commentsData } = useAppSelector(state => state.commentReducer);
    const [trigger, { isFetching, isError, data: items, error } ] = newsAPI.endpoints.loadComments.useLazyQuery();

    useEffect(() => {
        if (load && data.some(item => !commentsData[item])) {
            trigger(data);
        }
    }, []);

    useEffect(() => {
        if (load && items?.length) {
            dispatch(saveComments(items));
        }
    }, [items])

    const treeItems = load ? data.map((item) => commentsData[item] || {id: item}) : data ;

    if (isFetching || !treeItems) return <div><CircularProgress></CircularProgress></div>

    return  <>
        {treeItems.map(el => (
            <div style={{marginLeft: level * 8 + 'px', marginTop: '10px',  padding: "5px 10px", borderBottom: '1px solid lightgray'}} key={el.id}>
                <div style={{fontSize: '10px', fontWeight: "bold"}}>{el.by}</div>
                <div style={{fontSize: '12px', marginTop: '5px'}} dangerouslySetInnerHTML={{__html: el.text}} />
                {el.kids ? <Button style={{fontSize: "10px"}} size="small" color="inherit" onClick={() => dispatch(toggle(el.id))}>
                    {props.active.includes(el.id) ? "Скрыть" : "Показать ответы"}
                </Button> : null}
                {el.kids && props.active.includes(el.id) &&
                <TreeComments load={true} level={level + 1} active={active} data={el.kids}/>}
            </div>
        ))
        }
    </>
}

export default TreeComments;
