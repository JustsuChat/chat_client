import {
  AppstoreOutlined,
  CarryOutOutlined,
  FormOutlined,
  LoginOutlined,
  HomeOutlined,
  ScheduleOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Menu, message, Avatar } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { fetchUserProfile, setLogin } from 'app/globalSlice';
import settings from 'app/settings';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import auth from 'utils/auth';
import logo from '../../assets/images/logo.png';
import './style.scss';

const { SubMenu } = Menu;

function Header() {
  const { isLogin, user } = useSelector((state) => state.global);
  const { listLevels } = useSelector((state) => state.level);
  const dispatch = useDispatch();
  const [keyMenu, setKeyMenu] = useState('home');
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(fetchUserProfile());
    handleSetKeyMenu();
  }, []);
  const handleSetKeyMenu = () => {
    const newKey = pathname.split('/')[1];
    setKeyMenu(newKey === '' ? 'home' : newKey);
  };

  const handleOnClick = (e) => {
    setKeyMenu(e.key);
  };

  const getKeyOfCurrentRoute = (currentRoute) => {
    if (!currentRoute) {
      return settings.routes.home;
    }

    let objectKeys = Object.keys(settings.routes);

    const routes = objectKeys.map((key) => settings.routes[key]).reverse();

    for (const route of routes) {
      if (currentRoute.includes(route.url)) {
        return route.url;
      }
    }

    return settings.routes.home;
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px 0',
    // boxShadow: " 0 4px 4px -2px #c4c4c4"
  };

  return (
    <div id="content">
      <div className="header-common-page">
        <div className="header-wrapper">
          <div className="header_left">
            <Link to="/">
              <img width="120px" src={logo} />
            </Link>
          </div>

          <div className="header_right">
            <Menu
              mode="horizontal"
              style={headerStyle}
              onClick={handleOnClick}
              // selectedKeys={keyMenu}
              selectedKeys={getKeyOfCurrentRoute(location.pathname)}
            >
              <Menu.Item
                key={settings.routes.home.url}
                className="menuLink"
                icon={<HomeOutlined />}
              >
                <Link to={settings.routes.home.url}>Trang ch???</Link>
              </Menu.Item>

              <SubMenu
                key={settings.routes.levels.url}
                icon={<ScheduleOutlined />}
                title="Kho?? h???c"
                className="menuLink"
              >
                {listLevels.map((level) => (
                  <Menu.Item className="menuLink" key={level.id}>
                    <Link to={`${settings.routes.levels.url}/${level.slug}`}>
                      {level.name}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>

              <Menu.Item
                key={settings.routes.classes.url}
                className="menuLink"
                icon={<CarryOutOutlined />}
              >
                <Link to={settings.routes.classes.url}>L???ch khai gi???ng</Link>
              </Menu.Item>

              <Menu.Item
                key={settings.routes.courses.url}
                className="menuLink"
                icon={<AppstoreOutlined />}
              >
                <Link to={settings.routes.courses.url}>T??? v???ng</Link>
              </Menu.Item>

              {isLogin && (
                <Menu.Item
                  key={settings.routes.wordnotes.url}
                  className="menuLink"
                  icon={<FormOutlined />}
                >
                  <Link to={settings.routes.wordnotes.url}>Kho l??u tr???</Link>
                </Menu.Item>
              )}

              <Menu.Item
                key={settings.routes.exams.url}
                className="menuLink"
                icon={<CarryOutOutlined />}
              >
                <Link to={settings.routes.exams.url}>Luy???n thi toeic</Link>
              </Menu.Item>

              {/* <SubMenu key="parts" icon={<ScheduleOutlined />} title="L??m theo part">
          <Menu.ItemGroup title="Luy???n nghe">
            {[1, 2, 3, 4].map((part) => (
              <Menu.Item key={`part_${part}`}>
                <Link to={`/parts/${part}`}>Part {part}</Link>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>

          <Menu.ItemGroup title="Luy???n ?????c">
            {[5, 6, 7].map((part) => (
              <Menu.Item key={`part_${part}`}>
                <Link to={`/parts/${part}`}>Part {part}</Link>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </SubMenu> */}

              {isLogin ? (
                <SubMenu
                  key={settings.routes.me.url}
                  className="menuLink"
                  icon={
                    user?.image ? (
                      <Avatar
                        style={{ marginTop: '-5px' }}
                        size={32}
                        src={user?.image}
                      />
                    ) : (
                      <UserOutlined />
                    )
                  }
                  title={user?.name}
                >
                  <Menu.Item className="menuLink" key={settings.routes.me.url}>
                    <Link to={settings.routes.me.url}>T??i kho???n</Link>
                  </Menu.Item>

                  <Menu.Item
                    className="menuLink"
                    key={settings.routes.schedules.url}
                  >
                    <Link to={settings.routes.schedules.url}>
                      Th???i kho?? bi???u
                    </Link>
                  </Menu.Item>

                  {user?.roles?.length > 1 && (
                    <Menu.Item className="menuLink" key="admin">
                      <a href="http://localhost:3001/admin">Qu???n l??</a>
                    </Menu.Item>
                  )}

                  <Menu.Item
                    className="menuLink"
                    key={settings.routes.logout.url}
                  >
                    <Link
                      to={settings.routes.login.url}
                      onClick={() => {
                        confirm({
                          title: 'B???n c?? mu???n ????ng xu???t kh??ng?',
                          icon: <ExclamationCircleOutlined />,
                          okText: '????ng xu???t',
                          cancelText: 'Hu???',
                          onOk() {
                            auth.logout(() => {
                              message.success('B???n ???? ????ng xu???t');
                              dispatch(setLogin(false));
                            });
                          },
                          onCancel() {},
                        });
                      }}
                    >
                      ????ng xu???t
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : (
                <>
                  <Menu.Item
                    key={settings.routes.login.url}
                    className="menuLink"
                    icon={<LoginOutlined />}
                  >
                    <Link to={settings.routes.login.url}>????ng nh???p</Link>
                  </Menu.Item>

                  {/* <SubMenu key="login" icon={<LoginOutlined />} title="????ng nh???p">
              <Menu.Item key="11_2">
                <Link to="/login/manage">Qu???n l??</Link>
              </Menu.Item>
            </SubMenu> */}
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
