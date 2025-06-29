import React, { useState } from 'react';
import styles from './Notifications.module.css';

const initialNotifications = [
  { id: 1, message: 'Conta de luz vence em 3 dias', date: '2024-06-22', priority: 'high', read: false },
  { id: 2, message: 'Meta financeira "Equipamentos" atingiu 75%', date: '2024-06-20', priority: 'medium', read: false },
  { id: 3, message: 'Relatório financeiro mensal disponível', date: '2024-06-18', priority: 'low', read: true },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map(n =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  const priorityColor = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#3b82f6',
  };

  return (
    <section className={styles['notifications-container']} aria-label="Notificações do sistema">
      <h1>Notificações</h1>
      <button 
        className={styles['mark-all']} 
        onClick={markAllAsRead} 
        aria-label="Marcar todas as notificações como lidas"
      >
        Marcar todas como lidas
      </button>

      <ul className={styles['notifications-list']} role="list" aria-live="polite" aria-relevant="additions">
        {notifications.length === 0 ? (
          <li className={styles['notification-item']} style={{justifyContent: 'center'}}>
            Sem notificações recentes.
          </li>
        ) : (
          notifications.map(notification => (
            <li 
              key={notification.id} 
              className={`${styles['notification-item']} ${!notification.read ? styles.unread : ''}`}
              aria-label={`${notification.message}, prioridade ${notification.priority}, ${notification.read ? 'lida' : 'não lida'}`}
              tabIndex={0}
            >
              <span 
                className={styles['priority-indicator']} 
                style={{backgroundColor: priorityColor[notification.priority]}}
                aria-hidden="true"
              />
              <div className={styles['notification-content']}>
                <div className={styles['notification-message']}>{notification.message}</div>
                <div className={styles['notification-date']}>{new Date(notification.date).toLocaleDateString('pt-BR')}</div>
              </div>
              <button 
                aria-label={notification.read ? "Marcar como não lida" : "Marcar como lida"}
                className={`${styles['toggle-read']} ${notification.read ? styles.read : ''}`}
                onClick={() => toggleRead(notification.id)}
                onKeyDown={(e) => { if (e.key === 'Enter') toggleRead(notification.id)}}
                title={notification.read ? "Marcar como não lida" : "Marcar como lida"}
              >
                {notification.read ? 'marcar como não lido' : 'marcar como lido'}
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}