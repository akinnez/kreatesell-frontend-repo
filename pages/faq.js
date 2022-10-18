import {useState, useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FAQHero, ArrowDown} from '../utils';
import {Layout, Input, Button} from '../components';
import {BackTop, Tabs} from 'antd';
import {MdArrowForward} from 'react-icons/md';
import Kreator from '../components/faqTabs/Kreator';
import Affiliate from '../components/faqTabs/Affiliate';
import KreatorAffiliate from '../components/faqTabs/KreatorAffiliate';
import Buyer from '../components/faqTabs/Buyer';
import General from '../components/faqTabs/General';
import styles from '../public/css/Faq2.module.scss';
import {questionsData} from 'utils/FAQ';

const FAQ2 = () => {
	const [questions, setQuestions] = useState({});
	const [activeTab, setActiveTab] = useState('Kreator');
	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [searchKeyword, setSearchKeyWord] = useState('');
	const {TabPane} = Tabs;

	const backToTopStyle = {
		// backgroundColor: "#0072ef",
		// color: "#ffffff",
	};

	const handleChange = (e) => {
		setActiveTab((prev) => e);
		// do logic to filter active questions if there is a search key
		if (searchKeyword) {
			setFilteredQuestions((prev) =>
				questions[e].filter(({question}) =>
					question.toLowerCase().includes(searchKeyword.toLowerCase())
				)
			);
		} else {
			setFilteredQuestions(questions[e]);
		}
	};

	const handleInputChange = (value) => {
		setSearchKeyWord(value);
		setFilteredQuestions((prev) =>
			questions[activeTab].filter(({question}) =>
				question.toLowerCase().includes(value.toLowerCase())
			)
		);
	};

	function getQuestions() {
		setQuestions(questionsData);
		setFilteredQuestions(questionsData[activeTab]);
	}

	useEffect(() => {
		getQuestions();
	}, []);

	return (
		<Layout defaultMarginTop={true}>
			<div className={styles.container2}>
				<div className={styles.hero2}>
					<div className={styles.heroText2}>
						<h3>How can we help you?</h3>
						<p>
							Email us at{' '}
							<a
								target="blank"
								href="mailto:hello@kreatesell.com"
							>
								hello@kreatesell.com
							</a>{' '}
							if you don&#39;t find an answer here.
						</p>
					</div>
					<div className={styles.heroImage2}>
						<Image src={FAQHero} width="366" height="300" alt="" />
					</div>
				</div>

				<div className={styles.backToTop}>
					<BackTop style={backToTopStyle} />
				</div>
				<div className={styles.faq2}>
					<h3>Frequently Asked Questions</h3>
					<Input
						type="search"
						placeholder="Search by keyword"
						className={styles.input}
						onChange={(e) => handleInputChange(e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.body}>
				<div
					className={`${styles.groupQuestions2} custom__faq__container`}
				>
					<Tabs
						defaultActiveKey="Kreator"
						centered
						onChange={handleChange}
					>
						<TabPane tab="Kreator" key="Kreator">
							<Kreator
								questions={
									(activeTab === 'Kreator' &&
										filteredQuestions.length > 0 &&
										filteredQuestions) ||
									[]
								}
							/>
						</TabPane>
						<TabPane tab="Affiliate" key="Affiliate">
							<Affiliate
								questions={
									(activeTab === 'Affiliate' &&
										filteredQuestions.length > 0 &&
										filteredQuestions) ||
									[]
								}
							/>
						</TabPane>
						<TabPane
							tab="Kreator  & Affiliate"
							key="KreatorAffiliate"
						>
							<KreatorAffiliate
								questions={
									(activeTab === 'KreatorAffiliate' &&
										filteredQuestions.length > 0 &&
										filteredQuestions) ||
									[]
								}
							/>
						</TabPane>
						<TabPane tab="Buyer" key="Buyer">
							<Buyer
								questions={
									(activeTab === 'Buyer' &&
										filteredQuestions.length > 0 &&
										filteredQuestions) ||
									[]
								}
							/>
						</TabPane>
						<TabPane tab="General" key="General">
							<General
								questions={
									(activeTab === 'General' &&
										filteredQuestions.length > 0 &&
										filteredQuestions) ||
									[]
								}
							/>
						</TabPane>
					</Tabs>
				</div>
			</div>
			<div className={styles.enjoyBenefits}>
				<h2 className={styles.heading}>
					Enjoy the benefits of multiple <br /> applications in one
					place!
				</h2>
				<p className={styles.description}>
					Create, manage and promote your entire business with just
					one login. Just an account connects you to <br /> multiple
					features like webinar, automation, email marketing,
					membership billing & much more.
				</p>

				<div className={styles.getStarted}>
					<Input
						type="input"
						placeholder="Enter your email"
						className={styles.input}
					/>
					<Button
						text="Get Started Free"
						type="button"
						loading={false}
						disabled={false}
						bgColor="primaryBlue"
						className={styles.button}
						icon={
							<MdArrowForward
								style={{fontSize: '10px', color: '#fff'}}
							/>
						}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default FAQ2;
