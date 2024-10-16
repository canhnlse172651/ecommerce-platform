import { PATHS } from "@/constant/path";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authenService } from "@/services/authenService";
import useQuery from "@/hooks/useQuery";
const AccountAddress = () => {
  const { profile } = useSelector((state) => state.auth);

  const { province : provinceId, district : districhId, ward : wardId, street } = profile || {};
 
  
  

  const { data : provinceData} = useQuery(() =>
    authenService.getProvinceById(provinceId)
  );
  const { data : districtData} = useQuery(() =>
    authenService.getDistrictById(districhId)
  );
  const { data : wardData,} = useQuery(() =>
    authenService.getWardById(wardId)
  );
  
  const address = `${provinceData?.name} - ${districtData?.name} - ${wardData?.name} - ${street}`
  
 
  return (
    <div
      className="tab-pane fade show active"
      id="tab-address"
      role="tabpanel"
      aria-labelledby="tab-address-link"
    >
      <p>
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Billing Address</h3>
              <p>
                <strong>Fullname : </strong>{" "}
                {`${profile?.firstName} ${profile?.lastName}`} <br />
                <strong>Email : </strong> {profile?.email} <br />
                <strong>Phone number : </strong>
                {profile?.phone} <br />
                <br />
                <Link to={PATHS.PROFILE.INDEX}>
                  Edit <i className="icon-edit" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Shipping Address</h3>
              <p>
              {address} <br />
                <br />
                <Link to={PATHS.PROFILE.INDEX}  >
                  Edit <i className="icon-edit" />
                  
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAddress;
