"use client";
import Form from "@/components/Form";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Idea {
  _id: string;
  title: string;
  description: string;
  category: string;
  tag: string;
  createdAt: Date;
}

const EditPage = () => {
  const [idea, setIdea] = useState<Idea | null>(null);
  const params = useParams();
  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/idea/${params.id}`);
        setIdea(response.data.idea);
      } catch (error) {
        console.log("Error fetching idea (from client error) : ", error);
      }
    };
    fetchIdeaDetails();
  }, [params.id]);

  return (
    <section className="w-full px-6 mt-6">
      <Form
        type="Edit"
        id={idea?._id}
        editTitle={idea?.title}
        editDescription={idea?.description}
        editCategory={idea?.category}
        editTag={idea?.tag}
      />
    </section>
  );
};

export default EditPage;
