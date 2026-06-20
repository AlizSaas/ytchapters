'use client'
import { ChapterSet } from '@prisma/client'
import React from 'react'
import { Button } from './ui/button'
import {Copy, Check, Clock, FileText} from 'lucide-react'
import Clipboard from 'clipboard'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useEffect, useState } from "react";

type UserWithSavedChapters = {
  savedChapters: {
    id: string;
    title: string;
    content: string[];
    createdAt: Date;
    userId: string;
  }[];
  stripe_customer_id: string | null;
} | null;

const ITEM_PER_PAGE = 6;
export default function ChaptersWrapper({user}: {user: UserWithSavedChapters}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = user ? Math.ceil(user.savedChapters.length / ITEM_PER_PAGE) : 0;
  const startingIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const endIndex = startingIndex + ITEM_PER_PAGE;
  const sortedChapters = user?.savedChapters.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const currentChapters = sortedChapters
    ? sortedChapters.slice(startingIndex, endIndex)
    : [];

  useEffect(() => {
    const clipboard = new Clipboard(".btn-copy");
    clipboard.on("success", (e) => {
      setCopiedId(e.trigger.id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
      e.clearSelection();
    });

    return () => clipboard.destroy();
  }, []);

  if (!user?.savedChapters || user.savedChapters.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center text-center py-16 border border-dashed border-border rounded-xl bg-card/50">
        <div className="p-4 rounded-full bg-muted mb-4">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No chapters yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Generate your first set of chapters by pasting a YouTube video or Shorts URL.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Your Generated Chapters</h2>
        <span className="text-sm text-muted-foreground">
          {user.savedChapters.length} {user.savedChapters.length === 1 ? 'result' : 'results'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentChapters.map((chapter: ChapterSet) => (
          <div
            key={chapter.id}
            className="group relative bg-card border border-border rounded-xl p-5 flex flex-col h-[320px] shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
          >
            <div className="mb-3">
              <h3 className="text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {chapter.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>
                  {new Date(chapter.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-1 space-y-1 scrollbar-thin">
              {chapter.content.map((line, index) => (
                <p
                  key={index}
                  className="text-sm text-muted-foreground leading-relaxed font-mono"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className={`w-full btn-copy transition-all duration-200 ${
                        copiedId === chapter.id
                          ? "bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20"
                          : ""
                      }`}
                      variant="outline"
                      size="sm"
                      id={chapter.id}
                      data-clipboard-text={chapter.content.join("\n")}
                    >
                      {copiedId === chapter.id ? (
                        <Check className="w-4 h-4 mr-2" />
                      ) : (
                        <Copy className="w-4 h-4 mr-2" />
                      )}
                      <span>{copiedId === chapter.id ? "Copied!" : "Copy chapters"}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {copiedId === chapter.id
                        ? "Copied to clipboard!"
                        : "Copy chapters to clipboard"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : ""
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
