const leadingZero = (num) => `0${num}`.slice(-2);

export const flightTime = (time) => {
  let hours = parseInt(time/60);
  let minutes = time % 60;
  hours = leadingZero(hours);
  minutes = leadingZero(minutes);
  return `${hours} ч ${minutes} мин`
}

const normalizeDates = (date) => {
  
  const time = [date.getHours(), date.getMinutes()].map(leadingZero).join(':');
  const month = date.toLocaleString('ru', { month: 'long' });
  const weekDay = date.toLocaleString('ru', { weekday: 'long'})
  const day = `${date.getDate()} ${month.slice(0, 3)}. ${weekDay}`

  return {
    time: time,
    day: day
  }
}

export const normalizeData = (flights) => {
  const firstFlight = flights[0];
  const lastFlight  = flights.at(-1);
  
  const cityFrom = `${firstFlight?.departureCity?.caption}, ${firstFlight?.departureAirport?.caption}`;
  const cityTo = `${lastFlight?.arrivalCity?.caption}, ${lastFlight?.arrivalAirport?.caption}`;

  const airportFrom = firstFlight.departureAirport.uid;
  const airportTo = lastFlight.arrivalAirport.uid;

  const dateDeparture = new Date(firstFlight.departureDate);
  const {time: departureTime, day: departureDay} = normalizeDates(dateDeparture);

  const dateArrival = new Date(lastFlight.arrivalDate);
  const {time: arrivalTime, day: arrivalDay} = normalizeDates(dateArrival);
 
  return [cityFrom, cityTo, airportFrom, airportTo, departureTime, departureDay, arrivalTime, arrivalDay]
}