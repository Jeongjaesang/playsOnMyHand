import { useState } from "react";
import { Bell, Heart, Search, Sliders, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function Home() {
  const [performances, setPerformances] = useState([
    {
      id: 1,
      title: "Hamlet",
      venue: "Seoul Arts Center",
      date: "2025-02-15",
      category: "Theater",
    },
    {
      id: 2,
      title: "Swan Lake",
      venue: "National Theater of Korea",
      date: "2025-02-20",
      category: "Ballet",
    },
    {
      id: 3,
      title: "The Phantom of the Opera",
      venue: "Blue Square",
      date: "2025-02-25",
      category: "Musical",
    },
  ]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-white">
      <header className="p-4 bg-white border-b border-gray-200">
        <div className="container flex flex-col items-center justify-between mx-auto sm:flex-row">
          <h1 className="mb-4 text-2xl font-semibold text-gray-900 sm:mb-0">
            Performing Arts Hub
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-600"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="container p-4 mx-auto">
        <div className="flex flex-col items-center justify-between mb-4 space-y-4 sm:flex-row sm:mb-8 sm:space-y-0">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <Input
              type="text"
              placeholder="Search performances or venues"
              className="w-full py-2 pl-10 pr-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex w-full space-x-2 sm:w-auto sm:space-x-4">
            <Button
              onClick={() => setIsFilterOpen(true)}
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300 sm:flex-initial"
            >
              <Sliders className="w-4 h-4 mr-2" /> Filters
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-gray-600 border-gray-300 sm:flex-initial"
            >
              <MapPin className="w-4 h-4 mr-2" /> Near Me
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 bg-black bg-opacity-30">
            <div className="w-full h-full max-w-md p-6 overflow-y-auto bg-white shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Filters
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-600"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Category
                </h3>
                <div className="space-y-2">
                  {["Musical", "Theater", "Classical", "Dance", "Opera"].map(
                    (category) => (
                      <div className="flex items-center" key={category}>
                        <Checkbox
                          id={category}
                          className="text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor={category}
                          className="ml-2 text-gray-700"
                        >
                          {category}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Location
                </h3>
                <Select>
                  <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoul">Seoul</SelectItem>
                    <SelectItem value="busan">Busan</SelectItem>
                    <SelectItem value="incheon">Incheon</SelectItem>
                    <SelectItem value="daegu">Daegu</SelectItem>
                    <SelectItem value="daejeon">Daejeon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Date Range
                </h3>
                <DatePickerWithRange className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
              </div>

              {/* Ticket Availability */}
              <div className="flex items-center justify-between mb-6">
                <Label
                  htmlFor="ticket-availability"
                  className="text-lg font-semibold text-gray-900"
                >
                  Show only available tickets
                </Label>
                <Switch id="ticket-availability" className="text-blue-600" />
              </div>

              {/* Additional Filters */}
              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="additional-filters">
                  <AccordionTrigger className="text-gray-900">
                    Additional Filters
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Checkbox
                          id="kids-friendly"
                          className="text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="kids-friendly"
                          className="ml-2 text-gray-700"
                        >
                          Kids Friendly
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="award-winning"
                          className="text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="award-winning"
                          className="ml-2 text-gray-700"
                        >
                          Award Winning
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          id="festival"
                          className="text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Label
                          htmlFor="festival"
                          className="ml-2 text-gray-700"
                        >
                          Part of Festival
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {performances.map((performance) => (
            <div
              key={performance.id}
              className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 rounded-lg hover:shadow-md"
            >
              <div className="h-48 bg-gray-100"></div>
              <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold text-gray-900">
                  {performance.title}
                </h2>
                <p className="mb-2 text-gray-600">{performance.venue}</p>
                <p className="mb-2 text-gray-500">{performance.date}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {performance.category}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// import { useState } from "react";
// import { Search, Sliders, MapPin, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const performances = [
//     {
//       id: 1,
//       title: "Hamlet",
//       venue: "Seoul Arts Center",
//       date: "2025-02-15",
//       category: "Theater",
//     },
//     {
//       id: 2,
//       title: "Swan Lake",
//       venue: "National Theater of Korea",
//       date: "2025-02-20",
//       category: "Ballet",
//     },
//     {
//       id: 3,
//       title: "The Phantom of the Opera",
//       venue: "Blue Square",
//       date: "2025-02-25",
//       category: "Musical",
//     },
//   ];

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-between mb-4 space-y-4 sm:flex-row sm:mb-8 sm:space-y-0">
//         <div className="relative w-full sm:w-1/2">
//           <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
//           <Input
//             type="text"
//             placeholder="Search performances or venues"
//             className="w-full py-2 pl-10 pr-4 border-gray-300"
//           />
//         </div>
//         <div className="flex w-full space-x-2 sm:w-auto sm:space-x-4">
//           <Button
//             onClick={() => setIsFilterOpen(true)}
//             variant="outline"
//             className="flex-1 text-gray-600 border-gray-300 sm:flex-initial"
//           >
//             <Sliders className="w-4 h-4 mr-2" /> Filters
//           </Button>
//           <Button
//             variant="outline"
//             className="flex-1 text-gray-600 border-gray-300 sm:flex-initial"
//           >
//             <MapPin className="w-4 h-4 mr-2" /> Near Me
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {performances.map((performance) => (
//           <div
//             key={performance.id}
//             onClick={() => navigate(`/performance/${performance.id}`)}
//             className="cursor-pointer"
//           >
//             <h2 className="mb-2 text-xl font-semibold text-gray-900">
//               {performance.title}
//             </h2>
//             <p className="mb-2 text-gray-600">{performance.venue}</p>
//             <p className="mb-2 text-gray-500">{performance.date}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
