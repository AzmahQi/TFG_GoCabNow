'use client'
import {Modal, Button} from '@/app/ui'
import BookNow from '@/app/[lang]/booknow/page'
import Link from 'next/link'
export function BigHero( {base, content, session} ) {
  const isDriver = session?.user?.role === "Driver";

  return (
    <div id='home' className="relative shadow-inner isolate px-6 pt-14 lg:px-8 w-full">
      <div
        className="absolute inset-x-0 top-1 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-2"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-light ring-1 ring-gray-900/20 hover:ring-gray-900/30">
            {content.tagline}{" "}
            <a href="#aboutUs" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              {content.know} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl text light font-bold tracking-tight sm:text-6xl">
            {content.title.replace("$companyName$", base.companyName)}
          </h1>
          <p className="mt-6 text-lg leading-8 text-light">
            {content.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {isDriver? <Button className="ml-4">
            <Link href="/dashboard">Dashboard</Link>
          </Button>:<Modal
              triggerElement={
                <Button color="tertiary" className="ml-4">
                  {content.button}
                </Button>
              }
              modalContent={<BookNow dictionary={base} session={session}/>}
              buttonText="Close"
            /> }
            
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );}