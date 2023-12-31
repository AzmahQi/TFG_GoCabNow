import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { Fragment} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { getStatusColors } from '@/app/ui/';
import { updateReservationStatus } from '@/lib/db';

const reservationsPending = [
    {"title":"Accept" , "value":"CONFIRMED"},
]
const reservationsConfirmed = [
    {"title":"Done" , "value":"FULFILLED"},
    {"title":"Reject" , "value":"PENDING"},
    {"title":"Cancel" , "value":"CANCELLED"},
]

export default function DriverOptions({status, reservationId, driverId, data}) {

    const renderMenuItems = () => {
        if (status === 'PENDING') {
          return reservationsPending.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                    onClick={(e)=>{onClickHandler(e, item.value)}}
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {data.driverActions[item.title]}
                </button>
              )}
            </Menu.Item>
          ));
        } else if (status === 'CONFIRMED') {
          return reservationsConfirmed.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                onClick={(e)=>{onClickHandler(e, item.value)}}
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {data.driverActions[item.title]}
                </button>
              )}
            </Menu.Item>
          ));
        }
      };
      const router = useRouter();
      const onClickHandler = async (e, val) =>  {
        e.stopPropagation();
        await updateReservationStatus(reservationId,val,driverId);
        router.refresh();
    }
    return (
      <Menu as="div" className="inline-block">
          <Menu.Button
                    onClick={(e) => {e.stopPropagation();}}
          className={`relative z-0 inline-flex w-full justify-center rounded-md ${getStatusColors(status).bg} px-2 text-sm font-medium ${getStatusColors(status).hoverBg} focus:outline-none focus-visible:ring-2 focus-visible:ring-dark/75`}>
            {data.statusEnums[status]}
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={'absolute z-10 mt-2 w-33 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'}>
            {renderMenuItems()}
          </Menu.Items>
        </Transition>
      </Menu>

  )
}