import type { ChangeEvent }  from "react";
import { categories } from "../data/categories.ts";
import { useBudget } from "../hooks/useBudget.ts";

export function FilterByCategory() {

  const { dispatch } = useBudget();

  const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'add-filter-category', payload: {id: e.target.value}})
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            id="category"
            className="bg-slate-100 p-3 flex-1 rounded"
            onChange={handleChange}
          >
            <option value="">-- Todas las categorías --</option>
            {categories.map(category => (
              <option
                id={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}