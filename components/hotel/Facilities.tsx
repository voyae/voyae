import {
    Check,
  } from "lucide-react";
  
  interface Props {
    facilities: string[];
  }
  
  export default function Facilities({
    facilities,
  }: Props) {
    return (
      <section>
  
        <h2 className="mb-6 text-2xl font-bold">
          Hotel Facilities
        </h2>
  
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
  
          {facilities.map((facility) => (
            <div
              key={facility}
              className="flex items-center gap-3 rounded-xl border p-4"
            >
              <Check
                size={18}
                className="text-emerald-600"
              />
  
              <span>{facility}</span>
  
            </div>
          ))}
  
        </div>
  
      </section>
    );
  }