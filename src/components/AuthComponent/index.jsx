import { MODAL_TYPE } from "@/constant/general";
import { useAuthenContext } from "@/contexts/AuthenContext";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const AuthComponent = () => {
  const { profile, handleShowModal, handleModalClose, showModal } =
    useAuthenContext();

  const _onTabChange = (e, tab) => {
    e.preventDefault();
    handleShowModal?.(tab);
  };
 

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="signin-modal"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleModalClose}
            >
              <span aria-hidden="true">
                <i className="icon-close" />
              </span>
            </button>
            <div className="form-box">
              <div className="form-tab">
                <ul
                  className="nav nav-pills nav-fill nav-border-anim"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        showModal === MODAL_TYPE.login ? "active" : ""
                      }`}
                      id="signin-tab"
                      data-toggle="tab"
                      href="#signin"
                      role="tab"
                      aria-controls="signin"
                      aria-selected="true"
                      onClick={(e) => _onTabChange(e, MODAL_TYPE.login)}
                    >
                      Sign In
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        showModal === MODAL_TYPE.register ? "active" : ""
                      }`}
                      id="register-tab"
                      data-toggle="tab"
                      href="#register"
                      role="tab"
                      aria-controls="register"
                      aria-selected="false"
                      onClick={(e) => _onTabChange(e, MODAL_TYPE.register)}
                    >
                      Register
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="tab-content-5">
                  <div className="tab-pane fade show active">
                    {showModal === MODAL_TYPE.login && <LoginForm />}

                    {/* .End .tab-pane */}
                    {showModal === MODAL_TYPE.register && <RegisterForm />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
