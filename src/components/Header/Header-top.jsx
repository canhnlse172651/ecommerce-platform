import { useAuthenContext } from "@/contexts/AuthenContext";
import { MODAL_TYPE } from "@/constant/general";
import { localToken } from "@/utils/token";

const HeaderTop = () => {

  const {handleShowModal} = useAuthenContext()


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
            <ul class="top-menu top-link-menu">
              <li>
                <a
                  href="#signin-modal"
                  data-toggle="modal"
                  class="top-menu-login"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowModal?.(MODAL_TYPE.login);

                  }}
                  
                >
                  <i class="icon-user"></i>Login | Resgister{" "}
                </a>
              </li>
            </ul>
          )}

           {
             !!localToken.get() && (
              <ul className="top-menu">
              <li>
                <a href="#" className="top-link-menu">
                  <i className="icon-user" />
                  Tran Nghia{" "}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <a href="dashboard.html">Account Details</a>
                      </li>
                      <li>
                        <a href="dashboard.html">Your Orders</a>
                      </li>
                      <li>
                        <a href="dashboard.html">
                          Wishlist <span>(3)</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">Sign Out</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
             )
           }
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
