import React from 'react';

const WaitlistModal = ({ setShowModal }) => {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
                <div className="relative z-10 bg-white px-6 py-6 md:py-8 rounded-lg shadow-lg w-11/12 md:w-1/4">
                    <div className='flex items-center justify-center mb-4 py-3'>
                        <h2 className="text-lg md:text-xl font-bold text-blue-600">Get Early Access Now!</h2>
                    </div>
                    {/* <div className='mt-6 md:mt-8 w-full'>
                    <p className=''>Name</p>
                    <input type="text" className="shadow appearance-none border rounded w-full py-3 md:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name" />
                </div>
                <div className='mt-6 md:mt-8 w-full'>
                    <p className=''>Email Address</p>
                    <input type="email" className="shadow appearance-none border rounded w-full py-3 md:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" />
                </div>
                <button type="submit" className='bg-blue-600 text-white py-3 px-4 rounded-lg mt-9 mx-auto w-full'>
                    Join For Free Now! 
                </button> */}
                    <getresponse-form form-id="beca359e-f705-49b7-b5d1-ad8859a54875" e="1"></getresponse-form>
                </div>
            </div>
        </>
    )
}

export default WaitlistModal;