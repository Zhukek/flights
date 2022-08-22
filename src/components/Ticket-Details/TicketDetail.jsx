import styles from './styles.module.css';
import arrow from '../../images/arrow.svg';
import clock from '../../images/clock.svg';
import { normalizeData, flightTime } from '../../services/normalizeTicketDetails';

const TicketDetails = ({info, company}) => {
  const time = flightTime(info.duration);
  const [cityFrom, cityTo, airportFrom, airportTo, departureTime, departureDay, arrivalTime, arrivalDay] = normalizeData(info.segments);
  const transfers = info.segments.length;

  return (
    <li className={styles.main}>
      <div className={styles.infoBlock}>
        <p className={styles.mainInfo}>{cityFrom} <span className={styles.airport}>({airportFrom})</span></p>
        <img src={arrow} className={styles.image}></img>
        <p className={styles.mainInfo}>{cityTo} <span className={styles.airport}>({airportTo})</span></p>
      </div>
      <div className={styles.infoBlock}>
        <p className={styles.mainInfo}>{departureTime} <span className={styles.date}>{departureDay}</span></p>
        <p className={styles.flightTime}><img className={styles.image} src={clock}/> {time}</p>
        <p className={styles.mainInfo}><span className={styles.date}>{arrivalDay}</span> {arrivalTime}</p>
        {
          transfers > 1 && <p className={styles.transfer}>{transfers - 1} пересадка</p>
        }
      </div>
      <span className={styles.organisation}>Рейс выполняет: {company}</span>
    </li>
  )
}

export default TicketDetails