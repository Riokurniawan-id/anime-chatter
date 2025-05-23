import HeroCard from "@/components/HeroCard";

export default function Home() {
  return (
    <main className="flex flex-wrap justify-center items-center min-h-screen bg-gray-200">
      <HeroCard
        image="/images/image1.jpg"
        variant="first"
        text="Lorem ipsum dolor sit amet."
        date="30.11.2022"
      />
      <HeroCard
        image="/images/image2.png"
        variant="second"
        text="Lorem ipsum dolor sit amet."
        date="30.11.2022"
      />
    </main>
  );
}
