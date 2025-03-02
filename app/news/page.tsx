import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import SearchField from "@/app/_components/SearchField";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";

export const revalidate = 60; // revalidateとは、キャッシュの保持時間を秒単位で指定するものです。0を指定すると、キャッシュを使わず毎回最新のデータをオリジンサーバーから取得します。１以上にするとISRになる。

export default async function Page() {
    const { contents: news, totalCount } = await getNewsList({
        limit: NEWS_LIST_LIMIT,
    });
    return (
        <>
            <SearchField />
            <NewsList news = {news} />
            <Pagination totalCount = {totalCount} />
        </>
    );
}