export interface Item {
  id: string;
  image: string;
  i18n: {
    [key: string]: {
      name: string;
      sound: string;
    };
  };
}
