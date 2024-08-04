import { connectDb } from "@/utils/database";
import { Idea } from "@/models/ideas";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    const idea = await Idea.findById(params.id);
    if (!idea)
      return new Response(`Idea with the given ide : ${params.id} not found`);

    return new Response(
      JSON.stringify({
        idea: idea,
      })
    );
  } catch (error) {
    return new Response("Error getting this idea!", { status: 500 });
  }
};

//PUT (update the idea)
export const PUT = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDb();
    const { title, description, category, tag } = await request.json();

    if (!title || !description || !category || !tag)
      return new Response("Some fields are mising!", { status: 400 });

    const editedIdea = await Idea.findByIdAndUpdate(
      params.id,
      {
        title: title,
        description: description,
        category: category,
        tag: tag,
      },
      { new: true }
    );
    return new Response(
      JSON.stringify({
        message: "Idea edited successfully",
        editedIdea: editedIdea,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response("Error creating idea!", { status: 500 });
  }
};

//DELETE (delete the idea)
export const DELETE = async (
  request: Request,
  { params }: { params: Params }
) => {
  try {
    await connectDb();
    const idea = await Idea.findById(params.id);
    if (!idea)
      return new Response(`Idea with the given id : ${params.id} not found`);

    const deletedIdea = await Idea.findByIdAndDelete(params.id);
    return new Response(
      JSON.stringify({
        message: "Idea deleted successfully",
        deletedIdea: deletedIdea,
      })
    );
  } catch (error) {
    return new Response("Error deleting this idea", { status: 500 });
  }
};
