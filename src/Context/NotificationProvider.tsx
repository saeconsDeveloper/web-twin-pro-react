import { notification } from 'antd';
import { createContext, useContext } from 'react';
export const NotificationContext = createContext({});

const NotificationProvider = ({ children }: any) => {
	const [notificationApi, contextHolder] = notification.useNotification();
	return (
		<NotificationContext.Provider value={notificationApi}>
			{contextHolder}
			{children}
		</NotificationContext.Provider>
	);
};
const useNotification = () => {
	const context = useContext(NotificationContext);

	if (context) {
		return context;
	}

	throw new Error(`useNotification must be used within a NotificationProvider`);
};

export { NotificationProvider, useNotification };