import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch notifications for the user
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/notifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);


  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Notifications</h3>
    {notifications.length > 0 ? (
      <ul className="max-h-60 overflow-y-auto">
        {notifications.map((notification, index) => (
          <li key={index} className="mb-2 border-b pb-2 last:border-none">
            <p className="text-sm">{notification.message}</p>
            <div className=' flex flex-row justify-between'>
            <span className="text-xs text-grey">
              {new Date(notification.createdAt).toLocaleDateString()}
             

            </span>  <span className="text-xs text-grey">
            
              {new Date(notification.createdAt).toLocaleTimeString()}

            </span>
            </div>
          
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-grey">No new notifications</p>
    )}
  </div>
  );
}

export default Notification;
