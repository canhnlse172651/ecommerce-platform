import { MODAL_TYPE } from "@/constant/general";
import { localToken } from "@/utils/token";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout, handleShowModal } from "@/store/Reducer/authReducer";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/constant/path";

const HeaderTop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile} = useSelector((state) => state.auth);

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!localToken.get() && (
            <ul className="top-menu top-link-menu">
              <li>
                <a
                  href="#signin-modal"
                  // data-toggle="modal"
                  class="top-menu-login"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(handleShowModal(MODAL_TYPE.login));
                  }}
                >
                  <i class="icon-user"></i>Login | Resgister{" "}
                </a>
              </li>
            </ul>
          )}

          {!!localToken.get() && (
            <ul className="top-menu">
              <li>
                <a href="#" className="top-link-menu">
                  <i className="icon-user" />
                  {profile?.firstName}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.PROFILE.INDEX}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE.PROFILE_ORDER}>Your Orders</Link>
                      </li>
                      <li>
                       
                      </li>
                      <li>
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(handleLogout());
                            navigate(PATHS.HOME);
                          }}
                          href="#"
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
