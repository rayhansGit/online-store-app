/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../redux/actionCreators/authActions';

const AllLinks = {
	admin: ['Orders', 'Users'],
	customer: ['Orders', 'Cart'],
	guest: ['Cart', 'Login', 'Register'],
};
/**
 * @component
 *
 */
const Navbar = () => {
	const user = useSelector(state => state.auth)
	
	if (user.user != undefined) {
		
		switch (user.user.role) {
			case 'customer':
				return (
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<a className="navbar-brand p-3" href="#">Online Store</a>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ms-auto p-3">
								<li className="nav-item active">
									<a className="nav-link" href="/">Home</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/product">Product</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/cart">Orders</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/login">Cart</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/register">Logout</a>
								</li>
							</ul>

						</div>


					</nav>
				);
			case 'admin':
				return (
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<a className="navbar-brand p-3" href="#">Online Store</a>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ms-auto p-3">
								<li className="nav-item active">
									<a className="nav-link" href="/">Home</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/product">Products</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/cart">Orders</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/login">Users</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/register">Logout</a>
								</li>
							</ul>

						</div>


					</nav>
				);
			case 'guest':
				return (
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<a className="navbar-brand p-3" href="#">Online Store</a>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ms-auto p-3">
								<li className="nav-item active">
									{/* <a className="nav-link" href="/">Home</a> */}
									<Link to="/" className='nav-link'>Home</Link>
								</li>
								<li className="nav-item">
									{/* <a className="nav-link" href="/product">Product</a> */}
									<Link to="/product" className='nav-link'>Product</Link>
								</li>
								<li className="nav-item">
									{/* <a className="nav-link" href="/cart">Cart</a> */}
									<Link to="/cart" className='nav-link'>Cart</Link>
								</li>
								<li className="nav-item">
									{/* <a className="nav-link" href="/login">Login</a> */}
									<Link to="/login" className='nav-link'>login</Link>
								</li>
								<li className="nav-item">
									{/* <a className="nav-link" href="/register">Register</a> */}
									<Link to="/register" className='nav-link'>register</Link>
								</li>
							</ul>

						</div>
					</nav>
				);
			default:
				return <></>
		}
	}else{
		return <></>
	}

};

export default Navbar;
