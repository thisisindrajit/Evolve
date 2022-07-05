const InputHolder = (props) => {
  return (
    <div className="flex flex-col w-full sm:w-10/12 my-2">
      <div className="flex justify-between font-bold text-xs uppercase text-evolve-green">
        <span>{props.title}</span>
        {props.isRequired && <span className="text-gray-300">REQUIRED</span>}
      </div>
      {props.children}
    </div>
  );
};

export default InputHolder;
