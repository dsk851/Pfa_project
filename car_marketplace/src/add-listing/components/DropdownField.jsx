import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DropdownField({ item, handleInputChange,carInfo }) {
  // console.log("item dropdown", item);
  return (
    <div>
      <Select onValueChange={(value)=>handleInputChange(item.name,value)}
        required={item?.required}
        defaultValue={carInfo?.[item?.name] || ''}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={item?.label} className=''/>
        </SelectTrigger>
        <SelectContent>
          {item?.options?.map((option, index) => {
            return (
              <div key={index}>
                <SelectItem value={option}>{option}</SelectItem>
              </div>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default DropdownField;
