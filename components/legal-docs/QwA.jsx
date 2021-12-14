import { Item } from "./Item";

export const QwA = ({ data = [] }) => {
  return (
    <>
      {data?.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </>
  );
};


