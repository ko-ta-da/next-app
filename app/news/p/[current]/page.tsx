import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";

interface Props {
    params: Promise<{ current: string }>;
};

export default async function Page({ params }: Props) {
    const { current } = await params;
    const currentNum = parseInt(current, 10);

    const { contents: news, totalCount } = await getNewsList({
        limit: NEWS_LIST_LIMIT,
        offset: NEWS_LIST_LIMIT * (currentNum - 1),
    });
    return (
        <>
            <NewsList news = {news} />
            <Pagination totalCount = {totalCount} current = {currentNum} />
        </>

    )
}