import TicketDetails from '../Ticket-Details/TicketDetail';

import styles from './styles.module.css';

const Ticket = ({info}) => {

  return (
    <li className={styles.main}>
      <div className={styles.head}>
        <span className={styles.company}>{info.carrier.caption}</span>
        <span className={styles.price}>{info.price.total.amount} p</span>
        <span className={styles.info}>Стоимость для одного взрослого пассажира</span>
      </div>
      <ul className={styles.legs}>
      {info.legs.map((leg, num) => (
        <TicketDetails key={num} info={leg} company={info.carrier.caption}/>
      ))}
      </ul>
      <button className={styles.button}>Выбрать</button>
    </li>
  )
}

export default Ticket