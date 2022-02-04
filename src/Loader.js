import { BiLoaderAlt } from "react-icons/bi";

export default function Loader() {
  return (
    <div className="w-full h-full grid place-items-center">
      <span className="animate-spin">
        <BiLoaderAlt />
      </span>
    </div>
  );
}
