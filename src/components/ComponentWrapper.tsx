interface ComponentWrapperProps {
  title: string;
  component: React.ReactNode; //JSX or React component
  code: string;
}

export const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  title,
  component,
  code,
}) => {
  return (
    <div className="bg-brown shadow-md rounded-lg p-4 ">
      {/* Title / Question */}
      <h2 className="text-2xl text-cream font-italiana font-bold mb-2 md:pl-4">
        {title}
      </h2>

      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        {/* Left Side: UI/Component */}
        <div className="p-4  md:flex md:px-20 md:border-r md:border-r-blush md:items-center">
          {component}
        </div>
        {/* Right Side: Code/Answer */}
        <div>
          <pre className="text-gray text-xs font-thin">{code}</pre>
        </div>
      </div>
    </div>
  );
};
