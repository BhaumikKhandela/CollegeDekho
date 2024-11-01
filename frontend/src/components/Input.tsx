import { useRecoilState } from "recoil";
import { visibility } from "../atom";

interface Componenets {
  typeOf: string;
  displayName: string;
  holder: string;
  condition: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}
export const Input = ({
  typeOf,
  displayName,
  holder,
  condition,
  name,
  onChange,
  value,
}: Componenets) => {
  if (typeOf === "password") {
    const [visible, setVisible] = useRecoilState(visibility);

    const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setVisible((Previsible) => !Previsible);
    };

    return (
      <div className="font-bold pt-2">
        <label htmlFor={name}>{displayName}</label>
        <br />
        <div className="relative">
          <input
            id={name}
            placeholder={holder}
            type={visible ? "text" : "password"}
            name={name}
            onChange={onChange}
            value={value}
            className="rounded-sm mt-2 mr-2 font-light bg-white border-b-2  w-full p-2 pt-2"
          ></input>
          <button
            onClick={handleButton}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 pt-2 "
          >
            {visible ? "hide" : "show"}
          </button>
        </div>
      </div>
    );
  }

  if (condition === "one") {
    return (
      <div className="font-bold pt-2">
        <label htmlFor={name}>{displayName}</label> <br />
        <input
          id={name}
          placeholder={holder}
          type={typeOf}
          name={name}
          onChange={onChange}
          value={value}
          className="rounded-sm mt-2 mr-2 font-light bg-white border-b-2 p-2"
        ></input>
      </div>
    );
  } else {
    return (
      <div className="font-bold pt-2">
        <label htmlFor={name}>{displayName}</label>
        <br />
        <input
          id={name}
          placeholder={holder}
          type={typeOf}
          name={name}
          onChange={onChange}
          value={value}
          className="rounded-sm mt-2 mr-2 font-light bg-white border-b-2  w-full p-2"
        ></input>
      </div>
    );
  }
};
