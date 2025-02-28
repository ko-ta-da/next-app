import { notFound } from "next/navigation"; 
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { draftKey?: string };
}) {
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.draftKey,
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