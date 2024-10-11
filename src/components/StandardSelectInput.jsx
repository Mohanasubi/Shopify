import { nanoid } from "nanoid";

const StandardSelectInput = ({ selectList, ...props }) => {
  return (
    <select
      className="w-full py-2 border-black/30 border text-black/70 outline-none"
      {...props}
    >
      {selectList &&
        selectList.map((element) => (
          <option key={nanoid()} value={element.id}>
            {element.value}
          </option>
        ))}
    </select>
  );
};

export default StandardSelectInput;
