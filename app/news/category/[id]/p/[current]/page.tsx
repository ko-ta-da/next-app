import { notFound } from "next/navigation";
import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";

interface Props {
    params: Promise<{ id: string, current: string }>;
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    const { current } = await params;

    const currentNum = parseInt(current, 10);

    if(Number.isNaN(currentNum) || currentNum < 1){
        notFound();
    }

    const category = await getCategoryDetail(id).catch(notFound);

    const { contents: news, totalCount } = await getNewsList({
        filters: `category[equals]$(category.id)`,
        limit: NEWS_LIST_LIMIT,
        offset: NEWS_LIST_LIMIT * (currentNum - 1),
    });

    if(news.length === 0){
        notFound();
    }

    return (
        <>
            <NewsList news={news} />
            <Pagination 
                totalCount={totalCount}
                current={currentNum}
                basePath = {`/news/category/${category.id}`}
            />
        </>
    );
}