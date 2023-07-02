import Dictionary from "../models/dictionary";

interface TransformedObject {
  id: string;
  [key: string]: any;
}

export function formatDataSnapshot<T>(
  dictionary: Dictionary<T>
): TransformedObject[] {
  const transformedArray: TransformedObject[] = [];

  for (const id in dictionary) {
    if (dictionary.hasOwnProperty(id)) {
      const obj: TransformedObject = {
        id: id,
        ...dictionary[id],
      };
      transformedArray.push(obj);
    }
  }

  return transformedArray;
}
