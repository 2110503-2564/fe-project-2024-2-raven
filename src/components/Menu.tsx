import styles from './menu.module.css';
import Link from 'next/link';

export default function ReservationMenu() {
  return (
    <div>
      <div>Menu</div>
      <div className={styles.submenu}>
        <nav>
          <ul>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/co-workingspace">Co-working Space</Link>
            </li>
            <li>
              <Link href="/reservations">Reservations</Link>
            </li>
            <li>
              <Link href="/reservations/manage">Manage Reservations</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}