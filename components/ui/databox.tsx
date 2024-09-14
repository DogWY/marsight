import * as React from "react";

interface DataBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  spanText: string; // 和图标一行的文字
  paragraphText: string; // 最下方的文字
  icon?: React.ReactNode;
}

const DataBox = React.forwardRef<HTMLDivElement, DataBoxProps>(
  ({ spanText, paragraphText, icon, className, ...props }, ref) => {
    return (
      <div ref={ref} className={`custom-component ${className}`} {...props}>
        <p className="text-2xl font-bold mb-2">{paragraphText}</p>

        <div className="text-xs flex items-center text-gray-500">
          {icon && <span className="mr-1">{icon}</span>}
          <span>{spanText}</span>
        </div>
      </div>
    );
  }
);

DataBox.displayName = "DataBox";

export { DataBox };
