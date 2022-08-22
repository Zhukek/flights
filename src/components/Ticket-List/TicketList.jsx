import Ticket from "../Ticket/Ticket";
import styles from './styles.module.css';
import { useSelector, useDispatch } from "react-redux";
import { PAGE_UP, PAGE_DOWN } from "../../redux/actions";

const Tickets = () => {
  const dispatch = useDispatch();
  const {selected: tickets, page} = useSelector(store => store);
  const pageUp = () => {
    dispatch({type: PAGE_UP})
  }
  const pageDown = () => {
    dispatch({type: PAGE_DOWN})
  }

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {tickets.length > 0 ?
          tickets.slice(page * 5, page * 5 + 5).map(ticket => (
            <Ticket key={ticket.flightToken} info={ticket.flight}/>
          )) :
          <p className={styles.notFound}>Ничего не найдено</p>
        }
      </ul>
      <div className={styles.pageButtons}>
        <button onClick={pageDown} disabled={page === 0} className={styles.button}>Предыдущая страница</button>
        <span className={styles.page}>{page + 1}</span>
        <button onClick={pageUp} disabled={(page * 5 + 5) >= tickets.length} className={styles.button}>Следующая страница</button>
      </div>
    </div>
  )
}

export default Tickets