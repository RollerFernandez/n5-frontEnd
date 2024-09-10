import { Link } from 'react-router-dom';
import { IconCore } from '@/core/components/general';
import { LocalStorageSession } from '@/core/sessions';

const LeftSidebar = (): JSX.Element => {
	// const idPerfil = LocalStorageSession.getPerfil();
	const menus = LocalStorageSession.getMenuCargo();
	// Hooks
	// const { data: menus } = useListarMenuPerfilByIdPerfil(idPerfil.id);

	return (
		<aside className="left-sidebar">
			<div className="scroll-sidebar">
				<nav className="sidebar-nav">
					<ul id="sidebarnav">
						{(menus?.length ?? 0) > 0 &&
							menus?.map((element, index) => (
								<li key={`mni-${index}`}>
									<a
										className={`${element.children === null ? '' : 'has-arrow'}`}
										// href={element.urlMenu}
										aria-expanded="false"
									>
										<span className="nav-item-content">
											<IconCore icon={element.icono} />
											<span className="hide-menu">{element.nombre}</span>
										</span>
									</a>
									{(element.children?.length ?? 0) > 0 && (
										<ul aria-expanded="false" className="collapse">
											{element.children?.map((subElement, indexSubElement) =>
												(subElement.children?.length ?? 0) > 0 ? (
													<li key={`smni-${indexSubElement}`}>
														<a className="has-arrow" href="#" aria-expanded="false">
															<span className="nav-item-content">
																{subElement.icono !== '' && <IconCore icon={subElement.icono} />}
																{subElement.nombre}
															</span>
														</a>
														<ul className="collapse">
															{subElement.children?.map((subItem, indexSubItem) =>
																(subItem.children?.length ?? 0) > 0 ? (
																	<li key={`smni-${indexSubItem}`}>
																		<a className="has-arrow" href="#" aria-expanded="false">
																			<span className="nav-item-content">
																				{subItem.icono !== '' && <IconCore icon={subItem.icono} />}
																				{subItem.nombre}
																			</span>
																		</a>
																		<ul className="collapse">
																			{subItem.children?.map((subItemChild, indexSubItemChild) => (
																				<li key={`smnis-${indexSubItemChild}`}>
																					<Link to={subItemChild?.urlMenu}>
																						{subItemChild?.nombre}
																					</Link>
																				</li>
																			))}
																		</ul>
																	</li>
																) : (
																	<li key={`smni-${indexSubItem}`}>
																		<Link to={subItem.urlMenu}>{subItem.nombre}</Link>
																	</li>
																),
															)}
														</ul>
													</li>
												) : (
													<li key={`smni-${indexSubElement}`}>
														<Link to={subElement.urlMenu}>{subElement.nombre}</Link>
													</li>
												),
											)}
										</ul>
									)}
								</li>
							))}
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default LeftSidebar;
