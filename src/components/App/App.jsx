import styles from './styles.module.css';
import Tickets from '../Ticket-List/TicketList';
import Filters from '../Filters/Filters';
import { onLoad } from '../../redux/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onLoad())
  },[])

  return (
    <section className={styles.root}>
      <Filters />
      <Tickets />
    </section>
  )
}

export default App;
