export function Loader(): React.FunctionComponentElement<React.ReactNode> {
  return (
    <div className="flex justify-center items-center py-10 my-10">
      <div className="loader py-10 my-10"></div>
    </div>
  );
}

export function FlexLoader(): React.FunctionComponentElement<React.ReactNode> {
  return (
    <div className="scale-[40%]">
      <div className="loader"></div>
    </div>
  );
}
