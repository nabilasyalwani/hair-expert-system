interface ContentProps {
  id?: string;
  title: string;
  items: string[];
  bgColor?: string;
  borderColor?: string;
  titleBgColor?: string;
  titleBorderColor?: string;
  textColor?: string;
  titleTextColor?: string;
  titlePosition?: string;
}

export default function Content({
  id,
  title,
  items,
  bgColor = "bg-white",
  borderColor = "border-[#FAEEFF]",
  titleBgColor = "bg-white",
  titleBorderColor = "border-[#E0AEF5]",
  textColor = "text-[#413D6C]",
  titleTextColor = "text-[#413D6C]",
  titlePosition = "justify-center",
}: ContentProps) {
  return (
    <div
      id={id}
      className={`${bgColor}  rounded-4xl shadow-lg shadow-purple-500/10 border-6 ${borderColor} ${textColor} text-left`}
    >
      <div className={`flex w-full ${titlePosition}`}>
        <div
          className={`p-2 ${titleBgColor} border-4 ${titleBorderColor} w-fit px-16 shadow-lg shadow-purple-500/10 rounded-full text-center flex items-center justify-center`}
        >
          <h3 className={`text-xl font-bold ${titleTextColor}`}>{title}</h3>
        </div>
      </div>

      <ul className="list-disc text-md ml-8 mb-4 px-6 pb-6 ">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
