"use client";

import IdeaCard from "@/components/IdeaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Idea {
  _id: string;
  title: string;
  description: string;
  category: string;
  tag: string;
  createdAt: Date;
}

const IdeaCardContainer = ({ searchQuery }: { searchQuery: string }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const onDelete = (id: string) => {
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea._id !== id));
  };

  useEffect(() => {
    const fetchAllIdeas = async () => {
      const response = await axios.get("/api/v1/idea");
      setIdeas(response.data.ideas);
    };

    fetchAllIdeas();
  }, []);

  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-8 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredIdeas.length > 0 ? (
        filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea._id}
            id={idea._id}
            title={idea.title}
            createdAt={idea.createdAt}
            description={idea.description}
            category={idea.category}
            tag={idea.tag}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No ideas found</p>
      )}
    </div>
  );
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="w-full px-6">
      <section className="w-full flex flex-col justify-center items-center gap-4 text-center mt-16">
        <h1 className="text-3xl md:text-4xl sm:w-[500px] md:w-[600px] font-bold">
          Find awesome ideas shared by the community
        </h1>
        <p className="text-gray-500">
          Get started by creating your very first idea!
        </p>
        <Link href="/create-idea">
          <Button>Create Idea</Button>
        </Link>
        <Input
          placeholder="Search ideas"
          className="mt-2 md:w-[600px]"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </section>
      <IdeaCardContainer searchQuery={searchQuery} />
    </main>
  );
};

export default Home;
