"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  type: string;
  id?: string;
  editTitle?: string;
  editDescription?: string;
  editCategory?: string;
  editTag?: string;
}

const Form = ({
  type,
  id,
  editTitle = "",
  editDescription = "",
  editCategory = "personal",
  editTag = "",
}: Props) => {
  const [title, setTitle] = useState(editTitle);
  const [description, setDescription] = useState(editDescription);
  const [category, setCategory] = useState(editCategory);
  const [tag, setTag] = useState(editTag);

  const { toast } = useToast();

  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/idea", {
        title,
        description,
        category,
        tag,
      });
      router.push("/");
      toast({
        title: "Idea saved successfully",
        description: "your idea has been created.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/idea/${id}`, {
        title,
        description,
        category,
        tag,
      });
      router.push("/");
      toast({
        title: "Idea saved successfully",
        description: "your idea has been edited.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTitle(editTitle);
    setDescription(editDescription);
    setCategory(editCategory);
    setTag(editTag);
  }, [editTitle, editDescription, editCategory, editTag]);

  return (
    <div className="xl:w-[1000px]">
      <h1 className="text-lg font-bold">{type} Idea</h1>
      <form
        onSubmit={type === "Create" ? handleCreate : handleEdit}
        className="flex flex-col gap-4 mt-4"
      >
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Label>Category</Label>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value)}
          defaultValue={category}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="personal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">personal</SelectItem>
            <SelectItem value="work">work</SelectItem>
            <SelectItem value="random">random</SelectItem>
          </SelectContent>
        </Select>
        <Label>#Tag</Label>
        <Input
          placeholder="eg. #innovation"
          required
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <div className="mt-2 flex flex-row gap-3">
          <Button type="submit">{type}</Button>
          <Link href="/">
            <Button type="button" variant={"outline"}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
