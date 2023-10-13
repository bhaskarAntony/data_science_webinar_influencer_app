import React, { useState } from 'react';
import axios from 'axios';
import Loadingmodal from './Loadingmodal';
import '../styles/users.css';

function Users() {
  const [couponCode, setCouponCode] = useState('');
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false)

  const checkCouponCode = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`https://emerald-sockeye-tux.cyclic.app/api/confirm/get-users?couponCode=${couponCode}`)
      .then((response) => {
        setLoading(false);
        setUser(response.data);
        setError(null);
        setVisible(true)
      })
      .catch((err) => {
        setLoading(false);
        setError('User not found');
        setUser([]); // Initialize user as an empty array
      });
  };

  return (
    <div>
      {loading ? <Loadingmodal /> : null}
      <div className="text-center p-3">
        <h1 className="mb-4">Hello 👋 Influencer</h1>
        <div>
          <form onSubmit={checkCouponCode} className="d-flex gap-3 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Coupon Code"
              value={couponCode}
              required
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button type="submit" className="btn bg-primary px-4 text-white fs-5">
              Check
            </button>
          </form>
        </div>
      </div>
      <div className="container all-users">
        <div className="text-center py-3">
         {
            visible ? (
                <h4>
               Total <span className="text-primary">{user.length}</span> users are registered using your coupon code
              </h4>
            ) :
            null
         }
        </div>
        <div className="row">
          {user.map((userData) => (
            <div className="col-12 col-md-6 col-lg-4" key={userData._id}>
              <div className="user">
                <div className="user-card-header bg-primary">
                  <h5 className="text-white">{userData.name}</h5>
                </div>
                <div className="user-card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <small className="text-primary">Coupon code</small>
                      <p>{userData.coupon}</p>
                    </li>
                    <li className="list-group-item">
                      <small className="text-primary">Email</small>
                      <p>{userData.email}</p>
                    </li>
                    <li className="list-group-item">
                      <small className="text-primary">Mobile</small>
                      <p>{userData.mobile}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {error && (
        <div className="container-fluid bg-light error p-5 mt-5 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h1>
              <i className="bi bi-ban text-secondary"></i>
            </h1>
            <h1 className="text-secondary">{error}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
