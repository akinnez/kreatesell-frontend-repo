import React, { useState } from "react";
import AuthLayout from "../../../../components/authlayout";
import { Card } from "../../../../components/card";
import {
	TextInput,
	Button,
	TextArea,
	Radio,
	Percentage,
	DatePicker,
	DateInput,
	FileInput,
	Uploader,
	Checkbox,
	Switch,
} from "../../../../components/inputPack";
import { Formik, Form } from "formik";
import Tab, { TabItem } from "../../../../components/tab";
import styles from "../../../../public/css/Product.module.scss";

const Index = () => {
	const [tab, setTab] = useState(1);

	return (
		<>
			<AuthLayout>
				<Card>
					<Tab
						titles={["Product Design", "Checkout", "Design and Content"]}
						active={tab}
						onSelect={(e) => setTab(e)}
					>
						<TabItem>
							<Formik
								initialValues={{
									product_name: "",
									product_description: "",
									enable_preorder: false,
									update_content: false,
									product_visibility_status: 0,
									is_preview_only: false,
									redirect_buyer: false,
									preorder_details: {},
									file_details: {},
									product_settings: {},
									prelease_date: "",
								}}
							>
								{({ values, setFieldValue, isSubmitting, errors }) => (
									<Form>
										<div className={styles.form_container}>
											<div className="row">
												<div className="col-12">
													<h3>Add new digital product</h3>
												</div>
											</div>
											<div className="row">
												<div className="col-8">
													<TextInput
														label="Product Name"
														value={values.product_name}
														onChange={(e) => setFieldValue("product_name", e)}
														labelExtra=" choose a name for the product"
														placeholder="Brand name, Business name or Full name"
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-8">
													<TextArea
														label="Product Description"
														value={values.product_description}
														onChange={(e) =>
															setFieldValue("product_description", e)
														}
														labelExtra="add a description for your product"
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-12">
													<Checkbox
														label="Enable pre-orders"
														value={values.enable_preorder}
														onChange={(e) =>
															setFieldValue("enable_preorder", e)
														}
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-4">
													<DatePicker
														value={values.prelease_date}
														onChange={(e) => setFieldValue("prelease_date", e)}
														format="MMMM DD, YYYY  HH:h"
														label="Preorder release date"
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-12">
													<Checkbox
														label="Upload product content"
														value={values.preOrder}
														onChange={(e) => setFieldValue("preOrder", e)}
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-12">
													<Checkbox
														label="The file I'll upload is a pre-order sample file, and users should be able to download it during the preorder."
														value={values.is_preview_only}
														onChange={(e) =>
															setFieldValue("is_preview_only", e)
														}
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-12">
													<Checkbox
														label="Automatically redirect the buyer to an external URL after a purchase"
														value={values.redirect_buyer}
														onChange={(e) => setFieldValue("redirect_buyer", e)}
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-8">
													<p id="grey-bg-title">
														Visibility{" "}
														<span>
															- Should your store visitors be able to see this
															product?
														</span>
													</p>
													<div className="grey-bg">
														<Radio
															value={values.product_visibility_status}
															content={1}
															label="Visible"
															extralable="- Everyone can see this product"
															onChange={(e) =>
																setFieldValue("product_visibility_status", e)
															}
														/>

														<Radio
															value={values.product_visibility_status}
															content={0}
															label="Invisible"
															extralable="- Nobody except you can see this product"
															onChange={(e) =>
																setFieldValue("product_visibility_status", e)
															}
														/>

														<Radio
															value={values.product_visibility_status}
															content={2}
															label="Unlisted"
															extralable="- Only people who know the direct link to this product
                                can see it. Won’t be listed alongside other product on your store."
															onChange={(e) =>
																setFieldValue("product_visibility_status", e)
															}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="row">
											<div
												className="col-12 center"
												style={{ padding: "30px 0" }}
											>
												<p className="muted-text">
													Almost there, now click the button to create product
													from template
												</p>
												<Button label="Next" onClick={() => setTab(tab + 1)} />
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</TabItem>
						<TabItem>
							<Formik
								initialValues={{
									productName: "",
									preOrder: false,
									userName: "",
									bio: "",
									profilePicture: "",
									country: "",
									facebook: "",
									instagram: "",
									linkedIn: "",
									twitter: "",
								}}
							>
								{({ values, setFieldValue, isSubmitting, errors }) => (
									<Form>
										<div className={styles.form_container}>
											<div className="row">
												<div className="col-12">
													<h3>Checkout details</h3>
												</div>
											</div>
											<div className="row">
												<div className="col-8">
													<TextInput
														label="Checkout Button CTA (Call To Action)"
														value={values.productName}
														style={{ width: "320px" }}
														onChange={(e) => setFieldValue("productName", e)}
														placeholder="Buy now"
													/>
													<p className={styles.form_desc_txt}>
														Enter a customised CTA only if you want to override
														the default label for the checkout button on the
														product page.
													</p>
												</div>
											</div>
											<div className="row">
												<div className="col-8">
													<TextInput
														type="number"
														label="Price"
														labelExtra=" set to price to 0 for a free product."
														value={values.productName}
														onChange={(e) => setFieldValue("productName", e)}
														style={{ width: "320px" }}
														placeholder="0"
													/>
													<p className={styles.form_desc_txt}>
														By default, you set the price in your local currency
														and we automatically convert the amount to other
														currencies on your store page, but if you'd like to
														set the fixed price for other currencies, e.g USD?,
														you can enable this option on your{" "}
														<a href="#">currency settings</a> page.
													</p>
												</div>
											</div>

											<div className="row">
												<div className="col-12">
													<Checkbox
														label="Show striked out original price"
														value={values.preOrder}
														onChange={(e) => setFieldValue("preOrder", e)}
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-4">
													<TextInput
														type="number"
														label="Original price (NGN) * "
														value={values.productName}
														onChange={(e) => setFieldValue("productName", e)}
														placeholder="0"
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-6">
													<Checkbox
														label="Create Coupon"
														extralable="- create a coupon for this product."
														value={values.preOrder}
														onChange={(e) => setFieldValue("preOrder", e)}
													/>
													<TextInput
														value={values.productName}
														onChange={(e) => setFieldValue("productName", e)}
														placeholder="Enter coupon code"
														style={{ width: "320px" }}
													/>
													<p className={styles.form_desc_txt}>
														For the coupon discount, you can set either the
														percentage or the fixed amount discount. If you want
														to create coupon for other products you can see more
														on coupon settings page.
													</p>
												</div>
											</div>

											<div className="row">
												<div className="col-4"></div>
											</div>

											<div className="row">
												<div className="col-3">
													<Radio label="Percentage(%)" />
													<TextInput placeholder="0" />
												</div>
												<div className="col-3">
													<Radio label="Fixed Amount(NGN)" />
													<TextInput placeholder="0" />
												</div>
											</div>

											<div className="row">
												<div className="col-6">
													<h4 className={styles.section_title}>Settings</h4>
													<Switch label="Allow affiliates to market product" />
													<Percentage />
													<Switch label="Limit product sales" />
													<Switch label="Publicly show the number of sales on your product page" />
												</div>
											</div>
										</div>

										<div className="row">
											<div
												className="col-12 center"
												style={{ padding: "30px 0" }}
											>
												<p className={styles.form_desc_txt}>
													Almost there, now click the button to create product
													from template
												</p>
												<Button label="Next" />
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</TabItem>
					</Tab>
				</Card>
			</AuthLayout>

			<style jsx>{`
				.grey-bg {
					background-color: #f5f5f5;
					height: 202px;
					padding: 20px;
				}

				p#grey-bg-title {
					font-weight: 500;
				}

				p#grey-bg-title span {
					color: #8c8c8c;
				}
			`}</style>
		</>
	);
};

export default Index;
