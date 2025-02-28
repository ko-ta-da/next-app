import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";

type Props = {
    params: {
        current: string;
    }
}

export default async function Page({ params }: Props) {
    const current = parseInt(params.current, 10);

    const { contents: news, totalCount } = await getNewsList({
        limit: NEWS_LIST_LIMIT,
        offset: NEWS_LIST_LIMIT * (current - 1),
    });
    return (
        <>
            <NewsList news = {news} />
            <Pagination totalCount = {totalCount} current = {current} />
        </>

    )
}