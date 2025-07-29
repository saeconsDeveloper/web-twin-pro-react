import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';
import {CONFIG} from '../config';

const request = setupInterceptorsTo(
	axios.create({
		baseURL: `${CONFIG.BASE_URI}`,
		headers: {
			'Content-Type': 'application/json',
		},
		timeout: 90000,
	}),
);

export default request;