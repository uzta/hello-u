import PageCreator from "../components/PageCreator";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black to-slate-950 opacity-50"/>
      <PageCreator/>
    </div>
  );
}
