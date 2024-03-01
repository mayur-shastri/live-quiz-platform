import React, { useContext, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import RealTimeParticipantDataContext from '../../../../context providers/RealTimeData (participant)/RealTimeParticipantDataContext';
import OptionCheckbox from './Components/OptionCheckbox';

export default function MultipleCorrectMCQ() {
    const { currentSlideData, takeResponses, resetResponses, ws} = useContext(RealTimeParticipantDataContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const onChange = (e)=>{
        if(e.target.checked){
            setSelectedOptions((prevOptions)=>{
                return [...prevOptions, e.target.value];
            });
        } else{
            setSelectedOptions((prevOptions)=>{
                return prevOptions.filter((option)=>{
                    return option !== e.target.value;
                });
            });
        }
    }

    useEffect(()=>{
        setIsSubmitted(false);
    }, [currentSlideData]);

    const onSubmit = ()=>{
        ws.send(JSON.stringify({
            method: "response",
            questionType: currentSlideData.selectedSlideType,
            options: selectedOptions,
            slideId: currentSlideData._id,
        }));
        setIsSubmitted(true);
    }

    return (
        <section className='flex flex-col h-screen items-center justify-center'>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
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

                                        <div>
                                            {
                                                currentSlideData.options.map((option, index) => {
                                                    return (
                                                        <OptionCheckbox label={option.value} 
                                                        name="option" value={option.id} key={option.id}
                                                        onChange={onChange} 
                                                        selected={option.id === selectedOptions}/>
                                                    );
                                                })
                                            }
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