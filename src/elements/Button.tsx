import { useState } from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
  useClicked?: boolean;
};

export default function Button({ text, onClick, useClicked }: ButtonProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <span
      className={`
        mr-1 px-2 py-1 text-white rounded hover:opacity-75 cursor-pointer transition-opacity
        ${clicked ? 'bg-green-700' : 'bg-black'} transition-colors 
      `}
      onClick={() => {
        onClick();
        if (useClicked) {
          setClicked(true);
          setTimeout(() => { setClicked(false); }, 3000);
        }
      }}
    >
      {text}
    </span>
  );
}
