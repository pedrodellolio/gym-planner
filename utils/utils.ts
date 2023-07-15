import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
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

export function rgbOpacity(rgbString: string, opacity: number) {
  // Removendo os espaços em branco em excesso e dividindo os valores da string RGB
  const rgbValues = rgbString.replace(/\s/g, "").split(",");

  // Extraindo os valores de R, G e B
  const r = parseInt(rgbValues[0].split("(")[1]);
  const g = parseInt(rgbValues[1]);
  const b = parseInt(rgbValues[2].split(")")[0]);

  // Verificando se a opacidade está dentro do intervalo válido (0 a 1)
  const validOpacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;

  // Construindo a string com o valor RGB modificado pela opacidade
  const rgbOpacityString = `rgba(${r},${g},${b},${validOpacity})`;

  return rgbOpacityString;
}

export function documentToObject<T>(document: any): T {
  const documentKey = Object.keys(document)[0];
  const documentData = document[documentKey];

  const mappedObject: any = {
    id: documentKey,
  };

  Object.entries(documentData).forEach(([key, value]) => {
    mappedObject[key] = value;
  });

  return mappedObject as T;
}
