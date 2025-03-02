// import React from "react";
// import { Calendar } from "../shadcn/calendar";

import { useState } from "react";
import Calendar from "../shadcn/calendar";

const Example = () => {
  const [selectedRange, setSelectedRange] = useState<
    | {
        from: Date;
        to: Date;
      }
    | undefined
  >(undefined);

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="mb-4 text-xl">React Calendar with Range Selection</h1>
      <Calendar
        range={selectedRange}
        onSelect={(range) => setSelectedRange(range)}
      />
      {selectedRange && (
        <p className="mt-4 text-lg font-semibold">
          선택한 기간: {selectedRange.from.toDateString()} -{" "}
          {selectedRange.to.toDateString()}
        </p>
      )}
    </div>
  );
};

export default Example;
