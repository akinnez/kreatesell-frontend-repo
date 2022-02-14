import { useSelector } from "react-redux";
import AuthLayout from "components/authlayout";
import BecomeAnAffiliate from "components/affiliateProducts/BecomeAnAffiliate";
import Spinner from "components/Spinner";
import { isAnEmpytyObject } from "utils";
import styles from "public/css/AffiliateProducts.module.scss";

const AffiliateProducts = () => {
  const { user, loading } = useSelector(state => state.auth);

  const userIsEmpty = isAnEmpytyObject(user);

  if (loading || userIsEmpty) {
    return (
      <AuthLayout>
        <Spinner />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {!user.is_affiliate ? (
        <BecomeAnAffiliate />
      ) : (
        <div>Affiliate Products</div>
      )}
    </AuthLayout>
  );
};

export default AffiliateProducts;
