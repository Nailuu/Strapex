"use client";

import Article, { ArticleProps } from "@/components/Article";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import { Header } from "@/components/Header";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getStrapiData, getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { useEffect, useState } from "react";

const baseUrl = getStrapiURL();

export default function Home() {
  const [articles, setArticles] = useState<ArticleProps[] | null>(null);
  const [pagination, setPagination] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const query = qs.stringify({
      pagination: {
        page: pagination,
        pageSize: 6,
      },
      fields: ["Title", "createdAt"],
      populate: {
        Cover: {
          fields: ["url", "width", "height"],
        },
      },
      sort: "createdAt:desc",
    });

    getStrapiData("/api/articles", query)
      .then((res) => {
        const data: ArticleProps[] = [];

        res.data.forEach((e: any) => {
          const date = new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).format(new Date(e?.createdAt));

          data.push({
            id: e?.documentId,
            title: e?.Title,
            createdAt: date,
            cover: {
              url: baseUrl + e?.Cover.url,
              width: e?.Cover.width as number,
              height: e?.Cover.height as number,
            },
          })
        });

        setArticles(data);
        setPageCount(res.meta.pagination.pageCount);
      });
  }, [pagination])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-gray-100 flex-grow">
        <div className="mx-10 my-10 flex flex-col items-center gap-10">
          <div className="grid grid-cols-3 gap-8 place-items-center">
            {articles && (articles.map((article, index) => (
              <Article key={index} {...article} />
            )))}
            {!articles && (Array.from({ length: 6 }, (_, index) => (
              <ArticleSkeleton key={index} />
            )))}
          </div>
          {(articles && pageCount) && (
            <Pagination>
              <PaginationContent>
                {pagination > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => {
                      setArticles(null);
                      setPagination(pagination - 1);
                    }} />
                  </PaginationItem>
                )}
                {Array.from({ length: pageCount }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink href="#" onClick={() => {
                      setArticles(null);
                      setPagination(index + 1);
                    }}
                      isActive={index + 1 === pagination}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem> */}
                {pagination != pageCount && (
                  <PaginationItem>
                    <PaginationNext href="#" onClick={() => {
                      setArticles(null);
                      setPagination(pagination + 1);
                    }} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
    </div>
  );
}
