"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function PostCarousel() {
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      content: "Learn how to build modern web applications with Next.js...",
    },
    {
      id: 2,
      title: "React Hooks Explained",
      content: "A comprehensive guide to React Hooks and how to use them...",
    },
    {
      id: 3,
      title: "Building UI with Tailwind CSS",
      content: "Learn how to create beautiful interfaces with Tailwind CSS...",
    },
  ];

  return (
    <div className="w-full py-6">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {posts.map((post) => (
            <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardContent className="flex flex-col justify-between h-full p-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground">{post.content}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

