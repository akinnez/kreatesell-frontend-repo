import * as Yup from "yup";

export const CreateCouponSchema = () => {
    return Yup.object().shape({
        coupon_settings: Yup.object().shape({
            coupon_code:  Yup.string().required('Coupon code is required').min(8, 'Coupon Code must be exactly 8 characters')
            .max(8, 'Coupon Code must be exactly 8 characters'),
            is_percentage: Yup.boolean(),
            percentage_value: Yup.number().when("is_percentage", {
                is: true,
                then: Yup.number().required('Kindly add a Percentage Value')
            }),
            is_fixed_amount: Yup.boolean(),
            fixed_amount_value: Yup.string().when("is_fixed_amount", {
                is: true,
                then: Yup.string().required('Kindly add an Amount Value')
            }),
            is_usage_limited: Yup.boolean(),
            no_of_usage: Yup.string().when("is_usage_limited", {
                is: true,
                then: Yup.string().required('Kindly add Number of Usage')
            }),
            is_coupon_limited: Yup.boolean(),
            no_of_frequency: Yup.string().when("is_coupon_limited", {
                is: true,
                then: Yup.string().required('Kindly add Number of Frequency')
            }),
            is_for_all_product: Yup.boolean(),
            product_id: Yup.string().when("is_for_all_product", {
                is: false,
                then: Yup.string().required('Kindly add a Specific Product')
            }),
        }),
        isBasicPlan: Yup.boolean().isFalse("Coupon is for Business plan, kindly upgrade your account")
      });
}