export const AuthorAvatar = ({ name }: { name: string }) => {
  return (
    <div>
      <div className="flex  ">
        <div className="bg-indigo-400 rounded-full text-white font-semibold  h-10 w-10 flex justify-center items-center mr-1">
          {name.split("")[0] || "J"}
        </div>
        <div className="flex justify-center items-center">
          <span className="text-blue-500">{name || "John Doe"}</span>
        </div>
      </div>
    </div>
  );
};
