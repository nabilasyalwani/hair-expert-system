export default function Card({ title }: { title: string }) {
  return (
    <div className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <img
        src="/img/LogoTekdok.png"
        alt="icon content"
        className="mx-auto mt-4 w-20"
      />

      <div className="bg-[#E0AEF5] group-hover: text-center p-4 mt-4 rounded-b-2xl">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}
