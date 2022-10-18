import * as yup from 'yup';

export const KreatorReportSchema = yup.object({
	report_note: yup
		.string()
		.required('Enter report note')
		.trim('Enter report note'),
});
