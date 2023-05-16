import clientPromise from ".";

let client;
let db;
let movies;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db("sample_mflix");
    movies = db.collection("movies");
  } catch (error) {
    throw new Error("Failed to establish connection to database");
  }
}

async () => {
  await init();
};

// Movies

export async function getMovies() {
  try {
    if (!movies) await init();
    const result = await movies
      .find({})
      .limit(12)
      // Making it to string as it is not serialisable
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { movies: result };
  } catch (error) {
    return { error: "Failed to Fetch movies" };
  }
}
