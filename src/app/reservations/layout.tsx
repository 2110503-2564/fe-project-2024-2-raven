import styles from './reservations.module.css';
import Menu from "@/components/Menu";
import React from 'react';

interface ReservationLayoutProps {
  children: React.ReactNode;
}

export default function ReservationLayout({ children }: ReservationLayoutProps) {
  return (
    <div className={styles.sectionlayout}>
      <Menu />
      {children}
      <a href="/reservations/manage">
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Manage Reservations
        </button>
      </a>
    </div>
  );
}