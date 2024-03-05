// import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

export default function App() {
  const content = (
    <PopoverContent>
      <div className="px-1 py-2">
  <div className="text-base font-bold">Honey Sample Info</div>
  <div className="text-base">
    <p>CS: Color score, 1.0-10.0. Lower = lighter color.</p>
    <p>Density: In g/cm³ at 25°C, 1.21-1.86.</p>
    <p>WC: Water content, 12.0%-25.0%.</p>
    <p>pH: pH level, 2.50-7.50.</p>
    <p>EC: Electrical conductivity in mS/cm.</p>
    <p>F: Fructose level, 20-50.</p>
    <p>G: Glucose level, 20-45.</p>
    <p>Pollen_analysis: Floral source of the honey.</p>
    <p>Viscosity: In centipoise, 1500-10000. 2500-9500 = optimal for purity.</p>
    <p>Purity: Target variable, 0.01-1.00.</p>
    <p>Price: Calculated price of the honey.</p>
  </div>
</div>
    </PopoverContent>
  );

  const placements = ["left-end"];

  return (
    <div className="flex flex-wrap md:inline-grid md:grid-cols-1 gap-4">
      {placements.map((placement) => (
        <Popover key={placement} placement={placement} color="warning">
          <PopoverTrigger>
            <Button color="warning" className="capitalize font-bold">
              Details
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>
      ))}
    </div>
  );
}
