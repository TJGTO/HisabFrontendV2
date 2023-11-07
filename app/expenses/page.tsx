import Card from "./components/card";

export default function Page() {
  return (
    <>
      <h1 className="bg-sky-500">Hello, Home page!</h1>
      <div className="grid grid-cols-5 gap-4 w-full">
        {Array(30)
          .fill(5)
          .map((x) => (
            <Card />
          ))}
      </div>
    </>
  );
}
