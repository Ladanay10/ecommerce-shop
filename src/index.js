import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<ToastContainer
				theme="dark"
				position="top-right"
				autoClose={2000}
				closeOnClick
				pauseOnHover={false}
			/>
			<App />
		</BrowserRouter>
	</Provider>
);
