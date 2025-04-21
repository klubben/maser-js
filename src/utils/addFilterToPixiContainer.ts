import { AbstractFilter } from "@/filters/abstractFilter";
import { Container, Filter } from "pixi.js";

export const addFilterToPixiContainer = (
  container: Container,
  filter: AbstractFilter,
) => {
  let existingFilters: Filter[] = [];

  if (
    typeof container.filters === "object" &&
    Array.isArray(container.filters)
  ) {
    existingFilters = container.filters as Filter[];
  } else if (container.filters instanceof Filter) {
    existingFilters = [container.filters];
  }

  container.filters = [...existingFilters, filter.getFilter()];
};
