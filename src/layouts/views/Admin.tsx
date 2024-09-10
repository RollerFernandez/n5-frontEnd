import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';
import LeftSidebar from './components/LeftSidebar';

const Admin = (): JSX.Element => {
	let elmBody: HTMLBodyElement | null;
	let sidebarnav: HTMLElement | null;
	let ps: PerfectScrollbar | null = null;
	const psNotifications: Array<PerfectScrollbar | null> = [];

	useEffect(() => {
		elmBody = document.querySelector('body');
		sidebarnav = document.getElementById('sidebarnav');

		const elmScrollSidebar = document.querySelector('.scroll-sidebar');
		const messageCenter = document.querySelectorAll('.message-center');

		if (elmScrollSidebar != null) {
			ps = new PerfectScrollbar(elmScrollSidebar, {
				wheelSpeed: 2,
				wheelPropagation: true,
				minScrollbarLength: 20,
			});
		}

		if (messageCenter != null) {
			const arrayMessageCenter = Array.from(messageCenter);

			arrayMessageCenter.forEach(msCenter => {
				psNotifications.push(
					new PerfectScrollbar(msCenter, {
						wheelSpeed: 2,
						wheelPropagation: true,
						minScrollbarLength: 20,
					}),
				);
			});
		}

		const elmSidebartoggler = document.querySelector('.sidebartoggler');
		elmSidebartoggler?.addEventListener('click', sidebarTogglerEvent);

		const elmNavToggler = document.querySelector('.nav-toggler');
		elmNavToggler?.addEventListener('click', navTogglerEvent);

		// addEventListener (global)
		sidebarnav?.addEventListener('click', sidebarnavEvent);
		elmBody?.addEventListener('resize', setResize);
		window.addEventListener('resize', setResize);

		setResize();

		return () => {
			window.removeEventListener('resize', setResize);
			elmBody?.removeEventListener('resize', setResize);
			elmSidebartoggler?.removeEventListener('click', sidebarTogglerEvent);
			elmNavToggler?.removeEventListener('click', navTogglerEvent);
			sidebarnav?.removeEventListener('click', sidebarnavEvent);
			psNotifications.forEach(notification => {
				notification?.destroy();
			});
		};
	}, []);

	// Methods
	const setResize = (): void => {
		const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
		const topOffset = 35;

		const elmPageBody = document.querySelector('body');
		const elmSidebartogglerIcon = document.querySelector('.sidebartoggler i');
		const elmPageWrapper = document.querySelector('.page-wrapper');
		const logoTextSidebar = document.getElementById('logoTextSidebar') as HTMLElement;

		if (width < 1170) {
			elmPageBody?.classList.add('mini-sidebar');

			if (logoTextSidebar != null) logoTextSidebar.style.display = 'none';

			if (elmSidebartogglerIcon != null) elmSidebartogglerIcon.classList.add('fa-bars');
		} else {
			elmPageBody?.classList.remove('mini-sidebar');

			if (logoTextSidebar != null) logoTextSidebar.style.display = 'block';
		}

		let height = (window.innerHeight > 0 ? window.innerHeight : window.screen.height) - 1;
		height -= topOffset;
		if (height < 1) height = 1;
		if (height > topOffset) {
			if (elmPageWrapper != null) (elmPageWrapper as HTMLElement).style.minHeight = `${height}px`;
		}
	};

	const sidebarTogglerEvent = (evt: Event): void => {
		evt.preventDefault();

		const logoTextSidebar = document.getElementById('logoTextSidebar') as HTMLElement;

		if (elmBody?.classList.contains('mini-sidebar') ?? false) {
			setResize();
			elmBody?.classList.remove('mini-sidebar');

			if (logoTextSidebar != null) logoTextSidebar.style.display = 'block';
		} else {
			setResize();
			elmBody?.classList.add('mini-sidebar');

			if (logoTextSidebar != null) logoTextSidebar.style.display = 'none';
		}

		// PerfectScrollbar
		ps?.update();
	};

	const navTogglerEvent = (evt: Event): void => {
		evt.preventDefault();

		const elmNavTogglerIcon = document.querySelector('.nav-toggler i');

		elmBody?.classList.toggle('show-sidebar');

		if (elmNavTogglerIcon != null) {
			elmNavTogglerIcon.classList.toggle('fa-bars');
			elmNavTogglerIcon.classList.toggle('fa-times');
		}

		// PerfectScrollbar
		ps?.update();
		// psNotification?.update();
		psNotifications.forEach(notification => {
			notification?.update();
		});
	};

	const sidebarnavEvent = (evt: MouseEvent): void => {
		if (sidebarnav == null) return;

		const target = evt.target as HTMLElement;

		if (target == null) return;

		const elmA = target.closest('a');

		if (elmA == null) return;

		const addressValue: string | null = elmA.getAttribute('href');

		if (['#', '', '/#', '#/'].includes(addressValue ?? '')) evt.preventDefault();

		const elmUls = Array.from(sidebarnav.querySelectorAll('ul'));
		const elmAs = Array.from(sidebarnav.querySelectorAll('a'));

		if (!elmA.classList.contains('active')) {
			let prevElem = null;
			let nextElem = elmA.nextElementSibling;

			if (nextElem == null) nextElem = elmA.closest('ul');
			if (nextElem != null) prevElem = nextElem.previousElementSibling;

			// Remove active class on all elements ul
			elmUls.forEach(itemUl => {
				itemUl.classList.remove('in');
			});

			// Remove active class on all elements a
			elmAs.forEach(itemA => {
				itemA.classList.remove('active');
			});

			// Ul Parent
			const elmUlParent = elmA.closest('ul');
			if (elmUlParent?.id !== sidebarnav.id) {
				elmUlParent?.classList.add('in');

				const prevParentElem = elmUlParent?.previousElementSibling;
				if (prevParentElem != null) {
					prevParentElem.classList.add('active');

					// Ul Granfather
					const elmGranfather = prevParentElem.closest('ul');
					if (elmGranfather?.id !== sidebarnav.id) {
						elmGranfather?.classList.add('in');

						const prevGranfather = elmGranfather?.previousElementSibling;
						if (prevGranfather != null) prevGranfather.classList.add('active');
					}
				}
			}

			if (nextElem != null) nextElem.classList.add('in');
			if (prevElem != null) prevElem.classList.add('active');
			elmA.classList.add('active');
		} else if (elmA.classList.contains('active')) {
			const nextElem = elmA.nextElementSibling;

			// Ul Parent
			const elmUlParent = elmA.closest('ul');
			if (elmUlParent?.id !== sidebarnav.id) {
				const prevParentElem = elmUlParent?.previousElementSibling;
				if (prevParentElem != null) {
					// Ul Granfather
					const elmGranfather = prevParentElem.closest('ul');
					if (elmGranfather?.id === sidebarnav.id) {
						if (nextElem?.classList?.contains('in') ?? false) {
							// prevParentElem.classList.remove('active');
							nextElem?.classList.remove('in');
						} else {
							prevParentElem.classList.remove('active');
							elmUlParent?.classList.remove('in');
						}
					}
				}
			}

			elmA.classList.remove('active');
			if (nextElem != null) nextElem.classList.remove('in');
		}
	};

	return (
		<section id="main-wrapper" className="main-wrapper">
			<PageHeader />

			<LeftSidebar />

			<div className="page-wrapper">
				<div className="container-fluid">
					<Outlet />
				</div>
			</div>

			<PageFooter />
		</section>
	);
};

export default Admin;
