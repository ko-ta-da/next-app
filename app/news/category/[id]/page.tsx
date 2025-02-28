import { getCategoryDetail, getNewsList } from '@/app/_libs/microcms';
import { notFound } from 'next/navigation';
import NewsList from '@/app/_components/NewsList';
import Pagination from '@/app/_components/Pagination';
import Category from '@/app/_components/Category';
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";


export default async function Page({ params }: any) {
    const category = await getCategoryDetail(params.id).catch(notFound);

    const { contents: news, totalCount } = await getNewsList({
        filters: `category[equals]${category.id}`,
        limit: NEWS_LIST_LIMIT,
    });
    return (
        <>
            <p>
                <Category category={category} /> の一覧
            </p>
            <NewsList news={news} />
            <Pagination
                totalCount={totalCount}
                basePath = {`/news/category/${category.id}`}
            />
        </>
    )
}