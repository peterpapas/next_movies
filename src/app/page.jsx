import { getMovies } from "../../lib/mongo/movies";
import NextImage from "next/image";

async function fetchMovies() {
  const movies = await getMovies();
  if (!movies) throw new Error("Failed to fetch movies!");
  return movies;
}

export default async function Home() {
  const { movies } = await getMovies();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-16 bg-gray-100">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <li key={movie._id} className="bg-white p-4 rounded-md text-gray-800 shadow-md">
            <NextImage
              src={movie.poster}
              alt={movie.title}
              width={300}
              height={450}
              className="mb-4 rounded-md"
            />
            <h3 className="text-lg font-medium mb-2">{movie.title}</h3>
            <p className="text-gray-500">{movie.plot || "-"}</p>
            <div className="mt-4 flex justify-between">
              <p className="text-sm text-gray-500">
                <span className="font-bold">Duration:</span>{" "}
                {movie.duration ? `${movie.duration} min` : "-"}
              </p>
              <p className="text-sm text-gray-500">
                {movie.released ? new Date(movie.released).getFullYear() : "-"}
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-sm text-gray-500">
                <span className="font-bold">Genre:</span>{" "}
                {movie.genre ? movie.genre.join(", ") : "-"}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Dir:</span>{" "}
                {movie.directors ? movie.directors.join(", ") : "-"}
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-sm text-gray-500">
                <span className="font-bold">Cast:</span>{" "}
                {movie.cast ? movie.cast.join(", ") : "-"}
              </p>
              <p className="text-sm text-gray-500">
                {movie.rating ? (
                  <span className="font-bold">{movie.rating}/10</span>
                ) : (
                  "-"
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
