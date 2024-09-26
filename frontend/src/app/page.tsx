"use client";

import ArticleCard, { ArticleCardProps } from "@/components/ArticleCard";
import ArticleCardSkeleton from "@/components/ArticleCardSkeleton";
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
import { getStrapiData, getStrapiURL } from "@/services/data";
import { useEffect, useState } from "react";
import qs from "qs";
import Cookies from "js-cookie";

const baseUrl = getStrapiURL();
const authToken = Cookies.get("jwt");

export default function Home() {
  const [articles, setArticles] = useState<ArticleCardProps[] | null>(null);
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

    getStrapiData("/api/articles", query, authToken)
      .then((res) => {
        const data: ArticleCardProps[] = [];

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
              <ArticleCard key={index} {...article} />
            )))}
            {!articles && (Array.from({ length: 6 }, (_, index) => (
              <ArticleCardSkeleton key={index} />
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
