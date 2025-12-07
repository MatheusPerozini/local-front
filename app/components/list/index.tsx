import { getLocals } from "@/app/api/locals/locals.api";
import Card from "../card";
import { Local } from "@/app/features/locals/types/local";
import "./stylesheet.css";

export const dynamic = 'force-dynamic';

export default async function List() {
  const locals: Local[] = await getLocals();

  return (
    <div className="card-container">
      {locals.map((el) => (
        <Card key={el.id} local={el} />
      ))}
    </div>
  );
}
