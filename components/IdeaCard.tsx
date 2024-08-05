import Link from "next/link";
import { Badge } from "./ui/badge";
import { Trash2, Pencil } from "lucide-react";
import axios from "axios";

interface Props {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  category: string;
  tag: string;
  onDelete: (id: string) => void;
}

const IdeaCard = ({
  id,
  title,
  description,
  createdAt,
  category,
  tag,
  onDelete,
}: Props) => {
  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this idea?");
    try {
      if (hasConfirmed) {
        await axios.delete(`/api/v1/idea/${id}`);
        onDelete(id);
      }
    } catch (error) {
      console.log("An error occured while deleting the Idea!");
    }
  };

  return (
    <div className="p-3 flex flex-col gap-3 border rounded-lg">
      <div className="flex flex-row items-center gap-3">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-gray-500 text-sm underline">
          {new Date(createdAt).toDateString()}
        </p>
      </div>
      <p className="text-gray-500">{description}</p>
      <div className="flex flex-row justify-start items-center gap-2">
        <Badge>{category}</Badge>
        <p className="text-sm text-gray-500">#{tag}</p>
        <div className="flex flex-row gap-2 justify-center items-center">
          <button onClick={handleDelete} className="border p-1 rounded-full">
            <Trash2 className="text-red-500" width={14} height={14} />
          </button>
          <Link href={`/edit-idea/${id}`} className="border p-1 rounded-full">
            <Pencil className="text-yellow-400" width={14} height={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
