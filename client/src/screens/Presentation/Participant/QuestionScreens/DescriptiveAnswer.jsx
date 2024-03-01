import React, { useContext, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import RealTimeParticipantDataContext from '../../../../context providers/RealTimeData (participant)/RealTimeParticipantDataContext';
import OptionCheckbox from './Components/OptionCheckbox';

export default function DescriptiveAnswer() {
    const { currentSlideData, takeResponses, resetResponses, ws } = useContext(RealTimeParticipantDataContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answer, setAnswer] = useState("");

    const onChange = (e) => {
        setAnswer((prevAnswer)=>{
            return e.target.value;
        });
    }

    useEffect(() => {
        setIsSubmitted(false);
    }, [currentSlideData]);

    const onSubmit = () => {
        ws.send(JSON.stringify({
            method: "response",
            questionType: currentSlideData.selectedSlideType,
            answer: answer,
            slideId: currentSlideData._id,
        }));
        setIsSubmitted(true);
    }

    return (
        <section className='flex flex-col h-screen items-center justify-center'>
            <div className="flex items-center justify-center w-1/4 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        {currentSlideData.question.heading}
                    </h2>
                    {
                        !isSubmitted ?
                            takeResponses || resetResponses ?
                                <>
                                    <p className="mt-2 text-center text-sm text-gray-600 ">
                                        {currentSlideData.question.description}
                                    </p>
                                    <form action="#" method="POST" className="mt-8">
                                        <div className="flex flex-col items-center justify-center space-y-5">

                                            <div className="flex flex-col items-start w-full">
                                                <label
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
                                                    htmlFor="name"
                                                >
                                                    Enter your answer
                                                </label>
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="text"
                                                    onChange={onChange}
                                                    placeholder="Your answer goes here..."
                                                    id="name"
                                                ></input>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={onSubmit}
                                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            >
                                                Submit <ArrowRight className="ml-2" size={16} />
                                            </button>
                                        </div>
                                    </form>
                                </>
                                : <h1 className="text-2xl font-bold mt-4">Responses are not being taken right now</h1>
                            : <h1 className="text-2xl font-bold mt-4">Thank You!</h1>
                    }
                </div>
            </div>
        </section>
    )
}