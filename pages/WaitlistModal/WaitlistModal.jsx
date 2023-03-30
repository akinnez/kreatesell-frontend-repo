import React from 'react';
import Form from 'components/Attention/Form';

const WaitlistModal = ({ setShowModal, showSubmissionSuccessModal, showSubmissionFailureModal }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
                <div className="relative z-10 bg-white px-8 py-6 md:py-8 rounded-lg shadow-lg w-11/12 md:w-3/5">
                    <div className='mb-4 py-3 text-center'>
                        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-5">Get Early Access Now!</h2>
                        <Form
                            showSubmissionSuccessModal={showSubmissionSuccessModal} 
                            showSubmissionFailureModal={showSubmissionFailureModal}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WaitlistModal;