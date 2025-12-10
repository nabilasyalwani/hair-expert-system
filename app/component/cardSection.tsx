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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-10">
      <div onClick={() => scrollTo("causes")}>
        <Card
        title="PENYEBAB"
        imageUrl="/img/icon-penyebab.png"/>
      </div>

      <div onClick={() => scrollTo("symptoms")}>
        <Card
        title="GEJALA"
        imageUrl="/img/icon-gejala.png"/>
      </div>

      <div onClick={() => scrollTo("treatment")}>
        <Card
        title="TREATMENT"
        imageUrl="/img/icon-treatment.png"/>
      </div>
    </div>
  );
}
