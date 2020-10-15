import { normalize, schema } from "normalizr";
import { Author } from "../../interfaces/products";

export const normalizeAuthorsData = (authors: Author[]) => {
  const videosEntitiy = new schema.Entity(
    "videos",
    {},
    {
      processStrategy: (value, parent, key) => {
        return { ...value, author: parent.id };
      },
    }
  );
  const authorsEntity = new schema.Entity(
    "authors",
    {
      videos: [videosEntitiy],
    },
    {
      processStrategy: (value, parent, key) => {
        return { ...value, videosList: value.videos };
      },
    }
  );

  const normalizedData = normalize(authors, [authorsEntity]);
  return { authors: normalizedData };
};
