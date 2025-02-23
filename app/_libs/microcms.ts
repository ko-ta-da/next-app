import { createClient } from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSListContent,
} from "microcms-js-sdk";

export type Member = {
    name: string;
    position: string;
    profile: string;
    image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
    name: string;
} & MicroCMSListContent;

export type News = {
    title: string;
    description: string;
    content: string;
    thumbnail?: MicroCMSImage;
    category: Category;
} & MicroCMSListContent;


// 環境変数のチェック
if(!process.env.MICROCMS_SERVICE_DOMAIN){
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if(!process.env.MICROCMS_API_KEY){
    throw new Error("MICROCMS_API_KEY is required");
}


// microCMSのクライアントを作成
const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
});

// membersエンドポイントからメンバー一覧を取得する関数
export const getMembersList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Member>({
        endpoint: "members",
        queries,
    });
    return listData;
};

// newsエンドポイントからニュース一覧を取得する関数
export const getNewsList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<News>({
        endpoint: "news",
        queries,
    });
    return listData;
}


export const getNewsDetail = async (contentId: string, queries?: MicroCMSQueries) => {
    const detailData = await client.getListDetail<News>({
        endpoint: "news",
        contentId,
        queries,
    });
    return detailData;
};