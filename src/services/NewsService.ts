import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {INews} from "../models/INews";
import http from "../http-common"
import {BASE_URL} from "../config";
import { formatDistance } from 'date-fns'
import {IComment} from "../models/IComment";


const getItem = async (id: number) => {
    try {
        const story = await http.get(`/item/${id}.json`);
        return story.data;
    } catch (error) {
        console.log('Error while getting a story.');
    }
};

const convertDate = (time: number) => formatDistance(new Date(time * 1000), new Date(), { addSuffix: true });

export const newsAPI = createApi({
    reducerPath: 'newsAPI',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['get'],
    endpoints: (build) => ({
        fetchAllNews: build.query<INews[], number>({
            query: () => ({
                url: `/topstories.json`
            }),
            // @ts-ignore
            transformResponse: async (response: number[]): INews[] => {
                try {
                    let news = await Promise.all(response.slice(0, 100).map(getItem));
                    news = news.sort((a, b) => {
                        return b.time - a.time;
                    });
                    news = news.map(item => ({...item, time: convertDate(item.time)}))
                    return news;
                } catch (error) {
                    console.log('Error while getting list of stories.');
                    return [];
                }
            }
        }),
        fetchOneNews: build.query<INews, string>({
            query: (id) => ({
                url: `/item/${id}.json?print=pretty`
            }),
            // @ts-ignore
            transformResponse: async (news: INews): INews | object => {
                try {
                    news.time = convertDate(+news.time);
                    if (!news.kids) return news
                    let comments = await Promise.all(news.kids.map(getItem));
                    news.kids = comments;
                    return news;
                } catch (error) {
                    console.log('Error while getting list of stories.');
                    return {};
                }
            }
        }),
        loadComments: build.query<IComment[], number[]>({
            // @ts-ignore
            queryFn: async (commentIds, _queryApi, _extraOptions, baseQuery) => {
                try {
                    const results = await Promise.all(commentIds.map(getItem));
                    return {data: results};
                } catch (e) {
                    return {error: e};
                }
            }
        })
    })
})
