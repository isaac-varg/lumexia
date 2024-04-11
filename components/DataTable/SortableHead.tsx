import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";

export default function SortableHead({ sorted }: { sorted: boolean | string }) {

  const handleSortIcon = () => {
    if (typeof sorted === "boolean" && !sorted) {
      return <FaSort />;
    }

    if (typeof sorted === "string" && sorted === "asc") {
      return <FaSortDown />;
    }

    if (typeof sorted === "string" && sorted === "desc") {
      return <FaSortUp />;
    }
  };
  return <div>{handleSortIcon()}</div>
}
