import { getNewsList } from "@/app/_libs/microcms";
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";
import NewsList from "@/app/_components/NewsList";
import SearchField from "@/app/_components/SearchField";

interface Props {
    searchParams: Promise<{ q?: string }>;
}

export default async function Page({ searchParams }: Props) {
    const { q } = await searchParams;
    const { contents: news } = await getNewsList({
        limit: NEWS_LIST_LIMIT,
        q,
    });

    return (
        <>
            <SearchField />
            <NewsList news = {news} />
        </>
    )
}