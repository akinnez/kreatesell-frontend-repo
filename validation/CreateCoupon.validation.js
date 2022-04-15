import * as Yup from "yup";

export const CreateCouponSchema = () => {
    return Yup.object().shape({
        coupon_settings: Yup.object().shape({
            coupon_code:  Yup.string().required('Coupon code is required')
        })
      });
}