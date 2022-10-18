import {Button, Form, Input, Select} from 'antd';
import {useFormik} from 'formik';
import Editor from '../Editor';
import EnableFormSwitch from '../EnableFormSwitch';
import EmailTags from '../EmailTags';
import {options} from '../../data/formData';
import {AbandonedCartSchema} from 'validation/AbandonedCartSchema.validation';
import {showToast} from 'utils';
import axiosAPI from 'utils/axios';
import styles from './index.module.scss';

const AbandonedCartsForm = ({showModal, campaign}) => {
	const submitHandler = (values, actions) => {
		const data = {
			title: values.admin_title.trim(),
			is_enabled: values.enable,
			time_to_send: values.when_to_send,
			email_subject: values.email_subject.trim(),
			email_content: values.email_content.trim(),
			action: campaign ? 'e' : 'c',
			id: campaign?.id || 0,
		};

		axiosAPI.request(
			'post',
			`${process.env.BASE_URL}v1/kreatesell/product/campaign/manage`,
			() => {
				showModal();
			},
			(err) => {
				showToast(err.message, 'error');
				actions.setSubmitting(false);
			},
			data
		);
	};

	const formik = useFormik({
		initialValues: {
			admin_title: campaign?.admin_title || '',
			enable: campaign?.is_enabled ?? false,
			when_to_send: campaign?.time_to_send || null,
			email_subject: campaign?.email_subject || '',
			email_content: campaign?.email_content || '',
		},
		validationSchema: AbandonedCartSchema,
		onSubmit: submitHandler,
	});

	const customHandler = (field, value) => {
		formik.setFieldValue(field, value);
	};

	return (
		<Form
			className={styles.form}
			name="abandoned_carts_form"
			layout="vertical"
			size="large"
			onFinish={formik.handleSubmit}
			initialValues={{
				admin_title: formik.values.admin_title,
				when_to_send: formik.values.when_to_send,
				email_subject: formik.values.email_subject,
				email_content: formik.values.email_content,
			}}
		>
			<Form.Item
				label="Admin Title"
				name="admin_title"
				validateStatus={
					formik.touched.admin_title &&
					formik.errors.admin_title &&
					'error'
				}
				help={formik.touched.admin_title && formik.errors.admin_title}
			>
				<Input
					placeholder="kreatesell"
					{...formik.getFieldProps('admin_title')}
				/>
			</Form.Item>
			<EnableFormSwitch formik={formik} customHandler={customHandler} />
			<Form.Item
				label="When To Send"
				name="when_to_send"
				validateStatus={
					formik.touched.when_to_send &&
					formik.errors.when_to_send &&
					'error'
				}
				help={formik.touched.when_to_send && formik.errors.when_to_send}
			>
				<Select
					placeholder="10 Mins"
					options={options}
					onChange={(val) => customHandler('when_to_send', val)}
					onBlur={formik.handleBlur}
				/>
			</Form.Item>
			<Form.Item
				label="Email Subject Line"
				name="email_subject"
				validateStatus={
					formik.touched.email_subject &&
					formik.errors.email_subject &&
					'error'
				}
				help={
					formik.touched.email_subject && formik.errors.email_subject
				}
			>
				<Input
					placeholder="kreatesell"
					{...formik.getFieldProps('email_subject')}
				/>
			</Form.Item>
			<Editor formik={formik} />
			<EmailTags />
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					loading={formik.isSubmitting}
				>
					Save
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AbandonedCartsForm;
