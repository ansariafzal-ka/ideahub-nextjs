import { connectDb } from "@/utils/database";
import { Idea } from "@/models/ideas";

//GET (get all ideas)
export const GET = async () => {
  try {
    await connectDb();

    const ideas = await Idea.find();
    return new Response(
      JSON.stringify({
        ideas: ideas,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Error fetching all the ideas!", { status: 500 });
  }
};

//POST (create a new idea)
export const POST = async (request: Request) => {
  try {
    await connectDb();
    const { title, description, category, tag } = await request.json();

    if (!title || !description || !category || !tag)
      return new Response("Some fields are mising!", { status: 400 });

    const newIdea = await Idea.create({
      title: title,
      description: description,
      category: category,
      tag: tag,
    });
    return new Response(
      JSON.stringify({
        message: "Idea created successfully",
        newIdea: newIdea,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response("Error creating idea!", { status: 500 });
  }
};
