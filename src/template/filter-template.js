function createFilterItems(filters, currentFilterType) {
  return filters.filters.map((type) => `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio"
          name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${type}">${filters.name}</label>
        </div>`).join('');
}

function createFilterTemplate(filters, currentFilterType){
  return `<form class="trip-filters" action="#" method="get">
            ${createFilterItems(filters, currentFilterType)}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export {createFilterTemplate, createFilterItems};
