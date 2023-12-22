'use client'
import { Disclosure, Transition } from "@headlessui/react";
const FAQs = ({content}) => {
    const faqs = content;
    return (
      <section id="faqs" className="secondary shadow-md px-6 py-16 w-full">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-8">{faqs.title}</h2>

          <div className="w-full max-w-3xl mx-auto">
            {faqs.faqs.map((faq, index) => (
              <Disclosure key={index} as="div" className=" mb-4 border-2 border-gray-300 rounded">
                {({ open }) => (
                  <>
                    <Disclosure.Button className={`${open? 'bg-[#FFC300] text-dark': 'primary'} flex justify-between items-center w-full p-4 text-white focus:outline-none`}>
                      <span className="text-lg font-bold">
                        {faq.question}
                      </span>
                      <span>{open ? "−" : "+"}</span>
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="p-4 bg-[#FFD60A] border border-gray-200">
                        <p className="text-gray-950">{faq.answer}</p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQs;