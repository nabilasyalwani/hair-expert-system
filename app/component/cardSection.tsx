import Card from "../component/card";

export default function CardsSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
      <div onClick={() => scrollTo("causes")}>
        <Card title="PENYEBAB" />
      </div>

      <div onClick={() => scrollTo("symptoms")}>
        <Card title="GEJALA" />
      </div>

      <div onClick={() => scrollTo("treatment")}>
        <Card title="TREATMENT" />
      </div>
    </div>
  );
}
