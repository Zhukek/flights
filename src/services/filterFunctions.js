const priceToHighSorter = (selected) => {
  selected.sort((prev, next) => prev.flight.price.total.amount - next.flight.price.total.amount);
}

const priceToLowSorter = (selected) => {
  selected.sort((prev, next) => next.flight.price.total.amount - prev.flight.price.total.amount);
}

const timeSorter = (selected) => {
  selected.sort((prev, next) => {
    const prevTime = prev.flight.legs.reduce((pre, curr) => pre + curr.duration, 0);
    const nextTime = next.flight.legs.reduce((pre, curr) => pre + curr.duration, 0);
    return prevTime - nextTime
  });
}

export const sortFilter = (data, sort) => {
  switch(sort) {
    case 'priceToHigh':
      priceToHighSorter(data)
      break
    case 'priceToLow':
      priceToLowSorter(data)
      break
    case 'time':
      timeSorter(data)
      break
  }
}

export const transferFilter = (processData, transfer, noTransfer) => {
  let result = processData
  if (transfer) {
    result = processData.filter((flight) => flight.flight.legs[0].segments.length > 1 || flight.flight.legs[1].segments.length > 1)
  } else if (noTransfer) {
    result = processData.filter((flight) => flight.flight.legs[0].segments.length === 1 && flight.flight.legs[1].segments.length === 1)
  }
  return result
}

export const priceFilter = (minPrice, maxPrice, processData) => {
  let result = processData
  if (minPrice !== 0) {
    result = processData.filter((flight) => flight.flight.price.total.amount >= minPrice)
  }
  if (maxPrice !== 0) {
    result = result.filter((flight) => flight.flight.price.total.amount <= maxPrice)
  }
  return result
}