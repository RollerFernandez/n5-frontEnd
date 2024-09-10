import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import '@popperjs/core';
import 'bootstrap';

import '@/layouts/views/styles/app/scss/app.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import routers from '@/routers/index.tsx';

import { AxiosInterceptor } from './core/interceptors';

AxiosInterceptor();

library.add(fas, far);
registerLocale('es', es);
const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={routers} />
			<ToastContainer />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>,
);
