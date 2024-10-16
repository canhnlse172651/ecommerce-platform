import { useEffect } from "react";
import { useMainContext } from "@/contexts/MainContext";
import { Link, NavLink } from "react-router-dom";
import Search from "./Search";
import CartDropdown from "./CartDropdown";
import { PATHS } from "@/constant/path";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveCart } from "@/store/Reducer/cartReducer";

const HeaderMidle = () => {
  const { handleShowMobileMenu } = useMainContext();

  useEffect(() => {
    // Header Search Toggle

    var $searchWrapper = $(".header-search-wrapper"),
      $body = $("body"),
      $searchToggle = $(".search-toggle");

    $searchToggle.on("click", function (e) {
      $searchWrapper.toggleClass("show");
      $(this).toggleClass("active");
      $searchWrapper.find("input").focus();
      e.preventDefault();
    });

    $body.on("click", function (e) {
      if ($searchWrapper.hasClass("show")) {
        $searchWrapper.removeClass("show");
        $searchToggle.removeClass("active");
        $body.removeClass("is-search-active");
      }
    });

    $(".header-search").on("click", function (e) {
      e.stopPropagation();
    });

    // Sticky header
    var catDropdown = $(".category-dropdown"),
      catInitVal = catDropdown.data("visible");

    if ($(".sticky-header").length && $(window).width() >= 992) {
      var sticky = new Waypoint.Sticky({
        element: $(".sticky-header")[0],
        stuckClass: "fixed",
        offset: -300,
        handler: function (direction) {
          // Show category dropdown
          if (catInitVal && direction == "up") {
            catDropdown
              .addClass("show")
              .find(".dropdown-menu")
              .addClass("show");
            catDropdown.find(".dropdown-toggle").attr("aria-expanded", "true");
            return false;
          }

          // Hide category dropdown on fixed header
          if (catDropdown.hasClass("show")) {
            catDropdown
              .removeClass("show")
              .find(".dropdown-menu")
              .removeClass("show");
            catDropdown.find(".dropdown-toggle").attr("aria-expanded", "false");
          }
        },
      });
    }
  }, []);
  const dispatch = useDispatch();
  const { cartInfor, cartLoading } = useSelector((state) => state.cart);
  const { product, quantity, total, totalProduct, shipping, variant } =
    cartInfor || {};

  const handleRemoveProduct = (removeIndex) => {
    if (cartLoading || removeIndex < 0) return;
    dispatch(handleRemoveCart({ removeIndex }));
  };

  const cartDropdownProps = {
    products:
      product?.map((item, index) => {
        return {
          ...item,
          quantity: quantity?.[index],
          totalProduct: totalProduct?.[index],
          variant: variant?.[index],
        };
      }) || [],
    total,
    shipping,
    handleRemoveProduct
  };

  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button
            className="mobile-menu-toggler"
            onClick={handleShowMobileMenu}
          >
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <Link to={PATHS.HOME} className="logo">
            <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
          </Link>
        </div>
        <nav className="main-nav">
          <ul className="menu">
            <li>
              <NavLink to={PATHS.HOME}>Home</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          <Search />
          <CartDropdown {...cartDropdownProps}/>
        </div>
      </div>
    </div>
  );
};

export default HeaderMidle;
