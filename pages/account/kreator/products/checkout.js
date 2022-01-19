import React from "react";
import AuthLayout from "../../../../components/authlayout";
import Topbar from "../../../../components/topbar";
import { Card } from "../../../../components/card";
import {
	TextInput,
	Button,
	TextArea,
	Radio,
	CustomSelect,
	DateInput,
	FileInput,
	Uploader,
	Checkbox,
} from "../../../../components/inputPack";
import { Formik, Form } from "formik";

const Index = () => {
	return (
		<>
			<AuthLayout></AuthLayout>

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
