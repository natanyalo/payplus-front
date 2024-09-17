import React, { useEffect, useState } from 'react';
import './Customer.css'; // Custom CSS for the component

interface Customer {
  id: number;
  name: string;
  birthday: string;
  phone: string;
  email: string;
}

const Customer: React.FC = () => {
    const token=localStorage.getItem('token');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: 0,
    name: '',
    birthday: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    // Fetch customer data from the server
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3000/customers',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },	

        });
        if(response.ok){
            const data = await response.json();
            setCustomers(data);
        }

      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = async () => {
    // Add customer to the server
    try {
      const response = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        const addedCustomer = await response.json();
        setCustomers([...customers, addedCustomer]); // Add new customer to the list
        setShowPopup(false); // Close the popup
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className="customer-container">
      <h2>Customer List</h2>
      <button onClick={() => setShowPopup(true)} className="add-customer-btn">
        Add New Customer
      </button>
      
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthday</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.email}>
              <td>{customer.name}</td>
              <td>{customer.birthday}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add New Customer</h3>
            <label>Name</label>
            <input
              type="text"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
            <label>Birthday</label>
            <input
              type="date"
              value={newCustomer.birthday}
              onChange={(e) => setNewCustomer({ ...newCustomer, birthday: e.target.value })}
            />
            <label>Phone Number</label>
            <input
              type="text"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            />
            <label>Email</label>
            <input
              type="email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
            <button onClick={handleAddCustomer} className="submit-btn">Submit</button>
            <button onClick={() => setShowPopup(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
