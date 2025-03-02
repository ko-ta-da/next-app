import { notFound } from "next/navigation"; 
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draftKey?: string }>;
}

export const revalidate = 60;

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params; // 非同期に取得
  const { draftKey } = await searchParams; // searchParamsもPromiseで受け取る
  const data = await getNewsDetail(slug, {
    draftKey,
  }).catch(notFound);
  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}